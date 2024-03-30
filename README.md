# Dokumentasi Project School

## Requirement
- Java 17
- Maven v3.9.6
- Netbeans / Other tools
- Node.js > 20 (for frontend)

## Versi Windows
1. Buat folder `C:\Github`
2. Buka command prompt
3. Jalankan `cd C:\Github` untuk masuk ke folder yang sudah dibuat
4. Jalankan `git clone https://github.com/panjihanum/school_be_main.git` // Main Service
5. Jalankan `git clone https://github.com/panjihanum/school_be_course.git` // Course Service
6. Jalankan `git clone https://github.com/panjihanum/school_be_forum.git` // Forum Service
7. Jalankan `git clone https://github.com/panjihanum/school_fe.git` // Frontend
8. Buka Netbeans dan buka `school_be_main`, `school_be_course`, dan `school_be_forum` 
9. Klik kanan tiap project, dan pilih bagian run
10. Setting main class sesuai project masing-masing
11. Pastikan untuk sesuaikan konfigurasi database di file `application.properties` untuk setiap project
12. Data tabel dll, akan otomatis dibuat setelah clean and build pada project Main
13. Clean and build setiap project, pastikan project Main Service di-clean and build terlebih dahulu, dan kemudian run setiap projectnya
14. Setelah backend selesai, masuk ke frontend
15. Masuk ke folder `school_fe`
16. Jalankan `npm install`
17. Jalankan `npm run dev` untuk berjalan di mode development
18. Buka browser dan akses http://localhost:3000

## List User
### Admin:
- Email/Password: admin@school.com/123456
### Teacher:
- Email/Password: sari.lukito@school.com/123456
- Email/Password: teacher.andre@school.com/123456
### Student:
- Email/Password: student.sabdo@school.com/123456
- Email/Password: student.panji@school.com/123456
