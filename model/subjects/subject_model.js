var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/examReg_DB');

var subjectSchema = mongoose.Schema({
    Mã_môn_học : String,
    Tên_môn_học : String,
    Giảng_viên : String,
    Ghi_chú : String
})

var subjects = mongoose.model('subjects',subjectSchema);

module.exports = subjects;