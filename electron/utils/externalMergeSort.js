const fs = require('fs').promises;
const path = require('path');
const { readBinaryFile, writeBinaryFile, readBinaryChunk, getBinaryFileCount } = require('./fileUtils');

/**
 * External Merge Sort với mô hình 3-Page Buffer
 * @class ExternalMergeSorter
 * @description
 * Triển khai thuật toán External Merge Sort sử dụng mô hình 3-page buffer:
 * - RAM có chính xác 3 trang: 2 Input Pages + 1 Output Page
 * - Mỗi trang chứa pageSize phần tử (mặc định 2 phần tử/trang)
 * - Giai đoạn 1: Chia file thành các runs nhỏ, sắp xếp từng run trong RAM
 * - Giai đoạn 2: Merge các runs theo từng lần cho đến khi còn 1 run duy nhất
 */
/**
 * External Merge Sort with 3-Page Buffer Model
 * RAM has exactly 3 pages: 2 Input Pages + 1 Output Page
 * Each page holds pageSize elements (e.g., 2 elements/page)
 */
class ExternalMergeSorter {
/**
   * Constructor khởi tạo sorter
   * @param {string} inputFilePath - Đường dẫn đến file binary đầu vào
   * @param {string} tempDir - Thư mục lưu các file runs tạm thời
   * @param {number} [pageSize=2] - Số lượng phần tử trên mỗi trang buffer
   * @description Khởi tạo các biến state để theo dõi quá trình sắp xếp
   */
  constructor(inputFilePath, tempDir, pageSize = 2) {
    this.inputFilePath = inputFilePath;
    this.tempDir = tempDir;
    this.pageSize = pageSize; // Elements per page
    
    // State tracking
    this.states = [];
    this.currentStateIndex = -1;
    
    // Algorithm state
    this.phase = 'init';
    this.subPhase = 'start';
    this.runs = [];
    this.currentRunIndex = 0;
    this.totalNumbers = 0;
    this.outputFilePath = null;
    this.comparisonCount = 0;
    
    // Phase 1: Split & Sort state
    this.splitPosition = 0;
    this.splitBuffer = [];
    
    // Phase 2: Merge state
    this.mergePass = 0; // Track which merge pass we're on
    this.currentPassRuns = []; // Runs being merged in current pass
    this.nextPassRuns = []; // Runs for next pass
    this.mergeRun1 = null;
    this.mergeRun2 = null;
    this.input1Buffer = [];
    this.input2Buffer = [];
    this.outputBuffer = [];
    this.run1Pos = 0;
    this.run2Pos = 0;
    this.mergedData = [];
    this.currentMergeRunIndex = null;
    this.mergePasses = []; // Track all merge passes for visualization
  }

  /**
   * Khởi tạo thuật toán và tạo state ban đầu
   * @returns {Promise<object>} State ban đầu chứa thông tin disk, buffer, stats
   * @description
   * - Đọc tổng số phần tử từ file input
   * - Tạo state ban đầu với buffer rỗng
   * - Chuẩn bị các cấu trúc dữ liệu để visualize
   * @async
   */
  async initialize() {
    this.totalNumbers = await getBinaryFileCount(this.inputFilePath);
    this.outputFilePath = path.join(this.tempDir, 'output.bin');
    const allNumbers = await readBinaryFile(this.inputFilePath);
    
    const initialState = {
      phase: 'init',
      subPhase: 'start',
      currentStepDescription: '🚀 Khởi tạo: RAM có 3 trang buffer (mỗi trang chứa tối đa ' + this.pageSize + ' số). Sẵn sàng bắt đầu!',
      animation: null,
      comparing: null,
      buffer: {
        input1: { data: [], status: 'empty', label: 'Buffer Page 1', maxSize: this.pageSize },
        input2: { data: [], status: 'empty', label: 'Buffer Page 2', maxSize: this.pageSize },
        output: { data: [], status: 'empty', label: 'Buffer Page 3', maxSize: this.pageSize }
      },
      diskState: {
        inputFile: {
          name: 'File Gốc (Chưa Sắp Xếp)',
          numbers: allNumbers,
          status: 'active',
          highlight: []
        },
        splitRuns: [], // Runs from split phase
        mergePasses: [], // Array of merge passes, each containing runs
        outputFile: {
          name: 'File Kết Quả (Đã Sắp Xếp)',
          numbers: [],
          status: 'inactive',
          highlight: []
        }
      },
      stats: {
        totalNumbers: this.totalNumbers,
        pageSize: this.pageSize,
        bufferPages: 3,
        currentPhase: 'Khởi Tạo',
        runsCreated: 0,
        comparisons: 0
      },
      isComplete: false
    };
    
    this.states.push(initialState);
    this.currentStateIndex = 0;
    return initialState;
  }

  /**
   * Tiến đến bước tiếp theo trong thuật toán
   * @returns {Promise<object>} State mới sau khi thực hiện bước tiếp theo
   * @description
   * - Kiểm tra nếu có state đã lưu trong history, trả về state đó
   * - Nếu không, thực hiện bước logic tiếp theo tùy thuộc vào phase hiện tại
   * - Lưu state mới vào history để có thể quay lại
   * @async
   */
  async nextStep() {
    if (this.currentStateIndex < this.states.length - 1) {
      this.currentStateIndex++;
      return this.states[this.currentStateIndex];
    }

    let newState;
    try {
      if (this.phase === 'init') {
        newState = await this.startSplitPhase();
      } else if (this.phase === 'split') {
        newState = await this.executeSplitStep();
      } else if (this.phase === 'merge') {
        console.log('Calling executeMergeStep from nextStep...');
        newState = await this.executeMergeStep();
        console.log('executeMergeStep returned:', newState ? 'state object' : 'null/undefined');
      } else if (this.phase === 'complete') {
        return this.getCurrentState();
      }
    } catch (error) {
      console.error('Error in nextStep:', error);
      return this.getCurrentState();
    }

    if (newState) {
      this.states.push(newState);
      this.currentStateIndex++;
      return newState;
    }

    console.warn('nextStep returned no new state');
    return this.getCurrentState();
  }

  /**
   * Quay lại bước trước đó
   * @returns {Promise<object>} State của bước trước
   * @description Giảm currentStateIndex để quay lại state trước đó trong history
   * @async
   */
  async previousStep() {
    if (this.currentStateIndex > 0) {
      this.currentStateIndex--;
    }
    return this.states[this.currentStateIndex];
  }

  /**
   * Lấy state hiện tại
   * @returns {object|null} State hiện tại hoặc null nếu chưa khởi tạo
   * @description Trả về state tại vị trí currentStateIndex trong mảng states
   */
  getCurrentState() {
    if (this.currentStateIndex >= 0) {
      return this.states[this.currentStateIndex];
    }
    return null;
  }

  /**
   * Bắt đầu giai đoạn 1: Split & Sort
   * @returns {Promise<object>} State mới khi bắt đầu giai đoạn Split
   * @description Chuyển sang phase 'split' và subPhase 'load', chuẩn bị đọc dữ liệu
   * @async
   */
  async startSplitPhase() {
    this.phase = 'split';
    this.subPhase = 'load';
    this.splitPosition = 0;
    
    const current = this.states[this.currentStateIndex];
    return {
      ...current,
      phase: 'split',
      subPhase: 'load',
      currentStepDescription: '📖 GIAI ĐOẠN 1: Chia & Sắp Xếp. Bắt đầu đọc dữ liệu từ file gốc...',
      stats: { ...current.stats, currentPhase: 'Giai Đoạn 1: Split & Sort' }
    };
  }

  /**
   * Thực hiện một bước trong giai đoạn Split & Sort
   * @returns {Promise<object>} State mới sau bước thực hiện
   * @description
   * Giai đoạn Split có 3 sub-phases:
   * - load: Đọc 1 chunk dữ liệu từ disk vào 3 pages buffer
   * - loaded: Sắp xếp dữ liệu trong RAM
   * - sorted: Ghi run đã sắp xếp xuống disk
   * @async
   */
  async executeSplitStep() {
    const current = this.states[this.currentStateIndex];
    
    // Check if finished all input
    if (this.splitPosition >= this.totalNumbers) {
      return await this.startMergePhase();
    }

    // Step 1: LOAD - Read data from disk into all 3 pages
    if (this.subPhase === 'load') {
      const chunkSize = this.pageSize * 3; // Use all 3 pages
      const remaining = this.totalNumbers - this.splitPosition;
      const toRead = Math.min(chunkSize, remaining);
      
      this.splitBuffer = await readBinaryChunk(this.inputFilePath, this.splitPosition, toRead);
      
      const highlightIndices = [];
      for (let i = 0; i < toRead; i++) {
        highlightIndices.push(this.splitPosition + i);
      }
      
      this.subPhase = 'loaded';
      
      return {
        ...current,
        subPhase: 'loaded',
        currentStepDescription: `📥 LOAD: Đọc ${toRead} số từ file vào RAM (vị trí ${this.splitPosition}-${this.splitPosition + toRead - 1})`,
        animation: { type: 'load', from: 'disk', to: 'buffer', data: this.splitBuffer },
        buffer: {
          input1: { data: this.splitBuffer.slice(0, this.pageSize), status: 'loading', label: 'Buffer Page 1', maxSize: this.pageSize },
          input2: { data: this.splitBuffer.slice(this.pageSize, this.pageSize * 2), status: 'loading', label: 'Buffer Page 2', maxSize: this.pageSize },
          output: { data: this.splitBuffer.slice(this.pageSize * 2), status: 'loading', label: 'Buffer Page 3', maxSize: this.pageSize }
        },
        diskState: {
          ...current.diskState,
          inputFile: {
            ...current.diskState.inputFile,
            highlight: highlightIndices,
            status: 'reading'
          }
        }
      };
    }

    // Step 2: SORT - Sort in memory
    if (this.subPhase === 'loaded') {
      const sortedBuffer = [...this.splitBuffer].sort((a, b) => a - b);
      this.subPhase = 'sorted';
      
      return {
        ...current,
        subPhase: 'sorted',
        currentStepDescription: `🔄 SORT: Sắp xếp ${this.splitBuffer.length} số trong RAM (đổi màu sang vàng)`,
        animation: { type: 'sort', data: sortedBuffer },
        buffer: {
          input1: { data: sortedBuffer.slice(0, this.pageSize), status: 'sorting', label: 'Buffer Page 1', maxSize: this.pageSize },
          input2: { data: sortedBuffer.slice(this.pageSize, this.pageSize * 2), status: 'sorting', label: 'Buffer Page 2', maxSize: this.pageSize },
          output: { data: sortedBuffer.slice(this.pageSize * 2), status: 'sorting', label: 'Buffer Page 3', maxSize: this.pageSize }
        },
        diskState: {
          ...current.diskState,
          inputFile: {
            ...current.diskState.inputFile,
            status: 'active',
            highlight: []
          }
        }
      };
    }

    // Step 3: WRITE - Write sorted data to run file
    if (this.subPhase === 'sorted') {
      const sortedBuffer = [...this.splitBuffer].sort((a, b) => a - b);
      const runPath = path.join(this.tempDir, `run_${this.currentRunIndex}.bin`);
      await writeBinaryFile(runPath, sortedBuffer);
      
      this.runs.push({
        path: runPath,
        numbers: sortedBuffer,
        index: this.currentRunIndex
      });
      
      const newRun = {
        name: `Run ${this.currentRunIndex}`,
        numbers: sortedBuffer,
        status: 'active',
        highlight: []
      };
      
      this.splitPosition += this.splitBuffer.length;
      this.currentRunIndex++;
      this.subPhase = 'load';
      this.splitBuffer = [];
      
      return {
        ...current,
        subPhase: 'write',
        currentStepDescription: `💾 WRITE: Ghi Run ${this.currentRunIndex - 1} xuống đĩa (${sortedBuffer.length} số đã sắp xếp)`,
        animation: { type: 'write', from: 'buffer', to: 'disk', data: sortedBuffer, runIndex: this.currentRunIndex - 1 },
        buffer: {
          input1: { data: [], status: 'empty', label: 'Buffer Page 1', maxSize: this.pageSize },
          input2: { data: [], status: 'empty', label: 'Buffer Page 2', maxSize: this.pageSize },
          output: { data: [], status: 'empty', label: 'Buffer Page 3', maxSize: this.pageSize }
        },
        diskState: {
          ...current.diskState,
          splitRuns: [...(current.diskState.splitRuns || []), newRun]
        },
        stats: {
          ...current.stats,
          runsCreated: this.currentRunIndex
        }
      };
    }

    return current;
  }

  /**
   * Bắt đầu giai đoạn 2: External Merge Sort
   * @returns {Promise<object>} State mới khi bắt đầu giai đoạn Merge
   * @description
   * - Kiểm tra số lượng runs: nếu chỉ có 1 run thì hoàn tất
   * - Khởi tạo merge pass đầu tiên
   * - Chọn 2 runs đầu tiên để merge
   * - Chuẩn bị các buffers và biến trạng thái
   * @async
   */
  async startMergePhase() {
    console.log('=== START MERGE PHASE ===');
    console.log('this.runs:', this.runs);
    console.log('this.runs.length:', this.runs.length);
    
    if (this.runs.length === 1) {
      // Only one run, copy to output
      return await this.finishSort();
    }
    
    if (this.runs.length === 0) {
      console.error('No runs available to merge');
      return this.getCurrentState();
    }
    
    this.phase = 'merge';
    this.subPhase = 'init';
    this.mergePass = 1;
    
    // Initialize first pass
    this.currentPassRuns = [...this.runs];
    this.nextPassRuns = [];
    
    console.log('this.currentPassRuns:', this.currentPassRuns);
    
    // Validate we have at least 2 runs
    if (this.currentPassRuns.length < 2) {
      console.error('Not enough runs to merge:', this.currentPassRuns.length);
      if (this.currentPassRuns.length === 1) {
        this.runs = this.currentPassRuns;
        return await this.finishSort();
      }
      return this.getCurrentState();
    }
    
    // Start merging first pair
    this.mergeRun1 = this.currentPassRuns[0];
    this.mergeRun2 = this.currentPassRuns[1];
    this.currentPassRuns = this.currentPassRuns.slice(2); // Remove first two
    
    console.log('mergeRun1:', this.mergeRun1);
    console.log('mergeRun2:', this.mergeRun2);
    console.log('remaining currentPassRuns:', this.currentPassRuns);
    
    this.run1Pos = 0;
    this.run2Pos = 0;
    this.input1Buffer = [];
    this.input2Buffer = [];
    this.outputBuffer = [];
    this.mergedData = [];
    this.currentMergeRunIndex = this.currentRunIndex++;
    
    const current = this.states[this.currentStateIndex];
    return {
      ...current,
      phase: 'merge',
      subPhase: 'init',
      currentStepDescription: `🔀 GIAI ĐOẠN 2: External Sort - Lần ${this.mergePass}. Bắt đầu trộn Run ${this.mergeRun1.index} với Run ${this.mergeRun2.index}`,
      animation: null,
      comparing: null,
      buffer: {
        input1: { data: [], status: 'empty', label: 'Buffer Page 1', maxSize: this.pageSize },
        input2: { data: [], status: 'empty', label: 'Buffer Page 2', maxSize: this.pageSize },
        output: { data: [], status: 'empty', label: 'Buffer Page 3', maxSize: this.pageSize }
      },
      diskState: {
        ...current.diskState
      },
      stats: { 
        ...current.stats, 
        currentPhase: `External Sort - Lần ${this.mergePass}` 
      },
      isComplete: false
    };
  }

  /**
   * Thực hiện một bước trong giai đoạn Merge
   * @returns {Promise<object>} State mới sau bước thực hiện
   * @description
   * Giai đoạn Merge có nhiều sub-phases:
   * - init/reload: Nạp dữ liệu từ 2 runs vào 2 input buffers
   * - compare: So sánh phần tử đầu của 2 input buffers
   * - move: Chuyển phần tử nhỏ hơn vào output buffer
   * - flush: Khi output buffer đầy, ghi xuống disk
   * - finish: Hoàn tất merge 1 cặp runs
   * @async
   */
  async executeMergeStep() {
    const current = this.states[this.currentStateIndex];

    console.log('=== EXECUTE MERGE STEP ===');
    console.log('subPhase:', this.subPhase);
    console.log('mergeRun1:', this.mergeRun1 ? `Run ${this.mergeRun1.index} with ${this.mergeRun1.numbers?.length || 0} numbers` : 'undefined');
    console.log('mergeRun2:', this.mergeRun2 ? `Run ${this.mergeRun2.index} with ${this.mergeRun2.numbers?.length || 0} numbers` : 'undefined');

    // Validate merge runs exist
    if (!this.mergeRun1 || !this.mergeRun2) {
      console.error('Invalid merge runs - cannot continue');
      // Return current state but mark as error - nextStep will not progress
      this.phase = 'complete';
      return {
        ...current,
        phase: 'complete',
        error: 'Invalid merge runs',
        currentStepDescription: '❌ LỖI: Không thể tiếp tục merge - runs không hợp lệ'
      };
    }
    
    // Validate runs have numbers array
    if (!this.mergeRun1.numbers || !this.mergeRun2.numbers) {
      console.error('Merge runs missing numbers array');
      this.phase = 'complete';
      return {
        ...current,
        phase: 'complete',
        error: 'Missing numbers array',
        currentStepDescription: '❌ LỖI: Runs thiếu dữ liệu numbers'
      };
    }

    // Step 1: LOAD Input Buffers if empty
    if (this.subPhase === 'init' || this.subPhase === 'reload1' || this.subPhase === 'reload2' || this.subPhase === 'reload_both') {
      let description = '';
      let needLoad1 = this.input1Buffer.length === 0 && this.run1Pos < this.mergeRun1.numbers.length;
      let needLoad2 = this.input2Buffer.length === 0 && this.run2Pos < this.mergeRun2.numbers.length;
      
      if (this.subPhase === 'init' || this.subPhase === 'reload_both') {
        needLoad1 = true;
        needLoad2 = true;
      } else if (this.subPhase === 'reload1') {
        needLoad1 = true;
        needLoad2 = false;
      } else if (this.subPhase === 'reload2') {
        needLoad1 = false;
        needLoad2 = true;
      }
      
      if (needLoad1 && this.run1Pos < this.mergeRun1.numbers.length) {
        const toLoad = Math.min(this.pageSize, this.mergeRun1.numbers.length - this.run1Pos);
        this.input1Buffer = this.mergeRun1.numbers.slice(this.run1Pos, this.run1Pos + toLoad);
        this.run1Pos += toLoad;
        description += `📥 Nạp ${toLoad} số từ Run ${this.mergeRun1.index} vào Input Buffer 1. `;
      }
      
      if (needLoad2 && this.run2Pos < this.mergeRun2.numbers.length) {
        const toLoad = Math.min(this.pageSize, this.mergeRun2.numbers.length - this.run2Pos);
        this.input2Buffer = this.mergeRun2.numbers.slice(this.run2Pos, this.run2Pos + toLoad);
        this.run2Pos += toLoad;
        description += `📥 Nạp ${toLoad} số từ Run ${this.mergeRun2.index} vào Input Buffer 2.`;
      }
      
      this.subPhase = 'compare';
      
      return {
        ...current,
        subPhase: 'compare',
        currentStepDescription: description || '📥 LOAD: Nạp dữ liệu vào Input Buffers',
        animation: { type: 'load_merge', run1: this.mergeRun1.index, run2: this.mergeRun2.index },
        buffer: {
          input1: { data: [...this.input1Buffer], status: 'loaded', label: `Buffer Page 1 (Run ${this.mergeRun1.index})`, maxSize: this.pageSize },
          input2: { data: [...this.input2Buffer], status: 'loaded', label: `Buffer Page 2 (Run ${this.mergeRun2.index})`, maxSize: this.pageSize },
          output: { data: [...this.outputBuffer], status: 'active', label: 'Buffer Page 3', maxSize: this.pageSize }
        }
      };
    }

    // Step 2: COMPARE
    if (this.subPhase === 'compare') {
      if (this.input1Buffer.length === 0 && this.input2Buffer.length === 0) {
        // Both buffers empty, flush output and finish this merge
        if (this.outputBuffer.length > 0) {
          this.subPhase = 'flush';
          // Don't recurse, return state to trigger flush in next step
          return {
            ...current,
            subPhase: 'flush',
            currentStepDescription: '⚠️ Cả hai Input Buffers đều rỗng. Chuẩn bị flush Buffer page 3...',
            buffer: {
              input1: { data: [...this.input1Buffer], status: 'empty', label: `Buffer Page 1 (Run ${this.mergeRun1.index})`, maxSize: this.pageSize },
              input2: { data: [...this.input2Buffer], status: 'empty', label: `Buffer Page 2 (Run ${this.mergeRun2.index})`, maxSize: this.pageSize },
              output: { data: [...this.outputBuffer], status: 'full', label: 'Buffer Page 3', maxSize: this.pageSize }
            }
          };
        } else {
          return await this.finishCurrentMerge();
        }
      }
      
      let compareMsg = '';
      let smaller = null;
      let fromBuffer = null;
      
      if (this.input1Buffer.length > 0 && this.input2Buffer.length > 0) {
        this.comparisonCount++;
        if (this.input1Buffer[0] <= this.input2Buffer[0]) {
          smaller = this.input1Buffer[0];
          fromBuffer = 1;
          compareMsg = `⚖️ COMPARE: ${this.input1Buffer[0]} ≤ ${this.input2Buffer[0]} → Chọn ${smaller} từ Buffer 1`;
        } else {
          smaller = this.input2Buffer[0];
          fromBuffer = 2;
          compareMsg = `⚖️ COMPARE: ${this.input1Buffer[0]} > ${this.input2Buffer[0]} → Chọn ${smaller} từ Buffer 2`;
        }
      } else if (this.input1Buffer.length > 0) {
        smaller = this.input1Buffer[0];
        fromBuffer = 1;
        compareMsg = `⚖️ Buffer 2 trống, chọn ${smaller} từ Buffer 1`;
      } else {
        smaller = this.input2Buffer[0];
        fromBuffer = 2;
        compareMsg = `⚖️ Buffer 1 trống, chọn ${smaller} từ Buffer 2`;
      }
      
      this.subPhase = 'move';
      
      return {
        ...current,
        subPhase: 'move',
        currentStepDescription: compareMsg,
        comparing: { buffer1: this.input1Buffer[0], buffer2: this.input2Buffer[0], winner: smaller, from: fromBuffer },
        buffer: {
          input1: { data: [...this.input1Buffer], status: fromBuffer === 1 ? 'comparing' : 'waiting', label: `Buffer Page 1 (Run ${this.mergeRun1.index})`, maxSize: this.pageSize },
          input2: { data: [...this.input2Buffer], status: fromBuffer === 2 ? 'comparing' : 'waiting', label: `Buffer Page 2 (Run ${this.mergeRun2.index})`, maxSize: this.pageSize },
          output: { data: [...this.outputBuffer], status: 'active', label: 'Buffer Page 3', maxSize: this.pageSize }
        },
        stats: {
          ...current.stats,
          comparisons: this.comparisonCount
        }
      };
    }

    // Step 3: MOVE to Output
    if (this.subPhase === 'move') {
      const comparing = current.comparing;
      const movedValue = comparing.winner;
      
      if (comparing.from === 1) {
        this.input1Buffer.shift();
      } else {
        this.input2Buffer.shift();
      }
      
      this.outputBuffer.push(movedValue);
      this.mergedData.push(movedValue);
      
      // Check if buffer page 3 is full
      if (this.outputBuffer.length >= this.pageSize) {
        this.subPhase = 'flush';
      } else {
        // Check if need to reload input buffers
        if (this.input1Buffer.length === 0 && this.input2Buffer.length === 0) {
          this.subPhase = 'reload_both';
        } else if (this.input1Buffer.length === 0) {
          this.subPhase = 'reload1';
        } else if (this.input2Buffer.length === 0) {
          this.subPhase = 'reload2';
        } else {
          this.subPhase = 'compare';
        }
      }
      
      return {
        ...current,
        subPhase: this.subPhase,
        currentStepDescription: `➡️ MOVE: Chuyển ${movedValue} vào Buffer page 3 (${this.outputBuffer.length}/${this.pageSize})`,
        animation: { type: 'move', value: movedValue, from: comparing.from, to: 'output' },
        comparing: null,
        buffer: {
          input1: { data: [...this.input1Buffer], status: 'active', label: `Buffer Page 1 (Run ${this.mergeRun1.index})`, maxSize: this.pageSize },
          input2: { data: [...this.input2Buffer], status: 'active', label: `Buffer Page 2 (Run ${this.mergeRun2.index})`, maxSize: this.pageSize },
          output: { data: [...this.outputBuffer], status: this.outputBuffer.length >= this.pageSize ? 'full' : 'active', label: 'Buffer Page 3', maxSize: this.pageSize }
        }
      };
    }

    // Step 4: FLUSH Buffer page 3 to Disk
    if (this.subPhase === 'flush') {
      const flushedData = [...this.outputBuffer];
      this.outputBuffer = [];
      
      // Determine next step
      if (this.input1Buffer.length === 0 && this.input2Buffer.length === 0) {
        if (this.run1Pos >= this.mergeRun1.numbers.length && this.run2Pos >= this.mergeRun2.numbers.length) {
          // Both runs exhausted, finish merge
          this.subPhase = 'finish';
        } else {
          this.subPhase = 'reload_both';
        }
      } else if (this.input1Buffer.length === 0) {
        this.subPhase = 'reload1';
      } else if (this.input2Buffer.length === 0) {
        this.subPhase = 'reload2';
      } else {
        this.subPhase = 'compare';
      }
      
      // Update diskState to show intermediate merge progress
      const currentPassIndex = this.mergePass - 1;
      // Deep copy mergePasses to avoid mutation issues
      const updatedMergePasses = (current.diskState.mergePasses || []).map(pass => [...pass]);
      
      if (!updatedMergePasses[currentPassIndex]) {
        updatedMergePasses[currentPassIndex] = [];
      }
      
      // Find the current merging run to show progress
      const existingRunIndex = updatedMergePasses[currentPassIndex].findIndex(
        run => run.name.includes(`Run ${this.currentMergeRunIndex}`)
      );
      
      const newRunDisplay = {
        name: `Run ${this.currentMergeRunIndex} (đang merge ${this.mergeRun1.index}+${this.mergeRun2.index})`,
        numbers: [...this.mergedData],
        status: 'active',
        highlight: Array.from({length: flushedData.length}, (_, i) => this.mergedData.length - flushedData.length + i)
      };
      
      if (existingRunIndex >= 0) {
        // Update existing intermediate run
        updatedMergePasses[currentPassIndex][existingRunIndex] = newRunDisplay;
      } else {
        // Create new intermediate run display
        updatedMergePasses[currentPassIndex].push(newRunDisplay);
      }
      
      return {
        ...current,
        subPhase: this.subPhase,
        currentStepDescription: `💧 FLUSH: Buffer page 3 đầy! Ghi ${flushedData.length} số xuống đĩa vào Run ${this.currentMergeRunIndex}. (Tổng: ${this.mergedData.length} số)`,
        animation: { type: 'flush', data: flushedData, targetRun: this.currentMergeRunIndex },
        buffer: {
          input1: { data: [...this.input1Buffer], status: 'active', label: `Buffer Page 1 (Run ${this.mergeRun1.index})`, maxSize: this.pageSize },
          input2: { data: [...this.input2Buffer], status: 'active', label: `Buffer Page 2 (Run ${this.mergeRun2.index})`, maxSize: this.pageSize },
          output: { data: [], status: 'empty', label: 'Buffer Page 3', maxSize: this.pageSize }
        },
        diskState: {
          ...current.diskState,
          mergePasses: updatedMergePasses
        }
      };
    }

    // Step 5: FINISH - Complete current merge
    if (this.subPhase === 'finish') {
      return await this.finishCurrentMerge();
    }

    // Should not reach here
    return current;
  }

  /**
   * Hoàn tất việc merge 1 cặp runs
   * @returns {Promise<object>} State mới sau khi hoàn tất merge
   * @description
   * - Ghi merged run xuống disk
   * - Kiểm tra xem còn cặp runs nào trong pass hiện tại không
   * - Nếu hết pass, kiểm tra cần pass mới hay đã hoàn tất
   * - Nếu còn nhiều runs, bắt đầu pass mới
   * @async
   */
  async finishCurrentMerge() {
    // Write merged run to disk
    const mergedRunPath = path.join(this.tempDir, `run_${this.currentMergeRunIndex}.bin`);
    
    try {
      await writeBinaryFile(mergedRunPath, this.mergedData);
    } catch (error) {
      console.error('Error writing merged run to disk:', error);
      return this.getCurrentState();
    }
    
    const newMergedRun = {
      path: mergedRunPath,
      numbers: [...this.mergedData],
      index: this.currentMergeRunIndex
    };
    
    this.nextPassRuns.push(newMergedRun);
    
    console.log('=== FINISH CURRENT MERGE ===');
    console.log('newMergedRun:', newMergedRun);
    console.log('newMergedRun.numbers.length:', newMergedRun.numbers.length);
    console.log('nextPassRuns:', this.nextPassRuns);
    console.log('currentPassRuns:', this.currentPassRuns);
    
    const current = this.states[this.currentStateIndex];
    
    // Update mergePasses for visualization
    const currentPassIndex = this.mergePass - 1;
    // Deep copy mergePasses to avoid mutation issues
    const updatedMergePasses = (current.diskState.mergePasses || []).map(pass => [...pass]);
    
    // Ensure we have an array for this pass
    if (!updatedMergePasses[currentPassIndex]) {
      updatedMergePasses[currentPassIndex] = [];
    }
    
    // Replace the intermediate "đang merge" run with the complete run
    const intermediateRunIndex = updatedMergePasses[currentPassIndex].findIndex(
      run => run.name.includes(`Run ${this.currentMergeRunIndex}`)
    );
    
    const newRunDisplay = {
      name: `Run ${this.currentMergeRunIndex} (từ ${this.mergeRun1.index}+${this.mergeRun2.index})`,
      numbers: [...this.mergedData],
      status: 'complete',
      highlight: []
    };
    
    if (intermediateRunIndex >= 0) {
      // Replace intermediate run with complete run
      updatedMergePasses[currentPassIndex][intermediateRunIndex] = newRunDisplay;
    } else {
      // Add new run if not found
      updatedMergePasses[currentPassIndex].push(newRunDisplay);
    }
    
    // Check if there are more pairs to merge in this pass
    if (this.currentPassRuns.length >= 2) {
      // Continue merging next pair in same pass
      this.mergeRun1 = this.currentPassRuns[0];
      this.mergeRun2 = this.currentPassRuns[1];
      
      // Debug logging
      console.log('Continuing merge in same pass:');
      console.log('  currentPassRuns length:', this.currentPassRuns.length);
      console.log('  mergeRun1:', this.mergeRun1);
      console.log('  mergeRun2:', this.mergeRun2);
      
      this.currentPassRuns = this.currentPassRuns.slice(2);
      
      // Validate the runs
      if (!this.mergeRun1 || !this.mergeRun2) {
        console.error('Invalid runs for merging in same pass');
        this.phase = 'complete';
        return {
          ...current,
          phase: 'complete',
          error: 'Invalid runs for next merge pair',
          currentStepDescription: '❌ LỖI: Không thể merge cặp tiếp theo - runs không hợp lệ',
          diskState: {
            ...current.diskState,
            mergePasses: updatedMergePasses
          }
        };
      }
      
      this.run1Pos = 0;
      this.run2Pos = 0;
      this.input1Buffer = [];
      this.input2Buffer = [];
      this.outputBuffer = [];
      this.mergedData = [];
      this.currentMergeRunIndex = this.currentRunIndex++;
      this.subPhase = 'init'; // ✅ FIX: Set subPhase to init for next merge
      
      console.log('Returning state to start next merge pair...');
      
      return {
        ...current,
        phase: 'merge',
        subPhase: 'init',
        currentStepDescription: `✅ Merge hoàn tất! Tạo Run ${newMergedRun.index}. Tiếp tục merge Run ${this.mergeRun1.index} với Run ${this.mergeRun2.index} trong lần ${this.mergePass}...`,
        animation: null,
        comparing: null,
        buffer: {
          input1: { data: [], status: 'empty', label: 'Buffer Page 1', maxSize: this.pageSize },
          input2: { data: [], status: 'empty', label: 'Buffer Page 2', maxSize: this.pageSize },
          output: { data: [], status: 'empty', label: 'Buffer Page 3', maxSize: this.pageSize }
        },
        diskState: {
          ...current.diskState,
          mergePasses: updatedMergePasses
        },
        stats: {
          ...current.stats,
          currentPhase: `External Sort - Lần ${this.mergePass}`
        },
        isComplete: false
      };
    } else {
      // Add any remaining single run to next pass
      if (this.currentPassRuns.length === 1) {
        this.nextPassRuns.push(this.currentPassRuns[0]);
      }
      
      // Pass complete, check if we need another pass
      if (this.nextPassRuns.length > 1) {
        // Start new pass
        this.mergePass++;
        this.runs = [...this.nextPassRuns]; // Update this.runs for new pass
        this.currentPassRuns = [...this.nextPassRuns];
        this.nextPassRuns = [];
        
        // Validate we have at least 2 runs for new pass
        if (this.currentPassRuns.length < 2) {
          console.error('Not enough runs for new pass:', this.currentPassRuns.length);
          if (this.currentPassRuns.length === 1) {
            this.runs = this.currentPassRuns;
            return await this.finishSort();
          }
          return current;
        }
        
        this.mergeRun1 = this.currentPassRuns[0];
        this.mergeRun2 = this.currentPassRuns[1];
        
        // Validate the runs
        if (!this.mergeRun1 || !this.mergeRun2) {
          console.error('Invalid runs for new pass:', this.mergeRun1, this.mergeRun2);
          return current;
        }
        
        this.currentPassRuns = this.currentPassRuns.slice(2);
        
        this.run1Pos = 0;
        this.run2Pos = 0;
        this.input1Buffer = [];
        this.input2Buffer = [];
        this.outputBuffer = [];
        this.mergedData = [];
        this.currentMergeRunIndex = this.currentRunIndex++;
        this.subPhase = 'init'; // ✅ FIX: Set subPhase to init for new pass
        
        console.log('Starting new merge pass:', this.mergePass);
        
        return {
          ...current,
          phase: 'merge',
          subPhase: 'init',
          currentStepDescription: `🔄 Lần ${this.mergePass - 1} hoàn tất! Bắt đầu External Sort - Lần ${this.mergePass}. Merge Run ${this.mergeRun1.index} với Run ${this.mergeRun2.index}...`,
          animation: null,
          comparing: null,
          buffer: {
            input1: { data: [], status: 'empty', label: 'Buffer Page 1', maxSize: this.pageSize },
            input2: { data: [], status: 'empty', label: 'Buffer Page 2', maxSize: this.pageSize },
            output: { data: [], status: 'empty', label: 'Buffer Page 3', maxSize: this.pageSize }
          },
          diskState: {
            ...current.diskState,
            mergePasses: updatedMergePasses
          },
          stats: {
            ...current.stats,
            currentPhase: `External Sort - Lần ${this.mergePass}`
          },
          isComplete: false
        };
      } else {
        // Only one run left, finish
        this.runs = this.nextPassRuns;
        return await this.finishSort();
      }
    }
  }

  /**
   * Hoàn tất thuật toán sắp xếp
   * @returns {Promise<object>} State cuối cùng với kết quả đã sắp xếp
   * @description
   * - Copy run cuối cùng thành file output
   * - Cập nhật diskState để hiển thị file output
   * - Đánh dấu phase = 'complete'
   * @async
   */
  async finishSort() {
    const finalRun = this.runs[0];
    await fs.copyFile(finalRun.path, this.outputFilePath);
    const outputNumbers = await readBinaryFile(this.outputFilePath);
    
    this.phase = 'complete';
    
    const current = this.states[this.currentStateIndex];
    
    return {
      ...current,
      phase: 'complete',
      currentStepDescription: '🎉 HOÀN TẤT! Tất cả số đã được sắp xếp và ghi vào Output File.',
      buffer: {
        input1: { data: [], status: 'empty', label: 'Buffer Page 1', maxSize: this.pageSize },
        input2: { data: [], status: 'empty', label: 'Buffer Page 2', maxSize: this.pageSize },
        output: { data: [], status: 'empty', label: 'Buffer Page 3', maxSize: this.pageSize }
      },
      diskState: {
        ...current.diskState,
        inputFile: {
          ...current.diskState.inputFile,
          status: 'inactive'
        },
        splitRuns: [],
        mergePasses: [],
        outputFile: {
          name: 'File Kết Quả (Đã Sắp Xếp)',
          numbers: outputNumbers,
          status: 'complete',
          highlight: []
        }
      },
      stats: {
        ...current.stats,
        currentPhase: 'Hoàn Thành'
      },
      isComplete: true
    };
  }

  /**
   * Reset thuật toán về trạng thái ban đầu
   * @returns {Promise<void>}
   * @description
   * - Đặt lại currentStateIndex về 0
   * - Xóa tất cả file runs tạm thời
   * - Giữ lại state ban đầu trong mảng states
   * @async
   */
  async reset() {
    this.currentStateIndex = 0;
    this.phase = 'init';
    this.runs = [];
    this.currentRunIndex = 0;
    
    try {
      const files = await fs.readdir(this.tempDir);
      for (const file of files) {
        await fs.unlink(path.join(this.tempDir, file));
      }
    } catch (error) {
      // Ignore
    }
    
    if (this.states.length > 0) {
      this.states = [this.states[0]];
    }
  }
}

module.exports = { ExternalMergeSorter };
