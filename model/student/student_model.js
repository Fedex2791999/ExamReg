var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/examReg_DB');

var studentSchema = mongoose.Schema({
    id_student : String,
    name_student : String,
    birth_student : String,
    password_student : String,
    class : String
})

var students = mongoose.model('students',studentSchema);
    
module.exports = students;