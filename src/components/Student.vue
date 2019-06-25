<template>
  <div class="student">
    <el-button type="text" @click="openModel('create')">添加学生</el-button>
    <el-table
      :data="tableData"
      border
      center>
      <el-table-column
        prop="sid"
        label="sid">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="courses"
        label="所选课程">
        <template slot-scope="scope">
          <el-select v-model="scope.row.courses" multiple placeholder="请选择">
            <el-option
              v-for="item in totalCourse"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </template>>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="openModel('edit', scope.row)" size="small">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="学生" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="sid" :label-width="formLabelWidth">
          <el-input v-model="form.sid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所选课程" :label-width="formLabelWidth">
          <el-select v-model="form.courses" multiple placeholder="请选择">
            <el-option
              v-for="item in totalCourse"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Student',
  data() {
    return {
      totalCourse: [{
        value: "地理",
        id: 1
      },{
        value: "数学",
        id: 2
      },{
        value: "物理",
        id: 3
      },{
        value: "化学",
        id: 4
      }],
      tableData: [],
      currItem: {},
      dialogFormVisible: false,
      currentModelType: '',
      form: {
        sid: 0,
        name: '',
        age: '',
        sex: '',
        courses: []
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    openModel: function(type, item) {
      this.dialogFormVisible = true
      this.currentModelType = type
      if(type === 'create') {
        this.form = {
          name: '',
          age: '',
          sex: '',
          courses: []
        }
      } else {
        this.currItem = item
        this.queryStudent(item)
      }
    },
    handleSubmit: function () {
      this.dialogFormVisible = false
      if(this.currentModelType === 'create') {
        this.addStudent()
      } 
      if(this.currentModelType === 'edit') {
        this.editStudent()
      }
    },
    addStudent: function() {
      console.log(this.form)
      let _this = this
      this.$axios.get('http://localhost:2000/add?name=' + this.form.name + '&sid=' + this.form.sid + '&age=' + this.form.age + '&sex=' + this.form.sex + '&courses=' + this.form.courses)
      .then(function(res) {
        _this.$message('添加成功')
        _this.getAllStudent()
      })
      .catch(function(err) {
        console.log(err)
      })
    },
    queryStudent(item) {
      let _this = this
      this.$axios.get('http://localhost:2000/query?sid=' + item.sid)
      .then(function(res) {
        console.log(res, 'query')
        _this.form = res.data
      })
      .catch(function(err) {
        console.log(err)
      })
    },
    editStudent: function() {
      let _this = this
      this.$axios.get('http://localhost:2000/edit?name=' + this.form.name + '&sid=' + this.form.sid + '&age=' + this.form.age + '&sex=' + this.form.sex + '&courses=' + this.form.courses, params)
      .then(function(res) {
        _this.$message('修改成功')
        _this.getAllStudent()
      })
      .catch(function(err) {
        console.log(err)
      })
    },
    handleDelete: function(item) {
      let _this = this
      this.$axios.post('http://localhost:2000/remove?sid=' + item.sid)
      .then(function(res) {
        _this.$message('删除成功')
        _this.getAllStudent()
      })
      .catch(function(err) {
        console.log(err)
      })
    },
    getAllStudent() {
      let _this = this
      this.$axios.get('http://localhost:2000/getall')
      .then(res => {
        console.log(res)
        _this.tableData = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  mounted() {
    this.getAllStudent()
  }
}
</script>

<style>

</style>
