# 📊 Ứng Dụng Minh Họa Thuật Toán External Merge Sort

<div align="center">

**Ứng dụng desktop hiện đại được xây dựng bằng Electron.js, React và Tailwind CSS**

*Cung cấp trải nghiệm trực quan, từng bước một của thuật toán External Merge Sort*

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

</div>

---

## 📚 Mục Lục

1. [Giới Thiệu](#-giới-thiệu)
2. [Tính Năng Nổi Bật](#-tính-năng-nổi-bật)
3. [Thuật Toán External Merge Sort](#-thuật-toán-external-merge-sort)
4. [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
5. [Cài Đặt và Chạy](#-cài-đặt-và-chạy)
6. [Hướng Dẫn Sử Dụng](#-hướng-dẫn-sử-dụng)
7. [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
8. [Chi Tiết Kỹ Thuật](#-chi-tiết-kỹ-thuật)
9. [Giao Diện Người Dùng](#-giao-diện-người-dùng)
10. [Tham Khảo Nhanh](#-tham-khảo-nhanh)
11. [Xử Lý Lỗi](#-xử-lý-lỗi)
12. [Đóng Góp và Phát Triển](#-đóng-góp-và-phát-triển)

---

## 🎯 Giới Thiệu

**External Merge Sort Visualizer** là một ứng dụng giáo dục chuyên nghiệp giúp học sinh, sinh viên và những người yêu thích lập trình hiểu rõ cách hoạt động của thuật toán **External Merge Sort** - một thuật toán sắp xếp được thiết kế đặc biệt để xử lý các tập dữ liệu lớn không thể chứa hết trong RAM.

### 🌟 Điểm Đặc Biệt

- ✅ **Trực quan từng bước**: Theo dõi chi tiết từng thao tác của thuật toán
- ✅ **Hỗ trợ file binary thực**: Làm việc với file `.bin` chứa số Float64 (8 bytes)
- ✅ **Giao diện hiện đại**: Thiết kế gradient đẹp mắt với animation mượt mà
- ✅ **Tương tác hoàn toàn**: Điều khiển tốc độ, tua lại, tạm dừng
- ✅ **Mục đích giáo dục**: Giải thích rõ ràng mỗi bước thuật toán

### 🎓 Đối Tượng Sử Dụng

- 👨‍🎓 **Sinh viên Khoa học Máy tính**: Học về thuật toán sắp xếp ngoài
- 👨‍🏫 **Giảng viên**: Công cụ giảng dạy trực quan
- 💻 **Lập trình viên**: Hiểu sâu về quản lý bộ nhớ và I/O
- 📚 **Người tự học**: Khám phá thuật toán một cách tương tác

---

## ✨ Tính Năng Nổi Bật

### 🎮 Điều Khiển Tương Tác

| Tính năng | Mô tả |
|-----------|-------|
| ▶️ **Play/Pause** | Tự động chạy qua các bước với tốc độ có thể điều chỉnh (100ms - 2000ms) |
| ⏮️ **Previous Step** | Quay lại bước trước đó (lưu trữ toàn bộ lịch sử) |
| ⏭️ **Next Step** | Tiến tới bước tiếp theo |
| 🔄 **Reset** | Khởi động lại từ đầu |
| ⚙️ **Speed Control** | Slider điều chỉnh tốc độ từ nhanh (🐇) đến chậm (🐢) |

### 📊 Visualization Hai Panel

#### 💾 **Panel Disk (Ổ Cứng)**
Hiển thị toàn bộ files trên disk:
- 📥 **File gốc**: Dữ liệu chưa sắp xếp ban đầu
- 📄 **Split Runs**: Các runs từ giai đoạn Split & Sort
- 🔀 **Merge Passes**: Từng lần merge trong External Sort
- 📤 **File output**: Kết quả cuối cùng đã sắp xếp

**Mã màu trạng thái:**
- 🔵 **Active**: Đang xử lý
- 🟡 **Reading**: Đang đọc dữ liệu
- 🟢 **Complete**: Hoàn thành
- ⚪ **Inactive**: Không hoạt động

#### 🧠 **Panel RAM (Bộ Nhớ - 3 Page Buffer)**
Mô hình 3-page buffer:
- **Input Page 1**: Dữ liệu từ run 1
- **Input Page 2**: Dữ liệu từ run 2  
- **Output Page 3**: Kết quả merge

**Mã màu trạng thái:**
- 🟠 **Orange/Comparing**: Đang so sánh
- 🟡 **Yellow/Full**: Buffer đầy
- 🟢 **Loaded**: Đã nạp dữ liệu
- 🔵 **Active**: Đang hoạt động
- ⚪ **Empty**: Trống

### 📁 Xử Lý File Binary

- **🎲 Tạo file ngẫu nhiên**: Sinh dữ liệu test với số lượng tùy chỉnh (4-100 số)
- **📂 Upload file .bin**: Chọn file binary từ hệ thống
- **Định dạng**: Float64 (8-byte double precision)
- **Byte order**: Little-endian (chuẩn)
- **Tạo file test**: Sử dụng `node createBinaryFile.js [số_lượng] [tên_file]`

### 📈 Thống Kê Thời Gian Thực

Panel Status hiển thị:
- ⚡ **Giai đoạn hiện tại**: Khởi tạo / Split & Sort / External Sort / Hoàn thành
- 🔢 **Tổng số phần tử**: Đang sắp xếp
- 🧠 **Số Buffer Pages**: Luôn là 3 (chuẩn 3-page buffer)
- 📦 **Số Runs đã tạo**: Trong quá trình split
- ⚖️ **Số lần so sánh**: Trong giai đoạn merge

### 🎨 UI/UX Hiện Đại

- **Dark Theme**: Gradient từ slate-900 đến slate-800
- **Glassmorphism**: Hiệu ứng backdrop blur
- **Framer Motion**: Animation mượt mà cho mọi thao tác
- **Responsive**: Tự động điều chỉnh layout
- **Icons**: Emoji trực quan dễ hiểu
- **Accessibility**: Tương phản cao, dễ đọc

---

## 🧮 Thuật Toán External Merge Sort

### 📖 Tổng Quan

**External Merge Sort** là thuật toán sắp xếp được thiết kế để xử lý các tập dữ liệu **lớn hơn RAM** có sẵn. Khác với các thuật toán sắp xếp truyền thống (QuickSort, MergeSort), thuật toán này tối ưu hóa việc truy xuất disk.

### 🎯 Tại Sao Cần External Sorting?

| Tình huống | RAM | Dữ liệu | Giải pháp |
|------------|-----|---------|-----------|
| Nhỏ | 4GB | 1GB | In-memory sort (QuickSort, MergeSort) |
| Vừa | 4GB | 10GB | **External Merge Sort** |
| Lớn | 4GB | 100GB | **External Merge Sort** với k-way merge |

**Ví dụ thực tế**: Sắp xếp log file 100GB với chỉ 4GB RAM

### 🔄 Hai Giai Đoạn Chính

#### **Giai Đoạn 1: Split & Sort** (Chia và Sắp Xếp)

**Mục đích**: Chia file lớn thành các runs nhỏ đã sắp xếp

```
┌──────────────────────────────────────────────┐
│  FILE GỐC (chưa sắp xếp)                    │
│  [8, 3, 7, 1, 9, 2, 6, 4, 5, 0]             │
└──────────────────────────────────────────────┘
        ↓ (Đọc chunk, size = pageSize × 3)
┌──────────────────────────────────────────────┐
│  RAM (3 pages): [8, 3, 7, 1, 9, 2]          │
│  ↓ Sort trong RAM                            │
│  RAM (sorted): [1, 2, 3, 7, 8, 9]           │
└──────────────────────────────────────────────┘
        ↓ (Ghi xuống disk)
┌──────────────────────────────────────────────┐
│  RUN 0: [1, 2, 3, 7, 8, 9]  ✓               │
├──────────────────────────────────────────────┤
│  RUN 1: [0, 4, 5, 6]  ✓                     │
└──────────────────────────────────────────────┘
```

**Các bước chi tiết:**

1. **LOAD**: Đọc chunk từ disk vào 3 pages buffer
   ```
   Buffer Page 1: [8, 3]
   Buffer Page 2: [7, 1]
   Buffer Page 3: [9, 2]
   ```

2. **SORT**: Sắp xếp toàn bộ chunk trong RAM
   ```
   Sorted: [1, 2, 3, 7, 8, 9]
   ```

3. **WRITE**: Ghi run đã sắp xếp xuống disk
   ```
   run_0.bin: [1, 2, 3, 7, 8, 9]
   ```

4. **Lặp lại** cho đến hết file gốc

**Kết quả**: Nhiều runs đã sắp xếp cục bộ (trong ứng dụng: `Run 0`, `Run 1`, ...)

#### **Giai Đoạn 2: External Sort** (Merge)

**Mục đích**: Merge các runs thành file đã sắp xếp hoàn chỉnh

**Mô hình 3-Page Buffer:**
- **Input Page 1**: Dữ liệu từ run thứ nhất
- **Input Page 2**: Dữ liệu từ run thứ hai
- **Output Page 3**: Kết quả merge

```
Lần Merge 1:
┌──────────────────────────────────────────────┐
│  Input Page 1 ← RUN 0: [1, 2, 3, 7, 8, 9]  │
│  Input Page 2 ← RUN 1: [0, 4, 5, 6]        │
└──────────────────────────────────────────────┘
        ↓ (So sánh từng phần tử)
┌──────────────────────────────────────────────┐
│  Compare: 1 vs 0 → chọn 0                   │
│  Output Page 3: [0]                         │
│  Compare: 1 vs 4 → chọn 1                   │
│  Output Page 3: [0, 1]                      │
│  ... tiếp tục ...                           │
└──────────────────────────────────────────────┘
        ↓ (Flush khi output đầy)
┌──────────────────────────────────────────────┐
│  RUN 2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]  ✓  │
└──────────────────────────────────────────────┘
```

**Các bước chi tiết:**

1. **LOAD**: Nạp 2 runs vào 2 input pages
   ```
   Input Page 1: [1, 2] (từ Run 0)
   Input Page 2: [0, 4] (từ Run 1)
   Output Page 3: []
   ```

2. **COMPARE**: So sánh phần tử đầu
   ```
   1 vs 0 → Winner: 0 (từ Input Page 2)
   ```

3. **MOVE**: Chuyển phần tử thắng vào output
   ```
   Output Page 3: [0]
   Input Page 2: [4] (đã lấy 0)
   ```

4. **FLUSH**: Khi output đầy (= pageSize), ghi xuống disk
   ```
   Ghi [0, 1] vào run mới
   Output Page 3: [] (clear)
   ```

5. **RELOAD**: Nạp thêm dữ liệu vào input pages trống

6. **Lặp lại** cho đến khi merge hết 2 runs

**Kết quả lần merge**: 1 run lớn hơn đã merge

**Lặp lại giai đoạn merge** cho đến khi chỉ còn 1 run duy nhất = **File đã sắp xếp hoàn chỉnh**

### 📐 Độ Phức Tạp

#### **Thời gian**

- **Giai đoạn 1** (Split & Sort): **O(n log k)**
  - n = tổng số phần tử
  - k = kích thước buffer (pageSize × 3)
  - Số runs tạo ra = ⌈n/k⌉
  - Mỗi run sort: O(k log k)

- **Giai đoạn 2** (Merge): **O(n log(n/k))**
  - Mỗi lần merge: O(n) - duyệt qua tất cả phần tử
  - Số lần merge: log₂(n/k) - merge từng cặp
  - Ví dụ: 8 runs → 4 runs → 2 runs → 1 run (3 lần)

- **Tổng thể**: **O(n log k) + O(n log(n/k)) ≈ O(n log n)**

#### **Không gian**

- **RAM**: **O(k)** - cố định, không phụ thuộc kích thước dữ liệu
  - Trong ứng dụng: 3 pages × pageSize (mặc định: 3 × 2 = 6 phần tử)
- **Disk**: **O(n)**
  - Lưu trữ tạm thời các runs
  - Được xóa sau khi hoàn thành

#### **I/O Complexity**

- **Số lần đọc/ghi**: O(n log(n/k))
- **Tối ưu**: Giảm số lần merge bằng cách tăng k (RAM)

### 🎬 State Machine Architecture

Ứng dụng sử dụng **State Machine** thay vì vòng lặp truyền thống để:

#### Lợi ích

- ✅ **Tua lại**: Navigate backward trong history
- ✅ **Tạm dừng**: Pause tại bất kỳ bước nào
- ✅ **Visualization**: Hiển thị chi tiết mọi thao tác
- ✅ **Educational**: Mỗi atomic operation là 1 state riêng

#### Cấu trúc State

```javascript
{
  // Giai đoạn chính
  phase: 'init' | 'split' | 'merge' | 'complete',
  
  // Giai đoạn phụ
  subPhase: 'load' | 'sort' | 'write' | 'compare' | 'move' | 'flush',
  
  // Mô tả chi tiết
  currentStepDescription: "📥 LOAD: Nạp 2 số từ Run 0 vào Input Buffer 1",
  
  // Trạng thái 3 buffer pages
  buffer: {
    input1: { data: [1, 2], status: 'loaded', label: '...', maxSize: 2 },
    input2: { data: [0, 4], status: 'loaded', label: '...', maxSize: 2 },
    output: { data: [], status: 'empty', label: '...', maxSize: 2 }
  },
  
  // Trạng thái disk
  diskState: {
    inputFile: { name, numbers, status, highlight },
    splitRuns: [{ name, numbers, status }, ...],
    mergePasses: [[{ name, numbers, status }, ...], ...],
    outputFile: { name, numbers, status }
  },
  
  // Thống kê
  stats: {
    totalNumbers: 10,
    pageSize: 2,
    bufferPages: 3,
    currentPhase: "Giai Đoạn 2: External Sort",
    runsCreated: 2,
    comparisons: 5
  },
  
  // Animation data
  comparing: { buffer1: 1, buffer2: 0, winner: 0, from: 2 },
  animation: { type: 'move', value: 0, from: 2, to: 'output' },
  
  isComplete: false
}
```

#### Flow Diagram

```
┌─────────────┐
│    INIT     │ Khởi tạo
└──────┬──────┘
       ↓
┌─────────────┐
│    SPLIT    │ Giai đoạn 1: Split & Sort
│  ├─ load    │   - Đọc chunk vào RAM
│  ├─ sort    │   - Sắp xếp trong RAM
│  └─ write   │   - Ghi run xuống disk
└──────┬──────┘
       ↓ (hết file gốc)
┌─────────────┐
│    MERGE    │ Giai đoạn 2: External Sort
│  ├─ init    │   - Chọn 2 runs để merge
│  ├─ load    │   - Nạp vào 2 input pages
│  ├─ compare │   - So sánh phần tử đầu
│  ├─ move    │   - Move winner vào output
│  ├─ flush   │   - Ghi output xuống disk
│  └─ finish  │   - Hoàn thành 1 lần merge
└──────┬──────┘
       ↓ (còn 1 run)
┌─────────────┐
│  COMPLETE   │ Hoàn thành
└─────────────┘
```

---

## 💻 Yêu Cầu Hệ Thống

### Phần Mềm

| Yêu cầu | Phiên bản | Kiểm tra |
|---------|-----------|----------|
| **Node.js** | ≥ 18.0.0 | `node --version` |
| **npm** | ≥ 9.0.0 | `npm --version` |

### Hệ Điều Hành

- ✅ **Windows** 10/11 (64-bit)
- ✅ **macOS** 10.15+ (Catalina trở lên)
- ✅ **Linux** (Ubuntu 20.04+, Fedora 35+, etc.)

### Phần Cứng Đề Xuất

- **RAM**: ≥ 4GB
- **Disk**: ≥ 200MB trống (cho ứng dụng + file tạm)
- **CPU**: Bất kỳ (không yêu cầu cao)
- **Màn hình**: ≥ 1280x720 (khuyến nghị 1400x900 hoặc cao hơn)

---

## 🚀 Cài Đặt và Chạy

### ⚡ Cài Đặt Nhanh (3 Bước)

```powershell
# 1. Di chuyển vào thư mục dự án
cd app-minh-hoa-extsort

# 2. Cài đặt dependencies
npm install

# 3. Chạy ứng dụng
npm run dev
```

### 📖 Hướng Dẫn Chi Tiết

#### Bước 1: Mở Terminal/PowerShell

**Windows:**
- Nhấn `Win + X` → chọn "Windows PowerShell" hoặc "Terminal"
- Hoặc tìm kiếm "PowerShell" trong Start Menu

**macOS/Linux:**
- Nhấn `Cmd + Space` (macOS) hoặc `Ctrl + Alt + T` (Linux)
- Gõ "Terminal" và nhấn Enter

#### Bước 2: Di Chuyển Vào Thư Mục Dự Án

```bash
cd path/to/app-minh-hoa-extsort
```

Thay `path/to/` bằng đường dẫn thực tế đến thư mục dự án.

#### Bước 3: Cài Đặt Dependencies

```bash
npm install
```

**Quá trình này sẽ:**
- Tải về tất cả packages cần thiết (~200MB)
- Tạo thư mục `node_modules`
- Mất khoảng 2-5 phút (tùy tốc độ mạng)

**Packages được cài đặt:**
- Electron 28.x - Framework desktop
- React 18.x - UI library
- Vite 5.x - Build tool
- Tailwind CSS 3.x - CSS framework
- Framer Motion 11.x - Animation library
- Và các dependencies khác...

#### Bước 4: Chạy Ứng Dụng

```bash
npm run dev
```

**Điều gì sẽ xảy ra:**
1. ✅ Vite dev server khởi động tại `http://localhost:5173`
2. ✅ Cửa sổ Electron tự động mở
3. ✅ Hot-reload được kích hoạt (tự động reload khi code thay đổi)
4. ✅ Developer Tools tự động mở (có thể tắt nếu muốn)

#### Bước 5: Tận Hưởng! 🎉

Ứng dụng đã sẵn sàng. Hãy xem phần [Hướng Dẫn Sử Dụng](#-hướng-dẫn-sử-dụng) để bắt đầu.

### 🔨 Build Cho Production

Để tạo file thực thi độc lập:

```bash
# Build React app
npm run build

# Package Electron app
npm run build:electron
```

File executable sẽ nằm trong thư mục `dist-electron/`.

### 🛠️ Script Tự Động (Windows)

```powershell
# Chạy script setup tự động
.\setup.ps1
```

Script này sẽ:
1. Kiểm tra Node.js
2. Cài đặt dependencies
3. Chạy ứng dụng

---

## 🎮 Hướng Dẫn Sử Dụng

### 📝 Bước 1: Chuẩn Bị Dữ Liệu

Bạn có 2 cách để có dữ liệu:

#### Option A: Tạo File Ngẫu Nhiên

1. Click nút **"🎲 Tạo Dữ Liệu"**
2. Nhập số lượng (khuyến nghị: 10-30 cho demo)
3. Click **"✓ Tạo"**
4. File sẽ được tạo tại `test-data/mock_data_[timestamp].bin`

#### Option B: Upload File Có Sẵn

1. Click nút **"📁 Chọn File .bin"**
2. Chọn file binary từ máy tính
3. File phải là định dạng Float64 (8 bytes/số)

#### Tạo File Test Bằng Script

```bash
# Tạo file với 20 số
node createBinaryFile.js 20

# Tạo file với tên tùy chỉnh
node createBinaryFile.js 50 my_test.bin
```

### 📋 Bước 2: Khởi Tạo Thuật Toán

Sau khi có file dữ liệu:

1. Ứng dụng tự động load file
2. Click nút bất kỳ để bắt đầu (Play hoặc Next Step)
3. State khởi tạo sẽ hiển thị:
   - File gốc với tất cả số
   - 3 buffer pages (trống)
   - Thống kê ban đầu

### 🎬 Bước 3: Điều Khiển Visualization

#### A. Chế Độ Tự Động (Auto-Play)

```
▶️ [Chạy] → Ứng dụng tự động chạy qua từng bước
⏸️ [Tạm Dừng] → Dừng tại bước hiện tại
```

**Điều chỉnh tốc độ:**
- Kéo slider từ 🐇 (nhanh - 100ms) đến 🐢 (chậm - 2000ms)
- Tốc độ mặc định: 800ms/bước

#### B. Chế Độ Thủ Công (Step-by-Step)

```
⏭️ [Bước Tiếp] → Tiến 1 bước
⏮️ [Bước Lùi] → Lùi 1 bước (không khả dụng trong app hiện tại)
```

Phù hợp cho:
- Học chi tiết từng thao tác
- Chụp ảnh màn hình để báo cáo
- Giảng dạy từng bước

#### C. Reset

```
🔄 [Làm Lại] → Quay về trạng thái ban đầu
```

### 📊 Bước 4: Theo Dõi Visualization

#### Panel Disk (Bên Trái)

**Giai đoạn Split & Sort:**
```
📥 FILE GỐC
  [8, 3, 7, 1, 9, 2, ...]

🔄 GIAI ĐOẠN SPLIT & SORT
  Run 0: [1, 2, 3] ✓
  Run 1: [7, 8, 9] ✓
```

**Giai đoạn Merge:**
```
🔀 GIAI ĐOẠN EXTERNAL SORT: LẦN 1
  Run 2 (từ 0+1): [1, 2, 3, 7, 8, 9] ✓

🔀 GIAI ĐOẠN EXTERNAL SORT: LẦN 2
  Run 3 (từ 2+...): [0, 1, 2, 3, 4, 5, ...] ✓
```

**Kết quả:**
```
✅ FILE OUTPUT (ĐÃ SẮP XẾP)
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### Panel RAM (Bên Phải)

**Trong giai đoạn Split:**
```
┌─────────────────────────────┐
│ Buffer Page 1: [8, 3]       │ 🟡 Đang load
│ Buffer Page 2: [7, 1]       │ 🟡 Đang load
│ Buffer Page 3: [9, 2]       │ 🟡 Đang load
└─────────────────────────────┘
         ↓ Sort
┌─────────────────────────────┐
│ Buffer Page 1: [1, 2]       │ 🟢 Sorted
│ Buffer Page 2: [3, 7]       │ 🟢 Sorted
│ Buffer Page 3: [8, 9]       │ 🟢 Sorted
└─────────────────────────────┘
```

**Trong giai đoạn Merge:**
```
┌─────────────────────────────────┐
│ Buffer Page 1 (Run 0): [1, 2]  │ 🔵 Active
│ Buffer Page 2 (Run 1): [0, 4]  │ 🔵 Active
│ Buffer Page 3: []              │ ⚪ Empty
└─────────────────────────────────┘
         ↓ Compare: 1 vs 0
┌─────────────────────────────────┐
│ Buffer Page 1 (Run 0): [1, 2]  │ ⚪ Waiting
│ Buffer Page 2 (Run 1): [0, 4]  │ 🟠 Comparing
│ Buffer Page 3: []              │ ⚪ Empty
└─────────────────────────────────┘
         ↓ Move 0 to output
┌─────────────────────────────────┐
│ Buffer Page 1 (Run 0): [1, 2]  │ 🔵 Active
│ Buffer Page 2 (Run 1): [4]     │ 🔵 Active
│ Buffer Page 3: [0]             │ 🔵 Active
└─────────────────────────────────┘
         ↓ Output full → Flush
┌─────────────────────────────────┐
│ Buffer Page 1 (Run 0): [1, 2]  │ 🔵 Active
│ Buffer Page 2 (Run 1): [4]     │ 🔵 Active
│ Buffer Page 3: []              │ 🟡 Flushed
└─────────────────────────────────┘
```

#### Panel Status (Trên Cùng)

```
┌────────────────────────────────────────────┐
│ 📋 Đang thực hiện:                         │
│ ⚖️ COMPARE: 1 ≤ 0 → Chọn 0 từ Buffer 2    │
│                                            │
│ Giai đoạn: External Sort - Lần 1          │
│ Tổng số: 10                                │
│ Số lượng Buffer Pages: 3                   │
│ Runs: 2                                    │
└────────────────────────────────────────────┘
```

### 💡 Tips Sử Dụng

1. **Học từ từ**: Bắt đầu với 10-15 số, tốc độ chậm
2. **Quan sát màu sắc**: Mỗi màu có ý nghĩa riêng
3. **Đọc mô tả**: Panel Status giải thích chi tiết từng bước
4. **So sánh panels**: Xem dữ liệu di chuyển giữa Disk và RAM
5. **Test case**: Thử với số lượng khác nhau để hiểu độ phức tạp

### 🧪 Test Cases Gợi Ý

| Test | Số lượng | Page Size | Runs dự kiến | Merge passes |
|------|----------|-----------|--------------|--------------|
| Tối thiểu | 6 | 2 | 1 | 0 (direct sort) |
| Cơ bản | 10 | 2 | 2 | 1 |
| Trung bình | 20 | 2 | 4 | 2 |
| Phức tạp | 50 | 2 | 9 | 4 |

---

## 📁 Cấu Trúc Dự Án

### 🗂️ Tổng Quan Thư Mục

```
app-minh-hoa-extsort/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies, scripts, metadata
│   ├── vite.config.js           # Vite build configuration
│   ├── tailwind.config.js       # Tailwind CSS customization
│   ├── postcss.config.js        # PostCSS plugins
│   └── .gitignore               # Git ignore rules
│
├── ⚡ Electron (Main Process)
│   └── electron/
│       ├── main.js              # Entry point, IPC handlers
│       ├── preload.js           # IPC bridge (contextBridge)
│       └── utils/
│           ├── fileUtils.js     # Binary file I/O
│           └── externalMergeSort.js  # Algorithm state machine
│
├── ⚛️ React (Renderer Process)
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx              # Main component
│       ├── index.css            # Global styles + Tailwind
│       ├── components/
│       │   ├── TopBar.jsx       # File controls
│       │   ├── ControlPanel.jsx # Playback controls
│       │   ├── StatusPanel.jsx  # Current step info
│       │   ├── RAMVisualization.jsx   # RAM panel
│       │   └── DiskVisualization.jsx  # Disk panel
│       └── types/
│           └── electron.d.ts    # TypeScript definitions
│
├── 🛠️ Utilities
│   ├── createBinaryFile.js      # Binary file generator
│   └── setup.ps1                # PowerShell setup script
│
├── 📁 Generated/Runtime
│   ├── test-data/               # Generated test files
│   │   ├── *.bin                # Binary data files
│   │   └── runs/                # Temporary run files
│   ├── node_modules/            # Dependencies (gitignored)
│   └── dist/                    # Production build
│
└── 🌐 Entry Point
    └── index.html               # HTML shell for Electron
```

### 📦 Key Files Chi Tiết

#### **electron/main.js** (330 dòng)
**Vai trò**: Main process của Electron, điều phối toàn bộ ứng dụng

**Chức năng:**
- Tạo BrowserWindow
- Xử lý IPC handlers:
  - `generate-mock-file`: Tạo file test
  - `select-file`: Mở dialog chọn file
  - `init-sort`: Khởi tạo thuật toán
  - `next-step`: Bước tiếp theo
  - `prev-step`: Bước trước
  - `reset-sort`: Reset
  - `get-current-state`: Lấy state hiện tại
- Quản lý lifecycle ứng dụng

**JSDoc**: ✅ Đầy đủ

#### **electron/preload.js** (70 dòng)
**Vai trò**: Cầu nối bảo mật giữa main và renderer process

**Chức năng:**
- Expose API qua `contextBridge`
- Chuyển đổi IPC calls
- Đảm bảo contextIsolation

**Security**: ✅ Secure (không expose toàn bộ Node.js)

#### **electron/utils/fileUtils.js** (130 dòng)
**Vai trò**: Xử lý I/O file binary

**Chức năng:**
- `readBinaryFile()`: Đọc toàn bộ file
- `writeBinaryFile()`: Ghi file binary
- `readBinaryChunk()`: Đọc một phần file
- `getBinaryFileCount()`: Đếm số phần tử
- `generateMockBinaryFile()`: Tạo file test
- `readBinaryFileSync()`: Đọc đồng bộ

**Format**: Float64 (8 bytes), Little-endian

#### **electron/utils/externalMergeSort.js** (880 dòng)
**Vai trò**: Trái tim của thuật toán - State machine implementation

**Class**: `ExternalMergeSorter`

**Methods chính:**
- `initialize()`: Khởi tạo state ban đầu
- `nextStep()`: Tính toán state tiếp theo
- `previousStep()`: Quay lại state trước
- `getCurrentState()`: Lấy state hiện tại
- `startSplitPhase()`: Bắt đầu giai đoạn 1
- `executeSplitStep()`: Thực hiện các bước split
- `startMergePhase()`: Bắt đầu giai đoạn 2
- `executeMergeStep()`: Thực hiện các bước merge
- `finishCurrentMerge()`: Hoàn thành 1 lần merge
- `finishSort()`: Hoàn thành thuật toán
- `reset()`: Reset về ban đầu

**Data Structures:**
```javascript
{
  states: [],              // Lịch sử tất cả states
  currentStateIndex: -1,   // Vị trí hiện tại
  phase: 'init',          // Giai đoạn chính
  subPhase: 'start',      // Giai đoạn phụ
  runs: [],               // Danh sách runs
  pageSize: 2,            // Kích thước mỗi page
  // ... và nhiều biến khác
}
```

#### **src/App.jsx** (190 dòng)
**Vai trò**: Main React component, quản lý toàn bộ UI state

**State Management:**
```javascript
const [state, setState] = useState(null);        // State từ algorithm
const [isRunning, setIsRunning] = useState(false); // Auto-play status
const [speed, setSpeed] = useState(800);          // Animation speed (ms)
const [intervalId, setIntervalId] = useState(null); // Auto-play interval
```

**Event Handlers:**
- `handleGenerateFile()`: Tạo file test
- `handleSelectFile()`: Chọn và load file
- `handleNextStep()`: Bước tiếp
- `handlePlay()`: Bật auto-play
- `handlePause()`: Tắt auto-play
- `handleReset()`: Reset

#### **src/components/*** (5 files, ~600 dòng total)

**TopBar.jsx** (100 dòng)
- File selection controls
- Generate mock file modal
- Title và branding

**ControlPanel.jsx** (100 dòng)
- Playback buttons (Play, Pause, Next, Reset)
- Speed slider
- Disabled states

**StatusPanel.jsx** (60 dòng)
- Current step description
- Statistics grid
- Phase indicator

**RAMVisualization.jsx** (175 dòng)
- 3-page buffer visualization
- Color-coded states
- Animation for number movement
- Comparison indicator

**DiskVisualization.jsx** (165 dòng)
- File listings (input, runs, output)
- Run organization by phase
- Status badges
- Number display with truncation

### 🔧 Configuration Files

#### **package.json**
```json
{
  "name": "app-minh-hoa-extsort",
  "version": "1.0.0",
  "main": "electron/main.js",
  "scripts": {
    "dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\"",
    "build": "vite build",
    "build:electron": "electron-builder"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0",
    "electron": "^28.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@vitejs/plugin-react": "^4.2.0",
    "concurrently": "^8.2.0",
    "wait-on": "^7.2.0"
  }
}
```

#### **vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
```

#### **tailwind.config.js**
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      }
    }
  }
};
```

---

## 🔬 Chi Tiết Kỹ Thuật

### 🏗️ Kiến Trúc

#### Electron Multi-Process Architecture

```
┌────────────────────────────────────────────┐
│          MAIN PROCESS (Node.js)            │
│  • electron/main.js                        │
│  • Quyền truy cập hệ thống đầy đủ          │
│  • Quản lý BrowserWindow                   │
│  • IPC Handlers                            │
│  • File system operations                  │
└─────────────┬──────────────────────────────┘
              │
              │ IPC (Inter-Process Communication)
              │
┌─────────────┴──────────────────────────────┐
│       PRELOAD SCRIPT (Bridge)              │
│  • electron/preload.js                     │
│  • contextBridge.exposeInMainWorld()       │
│  • Secure API exposure                     │
└─────────────┬──────────────────────────────┘
              │
              │ window.electronAPI
              │
┌─────────────┴──────────────────────────────┐
│      RENDERER PROCESS (Chromium)           │
│  • src/**/*.jsx (React)                    │
│  • UI rendering                            │
│  • No direct system access                 │
│  • Calls main via IPC                      │
└────────────────────────────────────────────┘
```

#### IPC Communication Flow

**Ví dụ: Next Step**

```javascript
// 1. USER ACTION (React UI)
<button onClick={handleNextStep}>Next</button>

// 2. EVENT HANDLER (App.jsx)
const handleNextStep = async () => {
  const result = await window.electronAPI.nextStep();
  setState(result.state);
};

// 3. PRELOAD BRIDGE (preload.js)
contextBridge.exposeInMainWorld('electronAPI', {
  nextStep: () => ipcRenderer.invoke('next-step')
});

// 4. IPC HANDLER (main.js)
ipcMain.handle('next-step', async () => {
  const state = await sorter.nextStep();
  return { success: true, state };
});

// 5. ALGORITHM (externalMergeSort.js)
async nextStep() {
  // Generate new state
  const newState = await this.executeSplitStep();
  this.states.push(newState);
  return newState;
}

// 6. RETURN TO REACT
// → state updates → UI re-renders
```

### 🗄️ Binary File Format

#### Structure

```
File: data.bin
──────────────────────────────────────
Offset  | Bytes     | Value (Float64)
──────────────────────────────────────
0x0000  | 00 00...  | 3.14159...
0x0008  | 00 00...  | 2.71828...
0x0010  | 00 00...  | 1.41421...
0x0018  | 00 00...  | ...
──────────────────────────────────────
Total: N × 8 bytes
```

#### Reading Algorithm

```javascript
function readBinaryFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  const numbers = [];
  const DOUBLE_SIZE = 8;
  
  for (let i = 0; i < buffer.length; i += DOUBLE_SIZE) {
    const value = buffer.readDoubleLE(i);  // Little-endian
    numbers.push(value);
  }
  
  return numbers;
}
```

#### Writing Algorithm

```javascript
function writeBinaryFile(filePath, numbers) {
  const DOUBLE_SIZE = 8;
  const buffer = Buffer.allocUnsafe(numbers.length * DOUBLE_SIZE);
  
  numbers.forEach((num, i) => {
    buffer.writeDoubleLE(num, i * DOUBLE_SIZE);  // Little-endian
  });
  
  fs.writeFileSync(filePath, buffer);
}
```

#### Tạo File Test

```javascript
// createBinaryFile.js
const numbers = [];
for (let i = 0; i < 20; i++) {
  const num = Math.round((Math.random() * 200 - 100) * 100) / 100;
  numbers.push(num);
}
writeBinaryFile('test.bin', numbers);
```

**Usage:**
```bash
node createBinaryFile.js 50 mytest.bin
```

### 🧠 State Machine Implementation

#### Why State Machine?

**Traditional Loop:**
```javascript
// ❌ Không thể pause, không thể tua lại
function sort(data) {
  while (!done) {
    // ... thao tác ...
  }
  return result;
}
```

**State Machine:**
```javascript
// ✅ Có thể pause, tua lại, visualize
class Sorter {
  states = [];
  currentIndex = 0;
  
  nextStep() {
    const newState = this.computeNextState();
    this.states.push(newState);
    this.currentIndex++;
    return newState;
  }
  
  previousStep() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    return this.states[this.currentIndex];
  }
}
```

#### State Transition Diagram

```
       ┌─────────┐
       │  INIT   │
       └────┬────┘
            │ initialize()
            ↓
       ┌─────────┐
       │  SPLIT  │
       │         │
  ┌────│ • load  │←──┐
  │    │ • sort  │   │ (còn data)
  │    │ • write │──┘
  └────┴────┬────┘
            │ (hết data)
            ↓
       ┌─────────┐
       │  MERGE  │
       │         │
  ┌────│ • init  │←─────┐
  │    │ • load  │      │
  │    │ • comp  │      │ (còn > 1 run)
  │    │ • move  │      │
  │    │ • flush │      │
  └────│ • fin   │──────┘
       └────┬────┘
            │ (1 run)
            ↓
       ┌─────────┐
       │COMPLETE │
       └─────────┘
```

### 🎨 Styling System

#### Tailwind Utility Classes

```javascript
// Gradient backgrounds
"bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"

// Glassmorphism
"bg-slate-800/40 backdrop-blur-sm"

// Animations
"transition-all duration-300 ease-in-out"
"hover:scale-105 active:scale-95"
```

#### Color Palette

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      // Disk panel
      disk: {
        bg: '#1e293b',        // slate-800
        border: '#334155'     // slate-700
      },
      // RAM panel
      ram: {
        bg: '#0f172a',        // slate-900
        border: '#1e293b'     // slate-800
      },
      // States
      unsorted: '#f97316',    // orange-600
      processing: '#facc15',  // yellow-400
      sorted: '#22c55e',      // green-500
      comparing: '#fb923c',   // orange-400
      active: '#3b82f6'       // blue-500
    }
  }
}
```

#### Component Styling Pattern

```jsx
<motion.div
  className="
    bg-slate-800/70         /* Background */
    backdrop-blur-sm        /* Glassmorphism */
    border border-slate-700 /* Border */
    rounded-xl              /* Rounded corners */
    p-4                     /* Padding */
    shadow-lg               /* Shadow */
    transition-all          /* Smooth transitions */
  "
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  {/* Content */}
</motion.div>
```

### 🎬 Animation System (Framer Motion)

#### Spring Animations

```jsx
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0, opacity: 0 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
  {number}
</motion.div>
```

#### Layout Animations

```jsx
<motion.div layout>
  {/* Tự động animate khi position/size thay đổi */}
  {items.map(item => <Item key={item.id} {...item} />)}
</motion.div>
```

#### Staggered Animations

```jsx
{numbers.map((num, idx) => (
  <motion.div
    key={idx}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: idx * 0.05 }}
  >
    {num}
  </motion.div>
))}
```

### ⚡ Performance Optimizations

#### React

- ✅ Functional components với hooks
- ✅ Minimal re-renders (proper state structure)
- ✅ `key` props cho lists
- ✅ Không có unnecessary `useEffect`

#### Framer Motion

- ✅ `layout` animations (GPU-accelerated)
- ✅ `animate` thay vì CSS transitions
- ✅ `AnimatePresence` cho exit animations

#### Electron

- ✅ IPC async (không block UI)
- ✅ Buffer operations (không parse JSON cho binary)
- ✅ Chunked reading (không load toàn bộ file lớn)

---

##  🎨 Giao Diện Người Dùng

### 🖼️ Layout Tổng Quan

```
┌──────────────────────────────────────────────────┐
│  ⚡ External Merge Sort                          │
│           [🎲 Tạo Dữ Liệu] [📁 Chọn File]       │ TopBar
├──────────────────────────────────────────────────┤
│  [▶️ Chạy] [⏸️ Tạm Dừng] [⏭️] [🔄] 🐇──●──🐢   │ ControlPanel
├──────────────────────────────────────────────────┤
│  📋 Đang thực hiện: COMPARE 1 vs 0 → chọn 0     │
│  Giai đoạn: External Sort | Tổng: 10 | Runs: 2  │ StatusPanel
├───────────────────┬──────────────────────────────┤
│   💾 DISK         │      🧠 RAM                  │
│                   │                              │
│  📥 FILE GỐC      │   3 Pages Buffer             │
│  [8,3,7,1,9,...]  │   ┌──────────────┐          │
│                   │   │ Page 1: [1,2]│ 🔵       │
│  🔄 SPLIT RUNS    │   │ Page 2: [0,4]│ 🟠       │
│  Run 0: [1,2,3]   │   │ Page 3: []   │ ⚪       │
│  Run 1: [7,8,9]   │   └──────────────┘          │
│                   │                              │
│  🔀 MERGE PASSES  │   Compare: 1 vs 0            │
│  Run 2: [1,2,3..] │   Winner: 0 ✓               │
│                   │                              │
│  ✅ OUTPUT FILE   │                              │
│  [0,1,2,3,4,...]  │                              │
│                   │                              │
└───────────────────┴──────────────────────────────┘
│  External Merge Sort Visualization • Electron   │ Footer
└──────────────────────────────────────────────────┘
```

### 🎨 Color System

| Màu | Hex | Ý nghĩa | Sử dụng |
|-----|-----|---------|---------|
| 🟠 Orange | `#f97316` | Unsorted / Comparing | Dữ liệu chưa sắp xếp, đang so sánh |
| 🟡 Yellow | `#facc15` | Processing / Full | Đang xử lý, buffer đầy |
| 🟢 Green | `#22c55e` | Sorted / Complete | Đã sắp xếp, hoàn thành |
| 🔵 Blue | `#3b82f6` | Active / Loaded | Đang active, đã load |
| 🔴 Red | `#ef4444` | Full / Alert | Buffer đầy cần flush |
| ⚪ Gray | `#64748b` | Empty / Inactive | Trống, không hoạt động |

### 📐 Components Chi Tiết

#### 1. TopBar

**Chức năng:**
- Branding và title
- File generation controls
- File selection controls

**Elements:**
```jsx
<TopBar>
  <Title>⚡ External Merge Sort</Title>
  <Subtitle>3-Page Buffer Model</Subtitle>
  
  <Button onClick={onGenerateFile}>
    🎲 Tạo Dữ Liệu
  </Button>
  
  <Button onClick={onSelectFile}>
    📁 Chọn File .bin
  </Button>
</TopBar>
```

**Modal Sinh Dữ Liệu:**
```
┌────────────────────────────────┐
│ Tạo File Dữ Liệu Ngẫu Nhiên   │
├────────────────────────────────┤
│ Số lượng:                      │
│ ┌────────┐                     │
│ │   20   │                     │
│ └────────┘                     │
│                                │
│ [✓ Tạo]  [Hủy]                │
└────────────────────────────────┘
```

#### 2. ControlPanel

**Layout:**
```
┌──────────────────────────────────────────────────┐
│ [▶️ Chạy] [⏭️ Bước Tiếp] [🔄 Làm Lại]          │
│                                                  │
│ Tốc Độ: 🐇 ●─────────── 🐢  [800ms]           │
└──────────────────────────────────────────────────┘
```

**Button States:**
- **Active**: Gradient background, shadow
- **Disabled**: Opacity 50%, no hover
- **Hover**: Scale 1.05
- **Active**: Scale 0.95

#### 3. StatusPanel

**Layout:**
```
┌────────────────────────────────────────────────┐
│ 📋 Đang thực hiện:                             │
│ ⚖️ COMPARE: 1 ≤ 0 → Chọn 0 từ Buffer 2        │
├─────────────┬─────────────┬─────────┬─────────┤
│ Giai đoạn   │  Tổng số    │ Buffer  │  Runs   │
│ External S  │     10      │    3    │    2    │
│     🟣      │     🔵      │   🟢    │   🟡    │
└─────────────┴─────────────┴─────────┴─────────┘
```

**Typography:**
- Title: `text-sm font-semibold text-blue-300`
- Description: `text-base text-white font-medium`
- Stats: `text-base font-bold`

#### 4. RAMVisualization

**3-Page Buffer Layout:**
```
┌────────────────────────────────────────┐
│ 🧠 RAM (Buffer)                        │
├────────────────────────────────────────┤
│ 3 Pages Buffer                         │
│ Kích thước mỗi trang: 2 phần tử       │
├────────────────────────────────────────┤
│ ⚖️ 1 ⚖️ 0 → ✓ 0                       │ Comparing
├────────────────────────────────────────┤
│ Buffer Page 1 (Run 0)         (2/2)   │
│ ┌────────────────────────────────┐    │
│ │  [1] [2]                       │ 🔵 │
│ └────────────────────────────────┘    │
├────────────────────────────────────────┤
│ Buffer Page 2 (Run 1)         (2/2)   │
│ ┌────────────────────────────────┐    │
│ │  [0] [4]                       │ 🟠 │
│ └────────────────────────────────┘    │
├────────────────────────────────────────┤
│ Buffer Page 3                  (0/2)   │
│ ┌────────────────────────────────┐    │
│ │  Trống                         │ ⚪ │
│ └────────────────────────────────┘    │
└────────────────────────────────────────┘
```

**Status Badges:**
- `🔵 Active`: `bg-blue-600 text-white`
- `🟠 Comparing`: `bg-orange-600 text-white animate-pulse`
- `🟢 Sorted`: `bg-green-600 text-white`
- `🟡 Full`: `bg-red-600 text-white`
- `⚪ Empty`: `text-slate-500`

#### 5. DiskVisualization

**Hierarchical File Display:**
```
┌────────────────────────────────────────┐
│ 💾 DISK (Ổ Cứng)                      │
├────────────────────────────────────────┤
│ 📥 FILE GỐC                            │
│ ┌──────────────────────────────────┐  │
│ │ File Gốc (Chưa Sắp Xếp)         │  │
│ │ 10 số                      📖    │  │
│ │ [8][3][7][1][9][2][6][4][5][0]  │  │
│ └──────────────────────────────────┘  │
├────────────────────────────────────────┤
│ 🔄 GIAI ĐOẠN SPLIT & SORT             │
│ ┌──────────────────────────────────┐  │
│ │ Run 0                      ✅    │  │
│ │ 6 số                             │  │
│ │ [1][2][3][7][8][9]               │  │
│ └──────────────────────────────────┘  │
│ ┌──────────────────────────────────┐  │
│ │ Run 1                      ✅    │  │
│ │ 4 số                             │  │
│ │ [0][4][5][6]                     │  │
│ └──────────────────────────────────┘  │
├────────────────────────────────────────┤
│ 🔀 GIAI ĐOẠN EXTERNAL SORT: LẦN 1    │
│ ┌──────────────────────────────────┐  │
│ │ Run 2 (từ 0+1)            ⚡    │  │
│ │ 10 số                            │  │
│ │ [0][1][2][3][4][5][6][7][8][9]  │  │
│ └──────────────────────────────────┘  │
├────────────────────────────────────────┤
│ ✅ FILE OUTPUT (ĐÃ SẮP XẾP)          │
│ ┌──────────────────────────────────┐  │
│ │ File Kết Quả                ✓    │  │
│ │ 10 số                            │  │
│ │ [0][1][2][3][4][5][6][7][8][9]  │  │
│ └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

**File Status:**
- `📥 / 📤`: Input/Output files
- `📄`: Run files
- `✅ / ⚡ / 📖`: Status indicators

**Number Display:**
- Monospace font: `font-mono`
- Individual boxes: `px-2 py-1 rounded text-xs`
- Color by status: sorted (green), active (purple), etc.

### 🎭 Animations

#### Entry Animation
```jsx
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.3 }}
>
```

#### Number Movement
```jsx
<motion.div
  layout
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  exit={{ scale: 0 }}
  transition={{ type: 'spring' }}
>
```

#### Pulse (Comparing)
```jsx
<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ repeat: Infinity, duration: 1 }}
>
```

### 📱 Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large: > 1400px (optimal)

**Grid Layout:**
```css
/* 2-column on desktop */
@media (min-width: 1280px) {
  .visualization-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* 1-column on tablet/mobile */
@media (max-width: 1279px) {
  .visualization-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 🗂️ Tham Khảo Nhanh

### ⚡ Các Lệnh Thường Dùng

```bash
# Cài đặt
npm install

# Chạy development
npm run dev

# Build production
npm run build

# Tạo file test
node createBinaryFile.js [số_lượng] [tên_file]

# Ví dụ:
node createBinaryFile.js 50
node createBinaryFile.js 20 test.bin
```

### 🎮 Phím Tắt

| Phím | Chức năng |
|------|-----------|
| `Space` | Play/Pause (tương lai) |
| `→` | Next Step (tương lai) |
| `←` | Previous Step (tương lai) |
| `R` | Reset (tương lai) |
| `F12` | Developer Tools |
| `Ctrl+R` | Reload app |

**Lưu ý**: Phím tắt hiện chưa được implement, chỉ là đề xuất cho tương lai.

### 🐛 Troubleshooting

#### Lỗi: Port 5173 đã được sử dụng

**Triệu chứng:**
```
Error: Port 5173 is already in use
```

**Giải pháp (Windows):**
```powershell
# Tìm process đang dùng port 5173
Get-NetTCPConnection -LocalPort 5173

# Kill process
Stop-Process -Id <ProcessId> -Force

# Hoặc kill tất cả Vite processes
Get-Process node | Where-Object {$_.Path -like "*vite*"} | Stop-Process -Force
```

**Giải pháp (macOS/Linux):**
```bash
# Tìm process
lsof -i :5173

# Kill process
kill -9 <PID>
```

#### Lỗi: Dependencies không cài được

**Triệu chứng:**
```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
```

**Giải pháp:**
```bash
# Xóa cache và node_modules
npm cache clean --force
rm -rf node_modules package-lock.json

# Cài lại
npm install
```

#### Lỗi: Electron không khởi động

**Triệu chứng:**
- Cửa sổ Electron không mở
- Hoặc mở ra màn hình trắng

**Giải pháp:**
```bash
# Kill tất cả Electron processes
# Windows:
Get-Process electron | Stop-Process -Force

# macOS/Linux:
killall Electron

# Xóa cache Electron
rm -rf ~/.electron
npm run dev
```

#### Lỗi: "Module not found"

**Triệu chứng:**
```
Error: Cannot find module '...'
```

**Giải pháp:**
```bash
# Kiểm tra package.json có đúng không
npm list [package-name]

# Cài lại package
npm install [package-name]

# Hoặc cài lại tất cả
npm install
```

#### Lỗi: File binary không load được

**Triệu chứng:**
- "Error reading file"
- Hoặc số liệu hiển thị sai

**Giải pháp:**
1. Kiểm tra file có đúng định dạng Float64 không
2. Kiểm tra file có đúng 8 bytes/số không
3. Thử tạo file mới bằng `createBinaryFile.js`

```bash
# Kiểm tra kích thước file
# Windows:
Get-ChildItem test.bin | Select-Object Name, Length

# macOS/Linux:
ls -lh test.bin

# Số phần tử = FileSize / 8
```

### 📦 Dependencies

| Package | Version | Mục đích |
|---------|---------|----------|
| electron | ^28.0.0 | Desktop framework |
| react | ^18.2.0 | UI library |
| react-dom | ^18.2.0 | React DOM renderer |
| framer-motion | ^11.0.0 | Animations |
| vite | ^5.0.0 | Build tool |
| tailwindcss | ^3.4.0 | CSS framework |
| concurrently | ^8.2.0 | Run multiple commands |
| wait-on | ^7.2.0 | Wait for server ready |

### 📂 File Formats

#### Input File (.bin)

```
Format: Binary
Type: Float64 (IEEE 754 double precision)
Byte Order: Little-endian
Size: N × 8 bytes (N = số lượng phần tử)

Structure:
[8 bytes][8 bytes][8 bytes]...
 number1  number2  number3  ...

Example:
3.14, 2.71, 1.41, 9.87, 5.55
→ 40 bytes total (5 × 8)
```

#### Run Files (temporary)

```
Location: test-data/runs/
Format: run_0.bin, run_1.bin, ...
Same structure as input file
Deleted after completion
```

### 🔧 Configuration

#### Tùy chỉnh pageSize

Mặc định: `pageSize = 2` (mỗi page 2 số)

**Thay đổi trong code:**
```javascript
// electron/main.js
ipcMain.handle('init-sort', async (event, filePath, pageSize = 2) => {
  // Thay số 2 thành giá trị khác (1-10)
  sorter = new ExternalMergeSorter(filePath, tempDir, pageSize);
  // ...
});
```

#### Tùy chỉnh tốc độ

Mặc định: `800ms/bước`

**Thay đổi trong code:**
```javascript
// src/App.jsx
const [speed, setSpeed] = useState(800); // Thay 800 thành giá trị khác
```

**Hoặc dùng slider trong UI**

### 📊 Test Cases

| Tên | Số lượng | Page Size | Runs | Merge Passes | Mục đích |
|-----|----------|-----------|------|--------------|----------|
| Minimal | 6 | 2 | 1 | 0 | Direct sort (không cần merge) |
| Basic | 10 | 2 | 2 | 1 | Standard case |
| Medium | 20 | 2 | 4 | 2 | Multiple merges |
| Complex | 50 | 2 | 9 | 4 | Many merge passes |
| Edge | 100 | 2 | 17 | 5 | Stress test |

---

## 🐛 Xử Lý Lỗi

### Error Handling trong Code

#### Frontend (React)

```jsx
try {
  const result = await window.electronAPI.nextStep();
  if (result.success) {
    setState(result.state);
  } else {
    alert(`❌ Lỗi: ${result.error}`);
  }
} catch (error) {
  alert(`❌ Lỗi không mong đợi: ${error.message}`);
  console.error('Error in nextStep:', error);
}
```

#### Backend (Electron Main)

```javascript
ipcMain.handle('next-step', async () => {
  try {
    if (!sorter) {
      return {
        success: false,
        error: 'Sorter not initialized'
      };
    }
    
    const state = await sorter.nextStep();
    
    return {
      success: true,
      state,
      isComplete: state.isComplete
    };
  } catch (error) {
    console.error('[MAIN] Error in next-step:', error);
    return {
      success: false,
      error: error.message
    };
  }
});
```

### Validation

#### File Upload

```javascript
// Kiểm tra file size
const stats = await fs.stat(filePath);
if (stats.size % 8 !== 0) {
  return {
    success: false,
    error: 'Invalid file format: Size must be multiple of 8 bytes'
  };
}

// Kiểm tra empty file
if (stats.size === 0) {
  return {
    success: false,
    error: 'File is empty'
  };
}
```

#### Page Size

```javascript
if (pageSize < 1 || pageSize > 10) {
  return {
    success: false,
    error: 'Page size must be between 1 and 10'
  };
}
```

### Logging

#### Development Mode

```javascript
// electron/main.js
const isDev = !app.isPackaged;

if (isDev) {
  console.log('[DEBUG] Sorter initialized with pageSize:', pageSize);
  console.log('[DEBUG] State:', JSON.stringify(state, null, 2));
}
```

#### File Logging (nếu cần)

```javascript
const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync('app.log', logMessage);
};
```

### Recovery Strategies

#### Auto-save State (tương lai)

```javascript
// Save state to localStorage after each step
const saveState = (state) => {
  try {
    localStorage.setItem('lastState', JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
};

// Load state on startup
const loadState = () => {
  try {
    const saved = localStorage.getItem('lastState');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.warn('Failed to load state:', e);
    return null;
  }
};
```

---

## 🚀 Đóng Góp và Phát Triển

### 🎯 Roadmap Tương Lai

#### Phase 1: User Experience (Dễ)

- [ ] **Keyboard Shortcuts**
  - Space: Play/Pause
  - Arrow keys: Next/Previous
  - R: Reset
  - H: Help modal

- [ ] **Export Functionality**
  - Export sorted file to user's chosen location
  - Export statistics as JSON/CSV
  - Copy numbers to clipboard

- [ ] **Theme Toggle**
  - Dark mode (mặc định)
  - Light mode
  - System preference

- [ ] **Animation Control**
  - Toggle animations on/off
  - Reduce motion option (accessibility)

#### Phase 2: Algorithm Extensions (Trung bình)

- [ ] **K-Way Merge**
  - Merge 3, 4, or more runs at once
  - Visualization với nhiều input buffers
  - So sánh performance với 2-way

- [ ] **Different Page Sizes**
  - UI control để thay đổi pageSize
  - Show impact on number of runs
  - Performance comparison

- [ ] **Comparison Algorithms**
  - Side-by-side với QuickSort
  - Side-by-side với in-memory MergeSort
  - Performance metrics dashboard

- [ ] **Custom Comparators**
  - Ascending/Descending
  - Custom sort functions
  - String sorting

#### Phase 3: Educational Features (Trung bình-Khó)

- [ ] **Tutorial Mode**
  - Step-by-step guided tour
  - Tooltips và hints
  - Quiz questions

- [ ] **Code View**
  - Show actual implementation code
  - Highlight current line executing
  - Syntax highlighting

- [ ] **Challenge Mode**
  - Predict next step
  - Tính số runs sẽ tạo ra
  - Đoán số lần merge

- [ ] **Export Animation**
  - Record to GIF
  - Record to MP4 video
  - Download slideshow (PNG sequence)

#### Phase 4: Advanced Features (Khó)

- [ ] **Multiple Data Types**
  - Int32, Int64
  - Strings (variable length)
  - Custom objects with comparators

- [ ] **Performance Profiling**
  - Track actual I/O operations
  - Measure time complexity
  - Compare với theoretical O(n log n)

- [ ] **Multi-Threading Simulation**
  - Parallel sorting of runs
  - Concurrent merging
  - Visualization của threads

- [ ] **Cloud Integration**
  - Save/load files from cloud
  - Share visualizations
  - Collaborative learning

### 🛠️ Development Setup

#### Fork và Clone

```bash
# Fork trên GitHub
# Sau đó clone về máy
git clone https://github.com/YOUR_USERNAME/app-minh-hoa-extsort.git
cd app-minh-hoa-extsort
```

#### Tạo Branch Mới

```bash
# Tạo branch cho feature/fix
git checkout -b feature/your-feature-name

# Hoặc cho bugfix
git checkout -b fix/bug-description
```

#### Commit Convention

```bash
# Format: <type>: <description>

# Types:
feat:     # Feature mới
fix:      # Bug fix
docs:     # Thay đổi documentation
style:    # Format code (không ảnh hưởng logic)
refactor: # Refactor code
test:     # Thêm tests
chore:    # Maintenance tasks

# Examples:
git commit -m "feat: add keyboard shortcuts"
git commit -m "fix: resolve port conflict issue"
git commit -m "docs: update README with new features"
```

#### Pull Request

```bash
# Push branch lên GitHub
git push origin feature/your-feature-name

# Tạo Pull Request trên GitHub
# Đảm bảo:
# - Code được test kỹ
# - JSDoc đầy đủ
# - README updated (nếu cần)
# - Screenshots (nếu UI changes)
```

### 📝 Coding Standards

#### JavaScript/JSX

```javascript
// ✅ Good
/**
 * Tính tổng hai số
 * @param {number} a - Số thứ nhất
 * @param {number} b - Số thứ hai
 * @returns {number} Tổng của a và b
 */
function sum(a, b) {
  return a + b;
}

// ❌ Bad
function sum(a, b) {
  return a + b;
}
```

####  React Components

```jsx
// ✅ Good
/**
 * Button component với animation
 * @param {Object} props
 * @param {Function} props.onClick - Click handler
 * @param {string} props.label - Button text
 * @returns {JSX.Element}
 */
function Button({ onClick, label }) {
  return (
    <motion.button onClick={onClick}>
      {label}
    </motion.button>
  );
}

// ❌ Bad
function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

#### Naming Conventions

```javascript
// Variables: camelCase
const myVariable = 10;
const isComplete = true;

// Functions: camelCase
function calculateSum() {}
async function fetchData() {}

// Components: PascalCase
function MyComponent() {}
function TopBar() {}

// Constants: UPPER_SNAKE_CASE
const MAX_PAGE_SIZE = 10;
const DEFAULT_SPEED = 800;

// Private variables: _prefix (convention)
const _privateVar = 'internal';
```

### 🧪 Testing (Future)

#### Unit Tests (Jest)

```javascript
// externalMergeSort.test.js
describe('ExternalMergeSorter', () => {
  it('should initialize with correct state', async () => {
    const sorter = new ExternalMergeSorter('test.bin', '/tmp', 2);
    const state = await sorter.initialize();
    expect(state.phase).toBe('init');
    expect(state.stats.pageSize).toBe(2);
  });
  
  it('should create runs in split phase', async () => {
    // ... test logic
  });
});
```

#### Integration Tests (Playwright)

```javascript
// e2e.test.js
test('complete sort workflow', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Generate file
  await page.click('text=Tạo Dữ Liệu');
  await page.fill('input[type="number"]', '10');
  await page.click('text=✓ Tạo');
  
  // Start sort
  await page.click('text=▶️ Chạy');
  
  // Wait for completion
  await page.waitForSelector('text=🎉 HOÀN TẤT');
  
  // Verify output
  const output = await page.textContent('.output-file');
  expect(output).toContain('[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]');
});
```

### 📐 Architecture Guidelines

#### State Management
- React state cho UI-only state
- Algorithm state từ backend (single source of truth)
- Không duplicate state giữa frontend/backend

#### Component Hierarchy
- Container components (logic) vs Presentational components (UI)
- Một component một trách nhiệm (Single Responsibility)
- Reusable components dalam `src/components/common/`

#### IPC Communication
- Luôn return `{ success, data?, error? }`
- Error handling ở cả main và renderer
- Timeout cho long-running operations

### 🤝 Contributing

**Chúng tôi hoan nghênh mọi contribution!**

1. **Issues**: Report bugs, request features
2. **Discussions**: Ask questions, share ideas
3. **Pull Requests**: Code contributions
4. **Documentation**: Improve guides, add translations
5. **Testing**: Help test on different platforms

### 📄 License

**MIT License**

```
MIT License

Copyright (c) 2026 External Merge Sort Visualizer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🎓 Kết Luận

**External Merge Sort Visualizer** không chỉ là một ứng dụng demo, mà là một công cụ giáo dục hoàn chỉnh giúp hiểu sâu về:

- 🧮 **Thuật toán External Sorting**: Cách xử lý dữ liệu lớn hơn RAM
- 💾 **I/O Operations**: Trade-offs giữa RAM và Disk
- 🔀 **Merge Strategies**: 2-way merge và k-way merge
- 🎨 **Modern UI/UX**: Best practices trong desktop app development
- ⚡ **Electron Architecture**: Main/Renderer process communication

### 🌟 Key Takeaways

1. **External sorting là cần thiết** khi dữ liệu không fit trong RAM
2. **State machine pattern** cho phép visualization tương tác
3. **Binary file format** hiệu quả cho numeric data
4. **3-page buffer model** là cơ sở của external merge sort
5. **Animation và màu sắc** giúp hiểu thuật toán dễ hơn

### 📚 Học Thêm

**Khái niệm liên quan:**
- B-Tree và B+ Tree indexing
- Database query optimization
- MapReduce paradigm
- Stream processing

**Thuật toán tương tự:**
- K-way merge
- Polyphase merge
- Replacement selection

---

**Thống kê dự án:**
- 📝 **Tổng dòng code**: ~2,500 (excluding node_modules)
- 🧩 **Components**: 5 React components
- 📄 **Documentation**: 1 file README toàn diện
- ⏱️ **Setup time**: < 5 phút
- 🎓 **Learning value**: ⭐⭐⭐⭐⭐

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Node.js**: ≥ 18.0.0  
**License**: MIT
