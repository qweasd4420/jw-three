<template>
  <el-container>
    <el-header>
      <div>
        <el-input v-model="courseSearch" placeholder="搜索课程" size="small" style="width: 180px;margin-right: 8px" />
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="primary" size="small" @click="handleAddCourse">添加课程</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="courseList" size="small" height="calc(100vh - 198px)" border style="width: 100%; line-height: 20px">
        <el-table-column prop="courseName" label="课程名" width="190" />
        <el-table-column prop="memo" label="备注" min-width="190" />
        <el-table-column prop="" width="190" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editCourse(scope)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteCourse(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="line-height: 2px">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[2, 100, 200, 300, 400]"
          :page-size="queryParam.pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryParam.pageInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="course" label-width="80px" label-position="left">
        <el-form-item label="课程名">
          <el-input v-model="course.courseName" placeholder="" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="course.memo" placeholder="" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>

import CourseApi from '../../api/CourseApi'

const courseDefault = {
  courseName: '',
  memo: ''
}
export default {
  name: 'Course',
  data() {
    return {
      dialogVisible: false,
      course: Object.assign({}, courseDefault),
      courseList: [],
      courseSearch: null,
      currentPage4: 1,
      queryParam: {
        data: {
          courseName: null
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 2,
          size: 0,
          startRow: 1,
          endRow: 1,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: true,
          isLastPage: true,
          hasPreviousPage: false,
          navigatePages: 0,
          navigatepageNums: [],
          navigateFirstPage: 1,
          navigateLastPage: 1,
          total: 0
        }
      }
    }
  },
  watch: {
    courseSearch: function f() {
      if (this.courseSearch !== '') {
        this.queryParam.data.courseName = this.courseSearch
      } else {
        this.queryParam.data.courseName = null
      }
    }
  },
  mounted() {
    this.queryPage(this.queryParam)
  },
  methods: {
    queryPage(queryParam) {
      CourseApi.queryPage(queryParam).then(res => {
        this.courseList = res.data.list
        this.queryParam.pageInfo = res.data
      })
    },
    search() {
      this.queryPage(this.queryParam)
    },
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
      done()
    },
    handleAddCourse() {
      this.course = Object.assign({}, courseDefault)
      this.dialogVisible = true
    },
    save() {
      CourseApi.save(this.course).then(res => {
        if (this.course.id == null) {
          this.course.id = res.data
          this.courseList.push(this.course)
        }
        this.dialogVisible = false
      }).catch(err => {
        console.log(err)
        this.dialogVisible = false
      })
    },
    deleteCourse({ $index, row }) {
      this.$confirm('你确定要删除该课程吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await CourseApi.deleteById(row.id)
          this.courseList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    editCourse({ $index, row }) {
      this.course = this.courseList[$index]
      console.log('this.course=' + this.course)
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryParam.pageInfo.pageSize = val
      this.queryPage(this.queryParam)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryParam.pageInfo.pageNum = val
      this.queryPage(this.queryParam)
    }
  }
}
</script>

<style scoped>
  .el-header {
    color: #333;
    text-align: left;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
    padding-top: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>
