/**
 * Preload script cho Electron
 * @description Script này expose các API từ main process sang renderer process thông qua contextBridge.
 * Đảm bảo contextIsolation và bảo mật cho ứng dụng Electron.
 */

const { contextBridge, ipcRenderer } = require('electron');

/**
 * Expose Electron API vào window.electronAPI trong renderer process
 * @description Cung cấp các phương thức giao tiếp với main process thông qua IPC
 */
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Tạo file binary mock với các số ngẫu nhiên
   * @param {number} count - Số lượng số cần tạo
   * @returns {Promise<object>} Kết quả tạo file
   */
  // Generate mock binary file
  generateMockFile: (count) => ipcRenderer.invoke('generate-mock-file', count),
  
  /**
   * Mở dialog chọn file binary
   * @returns {Promise<object>} Thông tin file đã chọn
   */
  // Select binary file
  selectFile: () => ipcRenderer.invoke('select-file'),
  
  /**
   * Khởi tạo thuật toán sắp xếp
   * @param {string} filePath - Đường dẫn file input
   * @param {number} pageSize - Kích thước mỗi trang buffer
   * @returns {Promise<object>} Kết quả khởi tạo
   */
  // Initialize sorting
  initSort: (filePath, pageSize) => ipcRenderer.invoke('init-sort', filePath, pageSize),
  
  /**
   * Thực hiện bước tiếp theo trong thuật toán
   * @returns {Promise<object>} Trạng thái sau khi chuyển bước
   */
  // Navigation
  nextStep: () => ipcRenderer.invoke('next-step'),
  
  /**
   * Quay lại bước trước đó
   * @returns {Promise<object>} Trạng thái sau khi quay lại
   */
  prevStep: () => ipcRenderer.invoke('prev-step'),
  
  /**
   * Reset thuật toán về trạng thái ban đầu
   * @returns {Promise<object>} Kết quả reset
   */
  // Reset
  resetSort: () => ipcRenderer.invoke('reset-sort'),
  
  /**
   * Lấy trạng thái hiện tại của thuật toán
   * @returns {Promise<object>} Trạng thái hiện tại
   */
  // Get current state
  getCurrentState: () => ipcRenderer.invoke('get-current-state'),
});
