var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/examReg_DB');

var studentSchema = mongoose.Schema({
    Mã_sinh_viên : String,
    Họ_và_tên : String,
    Năm_sinh : String,
    Mật_khẩu : String,
    Lớp : String
})

var students = mongoose.model('students',studentSchema);
    
module.exports = students;