Tất cả các file đều xem bằng tool: https://draw.io

1. LMS_Guess_Flow_1.0.xml : Quy trình đăng ký học khi người dùng chưa đăng ký tài khoản
2. LMS_Student_Flow_Buy_Courses_1.0.xml: Quy trình chi tiết mua khóa học trên hệ thống
3. LMS_Student_Flow_Learn_1.0.xml: Chức năng hỗ trợ người học có thể học các khóa học của mình đã mua
4. LMS_Student_Flow_Other_1.0.xml: Các chức năng khác hỗ trợ người học
5. LMS_Teacher_Flow_1.0.xml: Các chức năng hỗ trợ người dạy
6. LMS_User_Flow_1.0.xml: Chức năng quản lý tài khoản như cập nhật thông tin hoặc đổi mật khẩu

Khái niệm
- Course: giáo trình, bài giảng, bài học. 1 Course có thể có nhiều Section. 1 Section có thể có nhiều Unit.Mỗi Unit có thể là 1 clip/video hoặc tài liệu (ppt, pdf, word...), Test 
- Test: 1 bài kiểm tra. Có thể thuộc vào 1 Course hoặc độc lập 
- Learner: người học
- Tutor: người dạy, người hướng dẫn trực tiếp. 
- Author: người soạn Course / Test 
- Course Reviewer: người duyệt Course/Test. Course/Test phải được Approved thì mới được Publish.
- User: người sử dụng hệ thống: Learner, Author, Tutor, Guess, Class Manager
- Guess: người tham quan hệ thống, chưa trở thành Learner, Author, Tutor
- Class: lớp học / khoá học.  
- Class Manager: người thiết kế lớp học 
- Session: buổi học, được tiến hành khi Learner(s) tham gia học
Có 2 hình thức: 
. Self-paced: Learner chọn Course và tự học 
. Tutor-paced: Learner chọn Class và học theo hướng dẫn của Tutor     
