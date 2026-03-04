const fs = require('fs').promises;
const fsSync = require('fs');

/**
 * Đọc file binary chứa các số Float64 (8 bytes)
 * @param {string} filePath - Đường dẫn đến file binary
 * @returns {Promise<number[]>} Mảng các số
 * @description Đọc toàn bộ file binary và chuyển đổi thành mảng các số Float64. Mỗi số chiếm 8 bytes (Double Little Endian).
 * @async
 */
/**
 * Read binary file containing 8-byte double precision floats (Float64)
 * @param {string} filePath - Path to the binary file
 * @returns {Promise<number[]>} - Array of numbers
 */
async function readBinaryFile(filePath) {
  const buffer = await fs.readFile(filePath);
  const numbers = [];
  
  // Each double is 8 bytes
  const doubleSize = 8;
  const count = buffer.length / doubleSize;
  
  for (let i = 0; i < count; i++) {
    const offset = i * doubleSize;
    const value = buffer.readDoubleLE(offset);
    numbers.push(value);
  }
  
  return numbers;
}

/**
 * Ghi mảng các số vào file binary dưới dạng Float64
 * @param {string} filePath - Đường dẫn file để ghi
 * @param {number[]} numbers - Mảng các số cần ghi
 * @returns {Promise<void>}
 * @description Chuyển đổi mảng số thành buffer và ghi vào file. Mỗi số được ghi dưới dạng Double Little Endian (8 bytes).
 * @async
 */
/**
 * Write numbers to binary file as 8-byte double precision floats
 * @param {string} filePath - Path to write the file
 * @param {number[]} numbers - Array of numbers to write
 */
async function writeBinaryFile(filePath, numbers) {
  const doubleSize = 8;
  const buffer = Buffer.allocUnsafe(numbers.length * doubleSize);
  
  for (let i = 0; i < numbers.length; i++) {
    buffer.writeDoubleLE(numbers[i], i * doubleSize);
  }
  
  await fs.writeFile(filePath, buffer);
}

/**
 * Đọc một phần của file binary (chunk)
 * @param {string} filePath - Đường dẫn đến file binary
 * @param {number} offset - Vị trí bắt đầu (tính theo số lượng số, không phải bytes)
 * @param {number} count - Số lượng số cần đọc
 * @returns {Promise<number[]>} Mảng các số đã đọc
 * @description Đọc một phần của file binary từ vị trí offset. Hữu dụng khi chỉ cần đọc một phần dữ liệu thay vì toàn bộ file.
 * @async
 */
/**
 * Read a chunk of numbers from a binary file
 * @param {string} filePath - Path to the binary file
 * @param {number} offset - Offset in terms of number count (not bytes)
 * @param {number} count - Number of doubles to read
 * @returns {Promise<number[]>} - Array of numbers
 */
async function readBinaryChunk(filePath, offset, count) {
  const doubleSize = 8;
  const byteOffset = offset * doubleSize;
  const bytesToRead = count * doubleSize;
  
  const fileHandle = await fs.open(filePath, 'r');
  const buffer = Buffer.allocUnsafe(bytesToRead);
  
  try {
    const { bytesRead } = await fileHandle.read(buffer, 0, bytesToRead, byteOffset);
    const actualCount = Math.floor(bytesRead / doubleSize);
    const numbers = [];
    
    for (let i = 0; i < actualCount; i++) {
      numbers.push(buffer.readDoubleLE(i * doubleSize));
    }
    
    return numbers;
  } finally {
    await fileHandle.close();
  }
}

/**
 * Lấy số lượng các số trong file binary
 * @param {string} filePath - Đường dẫn đến file binary
 * @returns {Promise<number>} Số lượng các số
 * @description Tính số lượng số bằng cách chia kích thước file cho 8 (vì mỗi số Float64 là 8 bytes)
 * @async
 */
/**
 * Get the count of numbers in a binary file
 * @param {string} filePath - Path to the binary file
 * @returns {Promise<number>} - Count of numbers
 */
async function getBinaryFileCount(filePath) {
  const stats = await fs.stat(filePath);
  return Math.floor(stats.size / 8);
}

/**
 * Tạo file binary ngẫu nhiên chứa các số Float64 để test
 * @param {string} filePath - Đường dẫn file để lưu
 * @param {number} [count=20] - Số lượng số ngẫu nhiên cần tạo
 * @returns {Promise<void>}
 * @description Tạo file binary chứa các số ngẫu nhiên trong khoảng [-100, 100] với 2 chữ số thập phân
 * @async
 */
/**
 * Generate a mock binary file with random double numbers
 * @param {string} filePath - Path to save the file
 * @param {number} count - Number of random numbers to generate
 */
async function generateMockBinaryFile(filePath, count = 20) {
  const numbers = [];
  
  for (let i = 0; i < count; i++) {
    // Generate random numbers between -100 and 100 with 2 decimal places
    const num = Math.round((Math.random() * 200 - 100) * 100) / 100;
    numbers.push(num);
  }
  
  await writeBinaryFile(filePath, numbers);
}

/**
 * Đọc file binary đồng bộ (cho streaming)
 * @param {string} filePath - Đường dẫn đến file binary
 * @returns {number[]} Mảng các số
 * @description Phiên bản đồng bộ của readBinaryFile, sử dụng readFileSync. Hữu dụng cho các thao tác không cần async.
 */
/**
 * Synchronously read a binary file (for streaming)
 * @param {string} filePath - Path to the binary file
 * @returns {number[]} - Array of numbers
 */
function readBinaryFileSync(filePath) {
  const buffer = fsSync.readFileSync(filePath);
  const numbers = [];
  const doubleSize = 8;
  const count = buffer.length / doubleSize;
  
  for (let i = 0; i < count; i++) {
    const offset = i * doubleSize;
    const value = buffer.readDoubleLE(offset);
    numbers.push(value);
  }
  
  return numbers;
}

module.exports = {
  readBinaryFile,
  writeBinaryFile,
  readBinaryChunk,
  getBinaryFileCount,
  generateMockBinaryFile,
  readBinaryFileSync
};
