Bước 1: Cài đặt các công cụ cần thiết
•	Cài đặt Node.js phiên bản mới nhất từ: https://nodejs.org/
•	Cài đặt Visual Studio Code để lập trình và chạy mã nguồn.
•	Cài đặt MySQL (hoặc PostgreSQL) để khởi tạo cơ sở dữ liệu.

Bước 2: Cài mã nguồn bên trên 

Bước 3: Cài đặt và chạy frontend (React)
cd frontend
npm install
npm start
•	Ứng dụng React sẽ chạy ở địa chỉ mặc định: http://localhost:3000
•	Có thể chỉnh package.json để thay đổi cổng nếu cần.

Bước 4: Cài đặt và chạy backend (NestJS)
cd backend
npm install
npm run start:dev
•	API của backend sẽ chạy tại http://localhost:3001 (hoặc cổng do bạn định nghĩa).
•	Kiểm tra file .env để đảm bảo cấu hình cơ sở dữ liệu và JWT key đúng.



