var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
  "sid": Number,
  "name": String,
  "age": Number,
  "sex": String,
  "courses": [Number]
})

studentSchema.index({"sid": 1})

var Student = mongoose.model('Student', studentSchema)

module.exports = Student