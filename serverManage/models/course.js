var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
  "cid": Number,
  "name": String,
  "students": [Number]
})

courseSchema.index({"cid": 1})

courseSchema.statics.addStudent = function(courses, sid, callback) {
  console.log('插入课程开始', courses, sid)
  for(var i=0; i< courses.length; i++) {
    Course.update({"cid": courses[i]}, {$push: {"student": sid}}, function() {
      console.log('课程添加报名成功')
    })
  }
}

var Course = mongoose.model('Course', courseSchema)

var course1 = new Course({
  "cid": 1,
  "name": "地理",
  "students": []
})
course1.save()

Course.create({"cid": 2,
  "name": "数学",
  "students": []
})

Course.create({"cid": 3,
  "name": "物理",
  "students": []
})

Course.create({"cid": 4,
  "name": "化学",
  "students": []
})


module.exports = Course