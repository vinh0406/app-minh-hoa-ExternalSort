import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component hiển thị trạng thái RAM (3 Buffer Pages)
 * @component
 * @param {Object} props - Props của component
 * @param {Object} props.buffer - Object chứa thông tin 3 buffer pages (input1, input2, output)
 * @param {Object} props.comparing - Thông tin đang so sánh (buffer1, buffer2, winner, from)
 * @param {Object} props.animation - Thông tin animation hiện tại
 * @description
 * Visualize 3 trang buffer trong RAM:
 * - Input Page 1: Chứa dữ liệu từ run 1
 * - Input Page 2: Chứa dữ liệu từ run 2
 * - Output Page 3: Chứa kết quả merge
 * Hiển thị animation khi:
 * - Load dữ liệu vào buffer
 * - So sánh phần tử
 * - Move phần tử giữa các buffer
 * @returns {JSX.Element} Visualization của RAM
 */
function RAMVisualization({ buffer, comparing, animation }) {
  /**
   * Lấy màu sắc class CSS tương ứng với trạng thái
   * @param {string} status - Trạng thái của buffer page
   * @returns {string} CSS class cho màu sắc và border
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'empty':
        return 'bg-slate-800/50 border-slate-600 border-dashed';
      case 'loading':
        return 'bg-blue-900/50 border-blue-500 animate-pulse';
      case 'sorting':
        return 'bg-yellow-900/50 border-yellow-500';
      case 'loaded':
        return 'bg-purple-900/50 border-purple-500';
      case 'comparing':
        return 'bg-orange-900/50 border-orange-500 animate-pulse';
      case 'waiting':
        return 'bg-slate-700/50 border-slate-500';
      case 'active':
        return 'bg-blue-800/50 border-blue-400';
      case 'full':
        return 'bg-red-900/50 border-red-500 animate-pulse';
      default:
        return 'bg-slate-800/50 border-slate-600';
    }
  };

  /**
   * Render một buffer page
   * @param {Object} pageData - Dữ liệu của page (data, status, label, maxSize)
   * @param {string} pageKey - Key của page ('input1', 'input2', 'output')
   * @returns {JSX.Element} UI của buffer page
   */
  const renderPage = (pageData, pageKey) => {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-xs text-blue-300">{pageData.label}</h4>
          <span className="text-xs text-slate-400">
            {pageData.data.length}/{pageData.maxSize}
          </span>
        </div>

        <div
          className={`border-2 rounded-lg p-2 min-h-[70px] transition-all ${getStatusColor(
            pageData.status
          )}`}
        >
          {pageData.status !== 'empty' && (
            <div className="mb-1.5">
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  pageData.status === 'comparing'
                    ? 'bg-orange-600 text-white'
                    : pageData.status === 'full'
                    ? 'bg-red-600 text-white'
                    : pageData.status === 'sorting'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {pageData.status === 'comparing'
                  ? '⚖️ So Sánh'
                  : pageData.status === 'full'
                  ? '🔴 Đầy'
                  : pageData.status === 'sorting'
                  ? '🔄 Sắp Xếp'
                  : '✓'}
              </span>
            </div>
          )}

          {pageData.data.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence mode="popLayout">
                {pageData.data.map((num, idx) => {
                  const isComparing =
                    comparing &&
                    ((pageKey === 'input1' && comparing.from === 1 && idx === 0) ||
                      (pageKey === 'input2' && comparing.from === 2 && idx === 0));

                  return (
                    <motion.div
                      key={`${pageKey}-${idx}-${num}`}
                      layout
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: isComparing ? [1, 1.1, 1] : 1,
                        opacity: 1,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', delay: idx * 0.05 }}
                      className={`relative px-2 py-1.5 rounded-lg text-center ${
                        isComparing
                          ? 'bg-orange-600 ring-2 ring-orange-400'
                          : pageData.status === 'sorting'
                          ? 'bg-yellow-600'
                          : 'bg-blue-600'
                      } text-white font-bold text-sm font-mono shadow-md`}
                    >
                      {num}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center justify-center h-12 text-slate-500 text-xs">
              Trống
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2.5">
      <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-2.5">
        <h3 className="font-bold text-purple-300 text-xs">3 Pages Buffer</h3>
        <p className="text-xs text-slate-400">
          Kích thước mỗi trang: {buffer?.input1?.maxSize || 2} phần tử
        </p>
      </div>

      {comparing && (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-orange-900/30 border border-orange-500 rounded-lg p-2 text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-xs font-bold">
            <span className="text-orange-300">{comparing.buffer1}</span>
            <span className="text-white">⚖️</span>
            <span className="text-orange-300">{comparing.buffer2}</span>
            <span className="text-white">→</span>
            <span className="text-green-400">✓ {comparing.winner}</span>
          </div>
        </motion.div>
      )}

      <div className="space-y-2.5">
        {buffer?.input1 && renderPage(buffer.input1, 'input1')}
        {buffer?.input2 && renderPage(buffer.input2, 'input2')}
        {buffer?.output && renderPage(buffer.output, 'output')}
      </div>
    </div>
  );
}

export default RAMVisualization;
