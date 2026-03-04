import React from 'react';
import { motion } from 'framer-motion';

/**
 * Component hiển thị trạng thái Disk (ổ cứng)
 * @component
 * @param {Object} props - Props của component
 * @param {Object} props.diskState - Trạng thái của disk
 * @param {Object} props.diskState.inputFile - File ngồi gốc chưa sắp xếp
 * @param {Array} props.diskState.splitRuns - Các runs từ giai đoạn Split & Sort
 * @param {Array} props.diskState.mergePasses - Các lần merge trong External Sort
 * @param {Object} props.diskState.outputFile - File kết quả đã sắp xếp
 * @description
 * Visualize tất cả files trên ổ cứng bao gồm:
 * - File gốc (input)
 * - Các runs từ giai đoạn Split & Sort
 * - Các runs từ từng lần merge trong External Sort
 * - File kết quả cuối cùng (output)
 * @returns {JSX.Element} Visualization của disk state
 */
function DiskVisualization({ diskState }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'border-blue-500 bg-blue-900/20';
      case 'reading':
        return 'border-yellow-500 bg-yellow-900/20 animate-pulse';
      case 'complete':
        return 'border-green-500 bg-green-900/20';
      case 'inactive':
        return 'border-slate-600 bg-slate-800/20 opacity-50';
      default:
        return 'border-slate-600 bg-slate-800/20';
    }
  };

  /**
   * Render một file trên disk
   * @param {Object} file - Dữ liệu của file (name, numbers, status, highlight)
   * @param {number|string} index - Index hoặc key của file
   * @returns {JSX.Element} UI của file
   */
  const renderFile = (file, index) => {
    const numbers = file.numbers || [];
    const displayNumbers = numbers;

    return (
      <motion.div
        key={`${file.name}-${index}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`border-2 rounded-lg p-3 ${getStatusColor(file.status)} transition-all`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {file.name.includes('Gốc') ? '📥' : 
               file.name.includes('Kết Quả') ? '📤' : 
               file.status === 'complete' ? '✅' :
               file.status === 'active' ? '⚡' : '📄'}
            </span>
            <div>
              <h4 className="font-bold text-sm">{file.name}</h4>
              <p className="text-xs text-slate-400">{numbers.length} số</p>
            </div>
          </div>
          {file.status && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                file.status === 'complete'
                  ? 'bg-green-600 text-white'
                  : file.status === 'reading'
                  ? 'bg-yellow-600 text-white'
                  : file.status === 'active'
                  ? 'bg-purple-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {file.status === 'complete' ? '✓' : 
               file.status === 'reading' ? '📖' : 
               file.status === 'active' ? '⚡' : '•'}
            </span>
          )}
        </div>

        {displayNumbers.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {displayNumbers.map((num, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.01 }}
                className={`px-2 py-1 rounded text-xs font-mono font-semibold ${
                  (file.highlight || []).includes(idx)
                    ? 'bg-yellow-500 text-black ring-2 ring-yellow-300 animate-pulse'
                    : file.status === 'complete'
                    ? 'bg-green-600 text-white'
                    : file.status === 'active'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                {num}
              </motion.div>
            ))}
          </div>
        )}

        {displayNumbers.length === 0 && (
          <div className="text-center text-slate-500 text-xs py-2">Trống</div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      {/* File gốc */}
      {diskState.inputFile && (
        <div>
          <h4 className="text-xl font-black mb-3 text-yellow-300 uppercase tracking-wider shadow-lg">📥 FILE GỐC</h4>
          {renderFile(diskState.inputFile, 'input')}
        </div>
      )}

      {/* Split & Sort Runs */}
      {diskState.splitRuns && diskState.splitRuns.length > 0 && (
        <div>
          <h4 className="text-xl font-black mb-3 text-yellow-300 uppercase tracking-wider shadow-lg">🔄 GIAI ĐOẠN SPLIT & SORT</h4>
          <div className="space-y-2">
            {diskState.splitRuns.map((run, index) => renderFile(run, `split-${index}`))}
          </div>
        </div>
      )}

      {/* Merge Passes */}
      {diskState.mergePasses && diskState.mergePasses.map((passRuns, passIndex) => (
        <div key={`pass-${passIndex}`}>
          <h4 className="text-xl font-black mb-3 text-yellow-300 uppercase tracking-wider shadow-lg">
            🔀 GIAI ĐOẠN EXTERNAL SORT: LẦN {passIndex + 1}
          </h4>
          <div className="space-y-2">
            {passRuns.map((run, runIndex) => renderFile(run, `pass${passIndex}-run${runIndex}`))}
          </div>
        </div>
      ))}

      {/* File output */}
      {diskState.outputFile && diskState.outputFile.numbers && diskState.outputFile.numbers.length > 0 && (
        <div>
          <h4 className="text-xl font-black mb-3 text-yellow-300 uppercase tracking-wider shadow-lg">✅ FILE OUTPUT (ĐÃ SẮP XẾP)</h4>
          {renderFile(diskState.outputFile, 'output')}
        </div>
      )}
    </div>
  );
}

export default DiskVisualization;
