(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3260feba"],{6615:function(e,t,a){"use strict";var s=a("72d4");a.n(s).a},"72d4":function(e,t,a){},f542:function(e,t,a){"use strict";a.r(t),a("96cf");var s=a("3b8d"),l=a("4ea9"),n={stuName:"",sex:"",address:""},i={name:"Approval",data:function(){return{studentUp:{stuId:null,stuName:null,sex:null,address:null},selected:null,dialogVisible:!1,dialogUpdateVisible:!1,student:Object.assign({},n),studentList:[],stuNameSearch:null,currentPage4:1,queryParam:{data:{stuName:null,sex:null},pageInfo:{pageNum:0,pageSize:2,size:0,startRow:1,endRow:1,pages:0,prePage:0,nextPage:0,isFirstPage:!0,isLastPage:!0,hasPreviousPage:!1,navigatePages:0,navigatepageNums:[],navigateFirstPage:1,navigateLastPage:1,total:0}},options:[{sex:"01",label:"男"},{sex:"02",label:"女"}],value:""}},watch:{stuNameSearch:function(){""!==this.stuNameSearch?this.queryParam.data.stuName=this.stuNameSearch:this.queryParam.data.stuName=null},value:function(){""!==this.value?this.queryParam.data.sex=this.value:this.queryParam.data.sex=null}},mounted:function(){this.queryPage(this.queryParam)},methods:{queryPage:function(e){var t=this;l.a.queryPage(e).then(function(e){t.studentList=e.data.list,t.queryParam.pageInfo=e.data})},search:function(){this.queryPage(this.queryParam)},handleClose:function(e){e()},handleAddStudent:function(){this.student=Object.assign({},n),this.dialogVisible=!0},save:function(){var e=this;l.a.save(this.student).then(function(t){0===t.status&&(e.$message.success("保存成功"),e.queryPage(e.queryParam)),e.dialogVisible=!1}).catch(function(t){e.dialogVisible=!1})},update:function(){var e=this;l.a.update(this.studentUp).then(function(t){0===t.status&&(e.$message.success("更新成功"),e.queryPage(e.queryParam)),e.dialogUpdateVisible=!1}).catch(function(t){e.dialogUpdateVisible=!1})},deleteCourse:function(e){var t=this,a=e.$index,n=e.row;this.$confirm("你确定要删除该课程吗?","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s.a)(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.deleteById(n.stuId);case 2:t.studentList.splice(a,1),t.$message({type:"success",message:"删除成功!"}),t.queryPage(t.queryParam);case 5:case"end":return e.stop()}},e)}))).catch(function(e){})},editStudent:function(e){var t=e.$index;e.row,this.studentUp=this.studentList[t],this.dialogUpdateVisible=!0},handleSizeChange:function(e){this.queryParam.pageInfo.pageSize=e,this.queryPage(this.queryParam)},handleCurrentChange:function(e){this.queryParam.pageInfo.pageNum=e-1,this.queryPage(this.queryParam)},formatRole:function(e,t){return"01"===e.sex?"男":"02"===e.sex?"女":""}}},r=(a("6615"),a("2877")),u=Object(r.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-header",[a("div",[a("el-input",{staticStyle:{width:"180px","margin-right":"8px"},attrs:{clearable:"",placeholder:"搜索学生姓名",size:"small"},model:{value:e.stuNameSearch,callback:function(t){e.stuNameSearch=t},expression:"stuNameSearch"}}),e._v(" "),a("el-select",{attrs:{"value-key":"sex",clearable:!0,placeholder:"请选择性别"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,function(t){return a("el-option",{key:t.sex,attrs:{label:t.label,value:t.sex},on:{change:e.changeSelect}})}),1),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.handleAddStudent}},[e._v("添加学生")])],1)]),e._v(" "),a("el-main",[a("el-table",{staticStyle:{width:"100%","line-height":"20px"},attrs:{data:e.studentList,size:"small",height:"calc(100vh - 198px)",border:""}},[a("el-table-column",{attrs:{prop:"stuId",label:"学号",width:"190"}}),e._v(" "),a("el-table-column",{attrs:{prop:"stuName",label:"姓名","min-width":"190"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sex",formatter:e.formatRole,label:"性别","min-width":"190"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"地址","min-width":"190"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间","min-width":"190"}}),e._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"更新时间","min-width":"190"}}),e._v(" "),a("el-table-column",{attrs:{prop:"",width:"190",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.editStudent(t)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.deleteCourse(t)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"block",staticStyle:{"line-height":"2px"}},[a("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[2,10,20,30,40],"page-size":e.queryParam.pageInfo.size,layout:"total, sizes, prev, pager, next, jumper",total:e.queryParam.pageInfo.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{model:e.student,"label-width":"80px","label-position":"left"}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.student.stuName,callback:function(t){e.$set(e.student,"stuName",t)},expression:"student.stuName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别"}},[a("el-select",{attrs:{"value-key":"sex",clearable:!0,placeholder:"请选择性别"},model:{value:e.student.sex,callback:function(t){e.$set(e.student,"sex",t)},expression:"student.sex"}},e._l(e.options,function(t){return a("el-option",{key:t.sex,attrs:{label:t.label,value:t.sex},on:{change:e.changeSelect}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"地址"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.student.address,callback:function(t){e.$set(e.student,"address",t)},expression:"student.address"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.dialogUpdateVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogUpdateVisible=t}}},[a("el-form",{attrs:{model:e.student,"label-width":"80px","label-position":"left"}},[a("el-form-item",{attrs:{label:"学号"}},[a("el-input",{attrs:{disabled:"",placeholder:""},model:{value:e.studentUp.stuId,callback:function(t){e.$set(e.studentUp,"stuId",t)},expression:"studentUp.stuId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.studentUp.stuName,callback:function(t){e.$set(e.studentUp,"stuName",t)},expression:"studentUp.stuName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别"}},[a("el-select",{attrs:{"value-key":"sex",clearable:!0,placeholder:"请选择性别"},model:{value:e.studentUp.sex,callback:function(t){e.$set(e.studentUp,"sex",t)},expression:"studentUp.sex"}},e._l(e.options,function(e){return a("el-option",{key:e.sex,attrs:{label:e.label,value:e.sex}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"地址"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.studentUp.address,callback:function(t){e.$set(e.studentUp,"address",t)},expression:"studentUp.address"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogUpdateVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("确 定")])],1)],1)],1)},[],!1,null,"32a7d4e9",null);t.default=u.exports}}]);