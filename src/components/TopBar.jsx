import React from 'react';
import { motion } from 'framer-motion';

/**
 * Component thanh tiêu đề và điều khiển file
 * @component
 * @param {Object} props - Props của component
 * @param {Function} props.onGenerateFile - Callback khi tạo file ngẫu nhiên
 * @param {Function} props.onSelectFile - Callback khi chọn file từ hệ thống
 * @description
 * Hiển thị tiêu đề ứng dụng và các nút điều khiển file:
 * - Nút tạo file dữ liệu ngẫu nhiên
 * - Nút chọn file .bin từ hệ thống
 * - Modal nhập số lượng khi tạo file
 * @returns {JSX.Element} Thanh tiêu đề
 */
function TopBar({ onGenerateFile, onSelectFile }) {
  const [showGenerateModal, setShowGenerateModal] = React.useState(false);
  const [count, setCount] = React.useState(20);

  /**
   * Xử lý khi nhấn nút tạo file trong modal
   * @description Gọi callback onGenerateFile và đóng modal
   */
  const handleGenerate = () => {
    onGenerateFile(count);
    setShowGenerateModal(false);
  };

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border-b border-slate-700 px-4 py-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="text-3xl">⚡</div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              External Merge Sort
            </h1>
            <p className="text-xs text-slate-400">Minh Họa Thuật Toán 3-Page Buffer</p>
          </div>
        </div>

        {/* File Controls */}
        <div className="flex items-center space-x-3 flex-wrap gap-2">
          {/* Generate Mock File Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGenerateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg font-semibold shadow-lg transition-all text-sm"
          >
            🎲 Tạo Dữ Liệu
          </motion.button>

          {/* Select File Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectFile}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold shadow-lg transition-all text-sm"
          >
            📁 Chọn File .bin
          </motion.button>
        </div>
      </div>

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowGenerateModal(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 border-2 border-slate-600 rounded-xl p-6 m-4 max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Tạo File Dữ Liệu Ngẫu Nhiên</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Số lượng:</label>
                <input
                  type="number"
                  min="4"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-center font-bold text-lg"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleGenerate}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
                >
                  ✓ Tạo
                </button>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg font-semibold"
                >
                  Hủy
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default TopBar;
