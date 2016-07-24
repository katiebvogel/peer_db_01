var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
  assignment_number: Number,
  student_name: String,
  score: Number,
  date_completed: Date,
  extras: Object
  
})

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
