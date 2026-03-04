import React, { useState } from 'react';
import TopBar from './components/TopBar';
import ControlPanel from './components/ControlPanel';
import StatusPanel from './components/StatusPanel';
import RAMVisualization from './components/RAMVisualization';
import DiskVisualization from './components/DiskVisualization';

/**
 * Component chính của ứng dụng External Merge Sort Visualizer
 * @component
 * @description
 * Quản lý state của toàn bộ ứng dụng bao gồm:
 * - State của thuật toán (buffer, disk, stats)
 * - Điều khiển auto-play và tốc độ
 * - Giao tiếp với Electron main process thông qua IPC
 * @returns {JSX.Element} Giao diện ứng dụng
 */
function App() {
  const [state, setState] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [intervalId, setIntervalId] = useState(null);

  /**
   * Xử lý tạo file binary ngẫu nhiên
   * @param {number} count - Số lượng số cần tạo
   * @async
   * @description Gọi API để tạo file binary chứa các số ngẫu nhiên, hiển thị thông báo kết quả
   */
  const handleGenerateFile = async (count) => {
    try {
      const result = await window.electronAPI.generateMockFile(count);
      if (result.success) {
        alert(`✅ File được tạo tại:\n${result.filePath}\n\nSố lượng: ${result.numbers.length} số`);
      } else {
        alert(`❌ Lỗi: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Lỗi: ${error.message}`);
    }
  };

  /**
   * Xử lý chọn file binary từ hệ thống
   * @async
   * @description
   * - Mở dialog chọn file
   * - Khởi tạo thuật toán với file đã chọn
   * - Lấy và hiển thị state ban đầu
   */
  const handleSelectFile = async () => {
    try {
      const result = await window.electronAPI.selectFile();
      if (result.success && !result.canceled) {
        // Khởi tạo với pageSize = 2 (mỗi trang 2 số)
        const initResult = await window.electronAPI.initSort(result.filePath, 2);
        if (initResult.success) {
          // Lấy state ban đầu
          const stateResult = await window.electronAPI.getCurrentState();
          if (stateResult.success) {
            setState(stateResult.state);
          }
        } else {
          alert(`❌ Lỗi khởi tạo: ${initResult.error}`);
        }
      }
    } catch (error) {
      alert(`❌ Lỗi: ${error.message}`);
    }
  };

  /**
   * Thực hiện bước tiếp theo trong thuật toán
   * @async
   * @description Gọi API nextStep để tiến đến bước tiếp theo và cập nhật state
   */
  const handleNextStep = async () => {
    if (!state || state.phase === 'complete') return;

    try {
      const result = await window.electronAPI.nextStep();
      if (result.success) {
        setState(result.state);
      } else {
        alert(`❌ Lỗi: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Lỗi: ${error.message}`);
    }
  };

  /**
   * Bắt đầu chế độ auto-play
   * @description
   * - Tự động thực hiện các bước theo khoảng thời gian đã đặt
   * - Dừng tự động khi đến bước complete
   */
  const handlePlay = () => {
    if (isRunning) return;
    setIsRunning(true);

    const id = setInterval(async () => {
      try {
        const result = await window.electronAPI.nextStep();
        if (result.success) {
          setState(result.state);

          if (result.state.phase === 'complete') {
            setIsRunning(false);
            clearInterval(id);
          }
        } else {
          setIsRunning(false);
          clearInterval(id);
          alert(`❌ Lỗi: ${result.error}`);
        }
      } catch (error) {
        setIsRunning(false);
        clearInterval(id);
        alert(`❌ Lỗi: ${error.message}`);
      }
    }, speed);

    setIntervalId(id);
  };

  /**
   * Tạm dừng chế độ auto-play
   * @description Dừng interval và đặt isRunning = false
   */
  const handlePause = () => {
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  /**
   * Reset thuật toán về trạng thái ban đầu
   * @async
   * @description Dừng auto-play và xóa state hiện tại
   */
  const handleReset = async () => {
    handlePause();
    setState(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <TopBar 
        onGenerateFile={handleGenerateFile}
        onSelectFile={handleSelectFile}
      />

      {state && (
        <ControlPanel
          onNextStep={handleNextStep}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          isRunning={isRunning}
          speed={speed}
          onSpeedChange={setSpeed}
          disabled={!state}
        />
      )}

      {/* Phần chính - có thể cuộn */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          {state ? (
            <div className="space-y-3">
              <StatusPanel state={state} />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* Cột bên trái: Disk */}
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 flex flex-col overflow-hidden">
                  <h3 className="text-lg font-bold p-4 pb-3 flex items-center text-yellow-400 bg-slate-800/90 border-b border-slate-700 flex-shrink-0">
                    💾 DISK (Ổ Cứng)
                  </h3>
                  <div className="p-4 pt-3 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 360px)', minHeight: '300px' }}>
                    <DiskVisualization diskState={state.diskState} />
                  </div>
                </div>

                {/* Cột bên phải: RAM */}
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 flex flex-col overflow-hidden">
                  <h3 className="text-lg font-bold p-4 pb-3 flex items-center text-purple-400 bg-slate-800/90 border-b border-slate-700 flex-shrink-0">
                    🧠 RAM (Buffer)
                  </h3>
                  <div className="p-4 pt-3 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 360px)', minHeight: '300px' }}>
                    <RAMVisualization
                      buffer={state.buffer}
                      comparing={state.comparing}
                      animation={state.animation}
                    />
                  </div>
                </div>
              </div>

              {/* Mô tả chi tiết bước hiện tại */}
              {state.currentStepDescription && (
                <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4 text-center">
                  <div className="text-sm text-blue-200 font-medium">
                    {state.currentStepDescription}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="text-6xl">🗂️</div>
                <p className="text-xl text-slate-400">
                  Hãy tạo hoặc chọn một file dữ liệu để bắt đầu
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-slate-900/80 border-t border-slate-700 px-4 py-2 text-center text-xs text-slate-400">
        External Merge Sort Visualization • Electron + React + Tailwind
      </footer>
    </div>
  );
}

export default App;
