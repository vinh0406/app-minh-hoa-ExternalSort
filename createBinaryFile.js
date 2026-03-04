const fs = require('fs');
const path = require('path');

/**
 * Script to create custom binary files for testing the External Merge Sort Visualizer
 * 
 * Usage: node createBinaryFile.js [count] [output_filename]
 * 
 * Examples:
 *   node createBinaryFile.js 50 test50.bin
 *   node createBinaryFile.js 100 test100.bin
 */

/**
 * Tạo file binary chứa các số dạng Float64 (8 bytes)
 * @param {number[]} numbers - Mảng các số cần ghi vào file
 * @param {string} filename - Tên file đầu ra
 * @returns {void}
 * @description Hàm này tạo một buffer và ghi từng số dưới dạng Double Little Endian (8 bytes) vào file binary
 */
function createBinaryFile(numbers, filename) {
  const buffer = Buffer.allocUnsafe(numbers.length * 8);
  
  numbers.forEach((num, i) => {
    buffer.writeDoubleLE(num, i * 8);
  });
  
  fs.writeFileSync(filename, buffer);
  console.log(`✅ Created ${filename} with ${numbers.length} numbers`);
}

/**
 * Tạo mảng các số ngẫu nhiên với 2 chữ số thập phân
 * @param {number} count - Số lượng số cần tạo
 * @param {number} [min=-100] - Giá trị nhỏ nhất
 * @param {number} [max=100] - Giá trị lớn nhất
 * @returns {number[]} Mảng các số ngẫu nhiên
 * @description Hàm tạo các số ngẫu nhiên trong khoảng [min, max] với 2 chữ số thập phân
 */
function generateRandomNumbers(count, min = -100, max = 100) {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    // Generate random numbers with 2 decimal places
    const num = Math.round((Math.random() * (max - min) + min) * 100) / 100;
    numbers.push(num);
  }
  return numbers;
}

// Parse command line arguments
const args = process.argv.slice(2);
const count = parseInt(args[0]) || 20;
const filename = args[1] || `test_data_${count}.bin`;

console.log(`\n🎲 Generating ${count} random numbers...`);
const numbers = generateRandomNumbers(count);

console.log(`📊 Sample numbers: [${numbers.slice(0, 5).map(n => n.toFixed(2)).join(', ')}${count > 5 ? ', ...' : ''}]`);
console.log(`📝 Creating binary file: ${filename}`);

createBinaryFile(numbers, filename);

console.log(`\n✨ Done! You can now upload this file in the visualizer.\n`);

// Additional examples
console.log('📚 More examples:');
console.log('  node createBinaryFile.js 15         → Create test_data_15.bin');
console.log('  node createBinaryFile.js 30 large.bin → Create large.bin with 30 numbers');
console.log('  node createBinaryFile.js 100        → Create test_data_100.bin');
