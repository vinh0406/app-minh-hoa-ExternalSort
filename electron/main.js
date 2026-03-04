const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const { generateMockBinaryFile, readBinaryFile, writeBinaryFile } = require('./utils/fileUtils');
const { ExternalMergeSorter } = require('./utils/externalMergeSort');

let mainWindow;
let sorter = null;

/**
 * Tạo cửa sổ chính của ứng dụng Electron
 * @returns {void}
 * @description Khởi tạo BrowserWindow với cấu hình preload, contextIsolation và load nội dung từ Vite dev server hoặc build folder
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the app
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools(); // Commented out to prevent auto-opening
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers

/**
 * Handler IPC để tạo file binary ngẫu nhiên cho việc test
 * @param {Electron.IpcMainInvokeEvent} event - Event từ IPC
 * @param {number} [count=20] - Số lượng số ngẫu nhiên cần tạo
 * @returns {Promise<{success: boolean, filePath?: string, numbers?: number[], message?: string, error?: string}>}
 * @description Tạo file binary chứa các số ngẫu nhiên trong thư mục test-data
 */
// Generate mock binary file
ipcMain.handle('generate-mock-file', async (event, count = 20) => {
  try {
    const projectDir = path.join(__dirname, '..', 'test-data');
    await fs.mkdir(projectDir, { recursive: true });
    
    const filePath = path.join(projectDir, `mock_data_${Date.now()}.bin`);
    await generateMockBinaryFile(filePath, count);
    
    const numbers = await readBinaryFile(filePath);
    
    return {
      success: true,
      filePath,
      numbers,
      message: `Generated ${count} random numbers`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

/**
 * Handler IPC để mở hộp thoại chọn file binary
 * @returns {Promise<{success: boolean, canceled?: boolean, filePath?: string, numbers?: number[], message?: string, error?: string}>}
 * @description Hiển thị dialog chọn file .bin và đọc dữ liệu từ file đó
 */
// Select binary file
ipcMain.handle('select-file', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'Binary Files', extensions: ['bin'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (result.canceled) {
      return { success: false, canceled: true };
    }

    const filePath = result.filePaths[0];
    const numbers = await readBinaryFile(filePath);

    return {
      success: true,
      filePath,
      numbers,
      message: `Loaded ${numbers.length} numbers from file`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

/**
 * Handler IPC để khởi tạo thuật toán External Merge Sort
 * @param {Electron.IpcMainInvokeEvent} event - Event từ IPC
 * @param {string} filePath - Đường dẫn đến file binary input
 * @param {number} [pageSize=2] - Kích thước của mỗi trang buffer (số phần tử)
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 * @description Khởi tạo đối tượng ExternalMergeSorter và chuẩn bị cho quá trình sắp xếp
 */
// Initialize sorting
ipcMain.handle('init-sort', async (event, filePath, pageSize = 2) => {
  try {
    const tempDir = path.join(__dirname, '..', 'test-data', 'runs');
    await fs.mkdir(tempDir, { recursive: true });

    sorter = new ExternalMergeSorter(filePath, tempDir, pageSize);
    await sorter.initialize();

    return {
      success: true,
      message: 'Sorter initialized'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

/**
 * Handler IPC để chuyển sang bước tiếp theo trong thuật toán
 * @returns {Promise<{success: boolean, state?: object, isComplete?: boolean, error?: string}>}
 * @description Gọi phương thức nextStep() của sorter để tiếp tục thuật toán
 */
// Get next step
ipcMain.handle('next-step', async () => {
  try {
    if (!sorter) {
      return {
        success: false,
        error: 'Sorter not initialized'
      };
    }

    console.log('[MAIN] Calling sorter.nextStep()...');
    const state = await sorter.nextStep();
    console.log('[MAIN] sorter.nextStep() returned. Phase:', state?.phase, 'SubPhase:', state?.subPhase);
    
    return {
      success: true,
      state,
      isComplete: state.isComplete
    };
  } catch (error) {
    console.error('[MAIN] Error in next-step handler:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

/**
 * Handler IPC để quay lại bước trước đó
 * @returns {Promise<{success: boolean, state?: object, error?: string}>}
 * @description Gọi phương thức previousStep() của sorter để quay lại bước trước
 */
// Get previous step
ipcMain.handle('prev-step', async () => {
  try {
    if (!sorter) {
      return {
        success: false,
        error: 'Sorter not initialized'
      };
    }

    const state = await sorter.previousStep();
    
    return {
      success: true,
      state
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

/**
 * Handler IPC để reset thuật toán về trạng thái ban đầu
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 * @description Gọi phương thức reset() của sorter để reset toàn bộ trạng thái
 */
// Reset sorting
ipcMain.handle('reset-sort', async () => {
  try {
    if (sorter) {
      await sorter.reset();
    }
    
    return {
      success: true,
      message: 'Sorter reset'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

/**
 * Handler IPC để lấy trạng thái hiện tại của thuật toán
 * @returns {Promise<{success: boolean, state?: object, error?: string}>}
 * @description Gọi phương thức getCurrentState() của sorter để lấy trạng thái hiện tại
 */
// Get current state
ipcMain.handle('get-current-state', async () => {
  try {
    if (!sorter) {
      return {
        success: false,
        error: 'Sorter not initialized'
      };
    }

    const state = sorter.getCurrentState();
    
    return {
      success: true,
      state
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});
