var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/examReg_DB');

var banned_studentSchema = mongoose.Schema({
    id_student : String,
    name_subject : String
})

var banned_students = mongoose.model('banned_students',banned_studentSchema);
    
module.exports = banned_students;