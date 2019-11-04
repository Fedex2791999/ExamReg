var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/examReg_DB');

var success_studentSchema = mongoose.Schema({
    id_student : String,
    name_subject : String
})

var success_students = mongoose.model('success_students',success_studentSchema);
    
module.exports = success_students;