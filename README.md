
# ĐỒ ÁN CUỐI KỲ HỆ CƠ SỞ DỮ LIỆU NÂNG CAO

# Hệ thống đặt lịch khám bệnh trực tuyến

# 1. Cấu trúc hệ thống

*	Frontend: ReactJS 
*	Backend: NodeJS + Express
*	Database: 
    *	Oracle
    *   MongoDB 
    *   Redis 

---

# 2. Hướng dẫn cài đặt và chạy dự án

## 2.1. Yêu cầu hệ thống

* Hệ điều hành: Windows hoặc macOS.
* Phần mềm cần cài đặt: Docker.
* Trình duyệt: Chrome, Firefox hoặc Safari.

---

## 2.2 Cài đặt môi trường

* Tải Docker Desktop phù hợp với hệ điều hành.
* Tiến hành cài đặt và khởi động Docker.
* Kiểm tra cài đặt thành công bằng lệnh.

```bash
docker --version
docker compose version
```

---

## 3. Hướng dẫn chạy project

### Bước 1: Clone source code

```bash
git clone https://gitlab.duthu.net/lazylady/hcsdl_nc.git
```

### Bước 2: Mở project

* Mở Visual Studio Code
* Chọn **Open Project**
* Chọn thư mục project vừa clone


### Bước 3: Chạy dự án bằng Docker

* Mở Terminal và chạy lệnh:

```bash
docker compose up --build
```
cd backend

```bash
npm run seed
```

* Trong quá trình chạy nếu gặp lỗi, hãy chạy lệnh:

```bash
docker compose down -v
docker compose up --build
cd backend
npm run seed
```

### Bước 4: Truy cập website

```bash
http://localhost:5173
```

### Lưu ý: Cấu hình môi trường

Khi clone về kiểm tra tại thư mục server đã có file .env chưa. Nếu chưa có tạo file .env:

```bash

# APP
PORT=5000
JWT_SECRET=abc123

# MONGODB (LOCAL)
MONGO_URI=mongodb://localhost:27017/hospital_db

# ORACLE (LOCAL)
DB_USER=app
DB_PASSWORD=123456
DB_CONNECT_STRING=localhost:1522/XEPDB1

NODE_ENV=development
```
---

## 4. Tài khoản đăng nhập demo

### User:

* Phone: 0987654321
* Password: User123@

---

## 5: Tài khoản test thanh toán

### VNPAY
* Ngân hàng:	NCB
* Số thẻ:	9704198526191432198
* Tên chủ thẻ:	NGUYEN VAN A
* Ngày phát hành:	07/15
* Mật khẩu OTP:	123456

### MOMO
* Số thẻ:	9704 0000 0000 0018
* Tên chủ thẻ:	NGUYEN VAN A
* Ngày phát hành: 03/07





