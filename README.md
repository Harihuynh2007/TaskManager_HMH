# Re-saving the README content because previous code session was reset

readme_content = """
# TaskManager_HMH

## 1. Giới thiệu
TaskManager_HMH là một dự án web backend được xây dựng bằng Python Django kết hợp với Django REST Framework (DRF). Mục tiêu của dự án là xây dựng một hệ thống API quản lý Projects và Tasks, hỗ trợ đăng nhập, đăng ký, phân quyền bảo mật dữ liệu.

## 2. Chức năng chính
- 🔒 Đăng ký (Register) user mới.
- 🔑 Đăng nhập (Login) nhận JWT Token.
- 💳 Tạo Project mới.
- 🌐 Liệt kê danh sách Projects theo user login.
- 📝 CRUD Task trong Project:
  - Tạo Task
  - Cập nhật Task
  - Xóa Task
  - Xem danh sách Tasks
- 📋 Filter Task theo:
  - Trạng thái: OPEN / DOING / DONE
  - Thuộc Project ID cụ thể
- 📈 Pagination cho danh sách Projects/Tasks (10 bản ghi/trang).
- 🔐 Phân quyền nghiêm ngặt: User chỉ được truy cập dữ liệu của chính mình (IsOwner).

## 3. Logic triển khai chi tiết

### Backend Django
- Khởi tạo project Django backend.
- Tạo app **accounts**:
  - CustomUser model (dùng Email thay Username).
  - API đăng ký, đăng nhập JWT.
- Tạo app **tasks**:
  - Project Model: title, description, owner.
  - Task Model: title, status (OPEN, DOING, DONE), deadline, project (FK), assigned_to (FK).
- Viết Serializers cho Project và Task.
- Xây dựng API CRUD Projects và Tasks sử dụng ViewSet.
- Thêm Permissions:
  - IsAuthenticated
  - IsOwner (tự viết)
- Format Response chuẩn JSON (dùng Response custom).
- Cài Pagination cho DRF.
- Viết Filter Task theo status/project.

### Testing API
- Sử dụng Postman test:
  - Register
  - Login nhận Access Token
  - Tạo Project, Task
  - Lọc danh sách, filter Tasks

### Settings.py
- Đã cài JWT Authentication.
- Pagination DRF default PAGE_SIZE = 10.
- Cần tách SECRET_KEY và DEBUG trong .env khi deploy thực tế.

## 4. Trình tự triển khai
1. Khởi tạo venv và cài đặt Django + DRF.
2. Xây dựng app accounts và authentication flow.
3. Xây dựng app tasks với models/serializers/views.
4. Tổ chức API và route với Router DRF.
5. Thêm phân quyền bảo mật dữ liệu.
6. Hoàn thiện filter, pagination.
7. Viết Postman Collection test API.
8. Review codebase, clean up, viết README.md.

## 5. Hướng dẫn cài đặt

### Cài đặt backend
```bash
# Clone repo
$ git clone https://github.com/Harihuynh2007/TaskManager_HMH.git
$ cd TaskManager_HMH

# Khởi tạo và kích hoạt venv
$ python -m venv venv
$ source venv/bin/activate   # MacOS/Linux
$ venv\\Scripts\\activate     # Windows

# Cài package
$ pip install -r requirements.txt

# Chạy migrate
$ python manage.py migrate

# Run server
$ python manage.py runserver
