import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component hiển thị trạng thái và thống kê của thuật toán
 * @component
 * @param {Object} props - Props của component
 * @param {Object} props.state - State hiện tại của thuật toán
 * @param {string} props.state.currentStepDescription - Mô tả bước hiện tại
 * @param {Object} props.state.stats - Thống kê (phase, totalNumbers, bufferPages, runsCreated, etc.)
 * @description
 * Hiển thị thông tin về:
 * - Mô tả chi tiết bước đang thực hiện
 * - Thống kê: giai đoạn, tổng số phần tử, số buffer pages, số runs đã tạo
 * @returns {JSX.Element|null} Panel trạng thái hoặc null nếu không có state
 */
function StatusPanel({ state }) {
  if (!state) return null;

  return (
    <div className="space-y-2">
      {/* Current Step Description */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl border border-blue-700/50 p-3 shadow-xl"
      >
        <div className="flex items-start space-x-2.5">
          <div className="text-xl">📋</div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-300 mb-0.5">Đang thực hiện:</h3>
            <p className="text-base text-white font-medium leading-snug">
              {state.currentStepDescription || 'Khởi tạo...'}
            </p>
          </div>
        </div>

        {/* Stats */}
        {state.stats && (
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <div className="bg-slate-800/50 rounded-lg p-2">
              <div className="text-xs text-slate-400 mb-0.5">Giai đoạn</div>
              <div className="text-base font-bold text-purple-400">
                {state.stats.currentPhase || state.phase || 'N/A'}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2">
              <div className="text-xs text-slate-400 mb-0.5">Tổng số</div>
              <div className="text-base font-bold text-blue-400">
                {state.stats.totalNumbers || 0}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2">
              <div className="text-xs text-slate-400 mb-0.5">Số lượng Buffer Pages</div>
              <div className="text-base font-bold text-green-400">
                {state.stats.bufferPages || 3}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2">
              <div className="text-xs text-slate-400 mb-0.5">Runs</div>
              <div className="text-base font-bold text-yellow-400">
                {state.stats.runsCreated || 0}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default StatusPanel;
