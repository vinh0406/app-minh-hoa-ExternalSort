import React from 'react';
import { motion } from 'framer-motion';

/**
 * Component bảng điều khiển playback
 * @component
 * @param {Object} props - Props của component
 * @param {boolean} props.isRunning - Trạng thái đang chạy auto-play
 * @param {Function} props.onPlay - Callback khi nhấn nút play
 * @param {Function} props.onPause - Callback khi nhấn nút pause
 * @param {Function} props.onNextStep - Callback khi nhấn nút next step
 * @param {Function} props.onReset - Callback khi nhấn nút reset
 * @param {number} props.speed - Tốc độ hiện tại (milliseconds)
 * @param {Function} props.onSpeedChange - Callback khi thay đổi tốc độ
 * @param {boolean} props.disabled - Vô hiệu hóa nút điều khiển
 * @description Hiển thị các nút điều khiển (Play, Pause, Next, Reset) và slider tốc độ
 * @returns {JSX.Element} Bảng điều khiển
 */
function ControlPanel({
  isRunning,
  onPlay,
  onPause,
  onNextStep,
  onReset,
  speed,
  onSpeedChange,
  disabled,
}) {
  // Speed range: 100ms (fastest) to 2000ms (slowest)
  /**
   * Định dạng hiển thị tốc độ
   * @param {number} ms - Tốc độ tính bằng milliseconds
   * @returns {string} Chuỗi đã format (ví dụ: "800ms")
   */
  const formatSpeed = (ms) => {
    return `${ms}ms`;
  };

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border-b border-slate-700 px-4 py-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Playback Controls */}
        <div className="flex items-center space-x-2">
          {/* Play/Pause */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRunning ? onPause : onPlay}
            disabled={disabled}
            className={`px-5 py-2 ${
              isRunning
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
            } rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm`}
            title={isRunning ? 'Tạm Dừng' : 'Chạy Tự Động'}
          >
            {isRunning ? '⏸️ Tạm Dừng' : '▶️ Chạy'}
          </motion.button>

          {/* Next Step */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNextStep}
            disabled={isRunning || disabled}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            title="Bước Tiếp"
          >
            ⏭️ Bước Tiếp
          </motion.button>

          {/* Reset */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold shadow-lg transition-all text-sm"
            title="Làm Lại"
          >
            🔄 Làm Lại
          </motion.button>
        </div>

        {/* Speed Control Slider */}
        <div className="flex items-center space-x-2.5 bg-slate-700/50 px-4 py-2 rounded-lg min-w-[260px]">
          <span className="text-xs font-medium text-slate-300">Tốc Độ:</span>
          <div className="flex-1 flex items-center space-x-2.5">
            <span className="text-xs text-slate-400">🐇</span>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => onSpeedChange(parseInt(e.target.value))}
              className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-slate-400">🐢</span>
          </div>
          <span className="text-xs font-semibold text-purple-400 min-w-[80px] text-right">
            {formatSpeed(speed)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
