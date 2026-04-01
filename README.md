<div align="center">
  <h1>Ứng Dụng Minh Họa Thuật Toán External Merge Sort</h1>
</div>

<div align="center">
  <strong>Ứng dụng desktop được xây dựng bằng Electron.js, React và Tailwind CSS</strong>
  <br>
  <em>Cung cấp trải nghiệm trực quan, từng bước một của thuật toán External Merge Sort</em>
</div>

## Cài Đặt và Chạy

### Cài Đặt Nhanh (3 Bước)

```powershell
# 1. Di chuyển vào thư mục dự án
cd app-minh-hoa-extsort

# 2. Cài đặt dependencies
npm install

# 3. Chạy ứng dụng
npm run dev
```

### Hướng Dẫn Chi Tiết

#### Bước 1: Mở Terminal/PowerShell

Windows:
- Nhấn Win + X -> chọn "Windows PowerShell" hoặc "Terminal"
- Hoặc tìm kiếm "PowerShell" trong Start Menu

macOS/Linux:
- Nhấn Cmd + Space (macOS) hoặc Ctrl + Alt + T (Linux)
- Gõ "Terminal" và nhấn Enter

#### Bước 2: Di Chuyển Vào Thư Mục Dự Án

```bash
cd path/to/app-minh-hoa-extsort
```

Thay path/to/ bằng đường dẫn thực tế đến thư mục dự án.

#### Bước 3: Cài Đặt Dependencies

```bash
npm install
```

Quá trình này sẽ:
- Tải về tất cả packages cần thiết (~200MB)
- Tạo thư mục node_modules
- Mất khoảng 2-5 phút (tùy tốc độ mạng)

Packages được cài đặt:
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

Điều gì sẽ xảy ra:
1. Vite dev server khởi động tại http://localhost:5173
2. Cửa sổ Electron tự động mở
3. Hot-reload được kích hoạt (tự động reload khi code thay đổi)
4. Developer Tools tự động mở (có thể tắt nếu muốn)

#### Bước 5: Sẵn sàng sử dụng

Ứng dụng đã sẵn sàng. Hãy xem phần Hướng dẫn thao tác sử dụng trên Ứng dụng ở bên dưới để bắt đầu.

### Build Cho Production

Để tạo file thực thi độc lập:

```bash
# Build React app
npm run build

# Package Electron app
npm run build:electron
```

File executable sẽ nằm trong thư mục dist-electron/.

### Script Tự Động (Windows)

```powershell
# Chạy script setup tự động
.\setup.ps1
```

Script này sẽ:
1. Kiểm tra Node.js
2. Cài đặt dependencies
3. Chạy ứng dụng

---

## Hướng dẫn thao tác sử dụng trên Ứng dụng

Giao diện của ứng dụng khi chưa upload file:

![Screenshot 2026-03-04 191122](./imagess/Screenshot%202026-03-04%20191122.png)

- Nút "Tạo Dữ Liệu" giúp người dùng tạo một tập tin dữ liệu dạng nhị phân gồm các số ngẫu nhiên và số lượng số ngẫu nhiên.
- Nút "Chọn File .bin" giúp người dùng upload tập tin lưu dữ liệu là các số thực (8 bytes) ở dạng tập tin nhị phân.

![Screenshot 2026-03-04 191210](./imagess/Screenshot%202026-03-04%20191210.png)

- Nút "Chạy" giúp chạy thuật toán một cách liên tục. Nút "Bước Tiếp" giúp chạy thuật toán từng bước một, giúp người dùng dễ quan sát từng bước của thuật toán. Nút "Làm Lại" dùng để reset trạng thái.
- Thanh kéo tốc độ dùng để điều chỉnh tốc độ minh họa của thuật toán.
- Ngoài hình ảnh trực quan, từng bước của quá trình sắp xếp còn được trình bày dưới dạng văn bản ở phần ngay dưới phần các nút chức năng.
- Ứng dụng thực hiện minh họa với 3 Buffer Pages và kích thước mỗi Buffer Pages là 2 phần tử.

![Screenshot 2026-03-04 191243](./imagess/Screenshot%202026-03-04%20191243.png)

## Sử dụng Ứng dụng để minh họa trực quan từng bước quá trình sắp xếp

### Giai đoạn Split & Sort

- Thực hiện minh họa với file gồm 20 số.
- Do có 3 Buffer Pages và kích thước mỗi Buffer Page là 2 phần tử nên có thể đọc 6 số từ file vào RAM ở mỗi lần.

![Screenshot 2026-03-04 191431](./imagess/Screenshot%202026-03-04%20191431.png)

- Thực hiện sắp xếp 6 số trong RAM.

![Screenshot 2026-03-04 191516](./imagess/Screenshot%202026-03-04%20191516.png)

- Ghi 6 số đã sắp xếp vào file Run 0 trong Disk.

![Screenshot 2026-03-04 191545](./imagess/Screenshot%202026-03-04%20191545.png)

- Thực hiện đọc 6 số tiếp theo từ file vào RAM.

![Screenshot 2026-03-04 191639](./imagess/Screenshot%202026-03-04%20191639.png)

- Thực hiện sắp xếp 6 số trong RAM.

![Screenshot 2026-03-04 191701](./imagess/Screenshot%202026-03-04%20191701.png)

- Ghi 6 số đã sắp xếp vào file Run 1 trong Disk.

![Screenshot 2026-03-04 191725](./imagess/Screenshot%202026-03-04%20191725.png)

- Thực hiện đọc 6 số tiếp theo từ file vào RAM.

![Screenshot 2026-03-04 191753](./imagess/Screenshot%202026-03-04%20191753.png)

- Thực hiện sắp xếp 6 số trong RAM.

![Screenshot 2026-03-04 191817](./imagess/Screenshot%202026-03-04%20191817.png)

- Ghi 6 số đã sắp xếp vào file Run 2 trong Disk.

![Screenshot 2026-03-04 191843](./imagess/Screenshot%202026-03-04%20191843.png)

- Thực hiện đọc 2 số cuối cùng trong file vào RAM.

![Screenshot 2026-03-04 191913](./imagess/Screenshot%202026-03-04%20191913.png)

- Thực hiện sắp xếp 2 số trong RAM.

![Screenshot 2026-03-04 191944](./imagess/Screenshot%202026-03-04%20191944.png)

- Ghi 2 số đã sắp xếp vào file Run 3 trong Disk.
- Hoàn thành giai đoạn Split & Sort.

![Screenshot 2026-03-04 192013](./imagess/Screenshot%202026-03-04%20192013.png)

### Giai đoạn External Sort

- Đọc 2 số đầu tiên của file Run 0 vào Buffer Page 1.
- Đọc 2 số đầu tiên của file Run 1 vào Buffer Page 2.

![Screenshot 2026-03-04 200419](./imagess/Screenshot%202026-03-04%20200419.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (14.12 và -73.07).
- Chọn phần tử bé hơn là -73.07.

![Screenshot 2026-03-04 200445](./imagess/Screenshot%202026-03-04%20200445.png)

- Chuyển -73.07 vào Buffer Page 3.

![Screenshot 2026-03-04 200534](./imagess/Screenshot%202026-03-04%20200534.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (14.12 và -51.74).
- Chọn phần tử bé hơn là -51.74.

![Screenshot 2026-03-04 200605](./imagess/Screenshot%202026-03-04%20200605.png)

- Chuyển -51.74 vào Buffer Page 3.

![Screenshot 2026-03-04 200627](./imagess/Screenshot%202026-03-04%20200627.png)

- Do Buffer Page 3 đã đầy nên ghi 2 số từ Buffer Page 3 vào file Run 4 trong Disk.

![Screenshot 2026-03-04 200705](./imagess/Screenshot%202026-03-04%20200705.png)

- Do Buffer Page 2 trống nên đọc 2 phần tử tiếp theo của file Run 1 vào Buffer Page 2.

![Screenshot 2026-03-04 200742](./imagess/Screenshot%202026-03-04%20200742.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (14.12 và 45.6).
- Chọn phần tử bé hơn là 14.12.

![Screenshot 2026-03-04 200811](./imagess/Screenshot%202026-03-04%20200811.png)

- Chuyển 14.12 vào Buffer Page 3.

![Screenshot 2026-03-04 200832](./imagess/Screenshot%202026-03-04%20200832.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (40.94 và 45.6).
- Chọn phần tử bé hơn là 40.94.

![Screenshot 2026-03-04 200858](./imagess/Screenshot%202026-03-04%20200858.png)

- Chuyển 40.94 vào Buffer Page 3.

![Screenshot 2026-03-04 200920](./imagess/Screenshot%202026-03-04%20200920.png)

- Do Buffer Page 3 đã đầy nên ghi 2 số từ Buffer Page 3 vào file Run 4 trong Disk.

![Screenshot 2026-03-04 200956](./imagess/Screenshot%202026-03-04%20200956.png)

- Do Buffer Page 1 trống nên đọc 2 phần tử tiếp theo của file Run 0 vào Buffer Page 1.

![Screenshot 2026-03-04 201156](./imagess/Screenshot%202026-03-04%20201156.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (43.06 và 45.6).
- Chọn phần tử bé hơn là 43.06.

![Screenshot 2026-03-04 201219](./imagess/Screenshot%202026-03-04%20201219.png)

- Chuyển 43.06 vào Buffer Page 3.

![Screenshot 2026-03-04 201239](./imagess/Screenshot%202026-03-04%20201239.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (62.43 và 45.6).
- Chọn phần tử bé hơn là 45.6.

![Screenshot 2026-03-04 201302](./imagess/Screenshot%202026-03-04%20201302.png)

- Chuyển 45.6 vào Buffer Page 3.

![Screenshot 2026-03-04 201325](./imagess/Screenshot%202026-03-04%20201325.png)

- Do Buffer Page 3 đã đầy nên ghi 2 số từ Buffer Page 3 vào file Run 4 trong Disk.

![Screenshot 2026-03-04 201350](./imagess/Screenshot%202026-03-04%20201350.png)

- Tiếp tục lặp lại quá trình trên đến khi hoàn tất việc External Sort file Run 0 và file Run 1 vào file Run 4.

![Screenshot 2026-03-04 201432](./imagess/Screenshot%202026-03-04%20201432.png)

- Đọc 2 số đầu tiên của file Run 2 vào Buffer Page 1.
- Đọc 2 số đầu tiên của file Run 3 vào Buffer Page 2.

![Screenshot 2026-03-04 201516](./imagess/Screenshot%202026-03-04%20201516.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (-83.81 và -90.47).
- Chọn phần tử bé hơn là -90.47.

![Screenshot 2026-03-04 201537](./imagess/Screenshot%202026-03-04%20201537.png)

- Chuyển -90.47 vào Buffer Page 3.

![Screenshot 2026-03-04 201559](./imagess/Screenshot%202026-03-04%20201559.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (-83.81 và -81.21).
- Chọn phần tử bé hơn là -83.81.

![Screenshot 2026-03-04 201621](./imagess/Screenshot%202026-03-04%20201621.png)

- Chuyển -83.81 vào Buffer Page 3.

![Screenshot 2026-03-04 201647](./imagess/Screenshot%202026-03-04%20201647.png)

- Do Buffer Page 3 đã đầy nên ghi 2 số từ Buffer Page 3 vào file Run 5 trong Disk.

![Screenshot 2026-03-04 201715](./imagess/Screenshot%202026-03-04%20201715.png)

- Tiếp tục lặp lại quá trình trên đến khi hoàn tất việc External Sort file Run 2 và file Run 3 vào file Run 5.

![Screenshot 2026-03-04 201758](./imagess/Screenshot%202026-03-04%20201758.png)

- Đọc 2 số đầu tiên của file Run 4 vào Buffer Page 1.
- Đọc 2 số đầu tiên của file Run 5 vào Buffer Page 2.

![Screenshot 2026-03-04 201833](./imagess/Screenshot%202026-03-04%20201833.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (-73.07 và -90.47).
- Chọn phần tử bé hơn là -90.47.

![Screenshot 2026-03-04 201900](./imagess/Screenshot%202026-03-04%20201900.png)

- Chuyển -90.47 vào Buffer Page 3.

![Screenshot 2026-03-04 201920](./imagess/Screenshot%202026-03-04%20201920.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (-73.07 và -83.81).
- Chọn phần tử bé hơn là -83.81.

![Screenshot 2026-03-04 201948](./imagess/Screenshot%202026-03-04%20201948.png)

- Chuyển -83.81 vào Buffer Page 3.

![Screenshot 2026-03-04 202016](./imagess/Screenshot%202026-03-04%20202016.png)

- Do Buffer Page 3 đã đầy nên ghi 2 số từ Buffer Page 3 vào file Run 6 trong Disk.

![Screenshot 2026-03-04 202041](./imagess/Screenshot%202026-03-04%20202041.png)

- Do Buffer Page 2 trống nên đọc 2 phần tử tiếp theo của file Run 5 vào Buffer Page 2.

![Screenshot 2026-03-04 202117](./imagess/Screenshot%202026-03-04%20202117.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (-73.07 và -81.21).
- Chọn phần tử bé hơn là -81.21.

![Screenshot 2026-03-04 202144](./imagess/Screenshot%202026-03-04%20202144.png)

- Chuyển -81.21 vào Buffer Page 3.

![Screenshot 2026-03-04 202209](./imagess/Screenshot%202026-03-04%20202209.png)

- So sánh 2 phần tử đầu tiên của Buffer Page 1 và Buffer Page 2 (-73.07 và -63.48).
- Chọn phần tử bé hơn là -73.07.

![Screenshot 2026-03-04 202238](./imagess/Screenshot%202026-03-04%20202238.png)

- Chuyển -73.07 vào Buffer Page 3.

![Screenshot 2026-03-04 202259](./imagess/Screenshot%202026-03-04%20202259.png)

- Do Buffer Page 3 đã đầy nên ghi 2 số từ Buffer Page 3 vào file Run 6 trong Disk.

![Screenshot 2026-03-04 202324](./imagess/Screenshot%202026-03-04%20202324.png)

- Tiếp tục lặp lại quá trình trên đến khi hoàn tất việc External Sort file Run 4 và file Run 5 vào file Run 6.

![Screenshot 2026-03-04 202435](./imagess/Screenshot%202026-03-04%20202435.png)

- Toàn bộ phần tử trong file gốc đã nằm trong file Run 6, quá trình sắp xếp hoàn tất, file Run 6 chính là file output của việc áp dụng thuật toán External Sort lên file input ban đầu.

![Screenshot 2026-03-04 202503](./imagess/Screenshot%202026-03-04%20202503.png)
