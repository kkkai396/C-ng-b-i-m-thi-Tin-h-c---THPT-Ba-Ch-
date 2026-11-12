# Cổng Tra Cứu & Công Bố Điểm Thi Môn Tin Học — Trường THPT Ba Chẽ

Hệ thống website tra cứu và công bố điểm thi môn Tin học theo lớp với cơ chế bảo mật **Mã PIN từng lớp** (`Chọn Khối -> Chọn Lớp -> Nhập Mã PIN -> Mở khóa bảng điểm`) kèm **Cổng Giáo Viên (Admin Dashboard)**.

---

## 1. Cấu trúc thư mục dự án
- [`index.html`](./index.html): Giao diện chính của hệ thống (Màn hình Xác thực PIN, Màn hình Bảng điểm toàn lớp, Màn hình Quản trị Giáo viên).
- [`styles.css`](./styles.css): Hiệu ứng thị giác EdTech, nền lưới công nghệ, Glassmorphism, phân màu điểm số và định dạng trang in (`@media print`).
- [`app.js`](./app.js): Dữ liệu mẫu các khối 10, 11, 12 của Trường THPT Ba Chẽ, logic xác thực PIN, tìm kiếm tiếng Việt không dấu, chỉnh sửa điểm trực tiếp và đọc/xuất file Excel (`.xlsx` / `.csv`).

---

## 2. Thông tin Mã PIN mẫu & Tài khoản Admin để Test ngay

### A. Danh sách Mã PIN các lớp mẫu (Cổng Học sinh)
| Khối | Lớp | Mã PIN mẫu | Trạng thái mặc định |
| :--- | :--- | :--- | :--- |
| **Khối 10** | **10A1** | `1012026` | Đã công bố (12 học sinh mẫu) |
| **Khối 10** | **10A2** | `1022026` | Đã công bố (8 học sinh mẫu) |
| **Khối 10** | **10A3** | `1032026` | Đã công bố (5 học sinh mẫu) |
| **Khối 11** | **11A1** | `1112026` | Đã công bố (8 học sinh mẫu) |
| **Khối 11** | **11A2** | `1122026` | Đã công bố (5 học sinh mẫu) |
| **Khối 12** | **12A1** | `1212026` | Đã công bố (7 học sinh mẫu) |
| **Khối 12** | **12A2** | `1222026` | *Tạm khóa công bố* (Dùng để test thông báo khóa & nút Bật/Tắt trong Admin) |

> **Mẹo test nhanh:** Trên màn hình chính đã tích hợp sẵn các nút **"Mã PIN mẫu thử nghiệm nhanh"** — bạn chỉ cần click vào tên lớp, hệ thống sẽ tự động chọn Khối, Lớp và điền sẵn Mã PIN.

### B. Mật khẩu Cổng Giáo Viên (Admin Dashboard)
- **Mật khẩu mặc định:** `admin123`

---

## 3. Hướng dẫn tùy chỉnh & Triển khai thực tế

1. **Chạy trực tiếp:** Mở trực tiếp file `index.html` bằng trình duyệt bất kỳ (Chrome, Edge, Safari, Firefox) trên máy tính hoặc điện thoại.
2. **Thay đổi dữ liệu mặc định cố định trong code:**
   - Mở file `app.js`, chỉnh sửa đối tượng `DEFAULT_PORTAL_DATA` ở đầu file (tên giáo viên, mật khẩu `adminPassword`, danh sách các lớp và mã PIN).
3. **Nhập điểm từ file Excel (`.xlsx` / `.csv`):**
   - Đăng nhập vào **Cổng Giáo Viên (Admin)** -> Chọn lớp cần nhập điểm -> Nhấn **"Tải file Excel mẫu"** để lấy mẫu chuẩn gồm các cột: `STT`, `Họ và tên`, `Thường xuyên`, `Thực hành`, `Giữa kỳ`, `Cuối kỳ`, `Ghi chú`.
   - Điền điểm của học sinh vào file Excel và nhấn **"Import Excel (.xlsx/.csv)"**, hệ thống sẽ tự động cập nhật bảng điểm và tính Điểm Trung bình.
4. **Ẩn hộp gợi ý Mã PIN mẫu khi triển khai chính thức cho học sinh:**
   - Trong file `index.html`, bạn có thể xóa hoặc thêm class `hidden` vào khối chứa `id="demo-pin-list"` để học sinh chỉ có thể nhập mã PIN do giáo viên cung cấp.

