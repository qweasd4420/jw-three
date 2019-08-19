<template>
  <el-container>
    <el-header>
      <div>
        <el-input v-model="stuNameSearch" clearable placeholder="搜索学生姓名" size="small" style="width: 180px;margin-right: 8px" />
        <el-select v-model="value" value-key="sex" :clearable="true" placeholder="请选择性别">
          <el-option
            v-for="item in options"
            :key="item.sex"
            :label="item.label"
            :value="item.sex"
            @change="changeSelect">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="primary" size="small" @click="handleAddStudent">添加学生</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="studentList" size="small" height="calc(100vh - 198px)" border style="width: 100%; line-height: 20px">
        <el-table-column prop="stuId" label="学号" width="190" />
        <el-table-column prop="stuName" label="姓名" min-width="190" />
        <el-table-column prop="sex" :formatter="formatRole" label="性别" min-width="190" />
        <el-table-column prop="address" label="地址" min-width="190" />
        <el-table-column prop="createTime" label="创建时间" min-width="190" />
        <el-table-column prop="updateTime" label="更新时间" min-width="190" />
        <el-table-column prop="" width="190" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editStudent(scope)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteCourse(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="line-height: 2px">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[2, 10, 20, 30, 40]"
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
      <el-form :model="student" label-width="80px" label-position="left">
        <el-form-item label="姓名">
          <el-input v-model="student.stuName" placeholder="" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="student.sex" value-key="sex" :clearable="true" placeholder="请选择性别">
            <el-option
              v-for="item in options"
              :key="item.sex"
              :label="item.label"
              :value="item.sex"
              @change="changeSelect">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="student.address" placeholder="" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 更新操作 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogUpdateVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="student" label-width="80px" label-position="left">
        <el-form-item label="学号">
          <el-input v-model="studentUp.stuId" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="studentUp.stuName" placeholder="" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="studentUp.sex" value-key="sex" :clearable="true" placeholder="请选择性别">
            <el-option
              v-for="item in options"
              :key="item.sex"
              :label="item.label"
              :value="item.sex">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="studentUp.address" placeholder="" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>

import StudentApi from '../../api/StudentApi'

const studentDefault = {
  stuName: '',
  sex: '',
  address: ''
}
export default {
  name: 'Approval',
  data() {
    return {
      studentUp: {
        stuId: null,
        stuName: null,
        sex: null,
        address: null
      },
      selected: null,
      dialogVisible: false,
      dialogUpdateVisible: false,
      student: Object.assign({}, studentDefault),
      studentList: [],
      stuNameSearch: null,
      currentPage4: 1,
      queryParam: {
        data: {
          stuName: null,
          sex: null
        },
        pageInfo: {
          pageNum: 0,
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
      },
      options: [{
        sex: '01',
        label: '男'
      }, {
        sex: '02',
        label: '女'
      }],
      value: ''
    }
  },
  watch: {
    stuNameSearch: function f() {
      if (this.stuNameSearch !== '') {
        this.queryParam.data.stuName = this.stuNameSearch
      } else {
        this.queryParam.data.stuName = null
      }
    },
    value: function v() {
      console.log('进入')
      if (this.value !== '') {
        console.log(this.value)
        this.queryParam.data.sex = this.value
      } else {
        this.queryParam.data.sex = null
      }
    }
  },
  mounted() {
    this.queryPage(this.queryParam)
  },
  methods: {
    queryPage(queryParam) {
      StudentApi.queryPage(queryParam).then(res => {
        console.log(res.data)
        this.studentList = res.data.list
        this.queryParam.pageInfo = res.data
      })
    },
    search() {
      this.queryPage(this.queryParam)
    },
    handleClose(done) {
      done()
    },
    handleAddStudent() {
      this.student = Object.assign({}, studentDefault)
      this.dialogVisible = true
    },
    save() {
      StudentApi.save(this.student).then(res => {
        console.log(res)
        if (res.status === 0) {
          this.$message.success('保存成功')
          this.queryPage(this.queryParam)
        }
        this.dialogVisible = false
      }).catch(err => {
        console.log(err)
        this.dialogVisible = false
      })
    },
    update() {
      StudentApi.update(this.studentUp).then(res => {
        console.log(res)
        if (res.status === 0) {
          this.$message.success('更新成功')
          this.queryPage(this.queryParam)
        }
        this.dialogUpdateVisible = false
      }).catch(err => {
        console.log(err)
        this.dialogUpdateVisible = false
      })
    },
    deleteCourse({ $index, row }) {
      this.$confirm('你确定要删除该课程吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await StudentApi.deleteById(row.stuId)
          this.studentList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.queryPage(this.queryParam)
        })
        .catch(err => { console.error(err) })
    },
    editStudent({ $index, row }) {
      this.studentUp = this.studentList[$index]
      console.log('this.studentUp=' + this.studentUp)
      this.dialogUpdateVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryParam.pageInfo.pageSize = val
      this.queryPage(this.queryParam)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryParam.pageInfo.pageNum = val - 1
      this.queryPage(this.queryParam)
    },
    formatRole(row, column) {
      return row.sex === '01' ? '男' : row.sex === '02' ? '女' : ''
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
