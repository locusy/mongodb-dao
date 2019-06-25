var Course = require('./models/course.js');
var Student = require('./models/student.js');

exports.add = function(req, res, next) {
  Student.create(req.query, function() {
    console.log('插入学生成功')
    res.send('success')
    Course.addStudent(req.query.courses, req.query.sid, function() {
      console.log('插入课程成功');
    })
  })
}

exports.getAll = function(req, res, next) {
  Student.find({}, function(err, result) {
    res.send(result)
  })
}

exports.query = function(req, res, next) {
  Student.findOne({"sid": req.query.sid}, function(err, result) {
    console.log(result, 'query')
    res.send(result)
  })
}

exports.edit = function(req, res, next) {
  console.log('更新 id ', req.query.sid)
  Student.update({"sid": req.query.sid},{ $set: req.query}, function(err) {
    res.send('修改成功')
  })
}

exports.remove = function(req, res, next) {
  console.log('删除 id '+ req.query.sid)
  Student.remove({"sid": req.query.sid}, function(err) {
    res.send('删除成功')
  })
}