(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ffecca9"],{"11b5":function(e,t,a){"use strict";var i=a("b582"),n=a.n(i);n.a},3073:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[e.isCollapse?a("el-aside",{staticStyle:{"background-color":"rgb(238, 241, 246)",padding:"2px 6px"}},[a("el-input",{staticStyle:{padding:"18px 0 18px 0",background:"#ffffff"},attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),a("el-tree",{ref:"tree",staticClass:"filter-tree",staticStyle:{height:"calc(100vh - 185px)"},attrs:{props:e.treeProps,data:e.treeData,"node-key":"id","default-expand-all":"","highlight-current":!0,"expand-on-click-node":!1,"filter-node-method":e.filterNode},on:{"node-click":e.handleNodeClick,"node-contextmenu":e.rightClick},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.node,n=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[void 0!==n.grade&&"2"===n.grade?[a("i",{staticClass:"el-icon-document"}),e._v(" "+e._s(i.label)+"\n          ")]:e._e(),e._v(" "),void 0===n.grade||"1"!==n.grade&&"0"!==n.grade?e._e():[a("i",{staticClass:"iconfont icon-icon_workfile_line"}),e._v(" "+e._s(i.label)+"\n          ")]],2)])}}],null,!1,234116862)}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.menuThreeVisible,expression:"menuThreeVisible"}],staticClass:"topTriangle",staticStyle:{width:"126px",height:"60px",border:"1px solid #d3d7d4",background:"#fff","z-index":"9999","border-radius":"5px"},attrs:{id:"menuThree"}},[a("ul",{staticStyle:{margin:"0",padding:"0","list-style":"none","text-align":"left"}},[a("li",{staticStyle:{margin:"0px 10px","font-size":"14px","line-height":"30px",height:"30px"},on:{click:e.createFolder}},[a("i",{staticClass:"iconfont icon-icon_workfile_line",staticStyle:{"padding-right":"10px"}}),e._v("新建文件夹")]),e._v(" "),a("li",{staticStyle:{margin:"0px 10px","font-size":"14px","line-height":"30px",height:"30px"},on:{click:e.createPage}},[a("i",{staticClass:"el-icon-document",staticStyle:{"padding-right":"10px"}}),e._v("新建页面")])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.menuTwoVisible,expression:"menuTwoVisible"}],staticClass:"topTriangle",staticStyle:{width:"126px",height:"90px",border:"1px solid #d3d7d4",background:"#fff","z-index":"9999","border-radius":"5px"},attrs:{id:"menuTwo"}},[a("ul",{staticStyle:{margin:"0",padding:"0","list-style":"none","text-align":"left"}},[a("li",{staticStyle:{margin:"0px 10px","font-size":"14px","line-height":"30px",height:"30px"},on:{click:e.createFolder}},[a("i",{staticClass:"iconfont icon-icon_workfile_line",staticStyle:{"padding-right":"10px"}}),e._v("新建文件夹")]),e._v(" "),a("li",{staticStyle:{margin:"0px 10px","font-size":"14px","line-height":"30px",height:"30px"},on:{click:e.createPage}},[a("i",{staticClass:"el-icon-document",staticStyle:{"padding-right":"10px"}}),e._v("新建页面")]),e._v(" "),a("li",{staticStyle:{margin:"0px 10px","font-size":"14px","line-height":"30px",height:"30px"},on:{click:e.deleteFolder}},[a("i",{staticClass:"el-icon-delete",staticStyle:{"padding-right":"10px"}}),e._v("删除")])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.menuOneVisible,expression:"menuOneVisible"}],staticClass:"topTriangle",staticStyle:{width:"126px",height:"60px",border:"1px solid #d3d7d4",background:"#fff","z-index":"9999","border-radius":"5px"},attrs:{id:"menuOne"}},[a("ul",{staticStyle:{margin:"0",padding:"0","list-style":"none","text-align":"left"}},[a("li",{staticStyle:{margin:"0px 10px","font-size":"14px","line-height":"30px",height:"30px"},on:{click:e.editPage}},[a("i",{staticClass:"el-icon-edit",staticStyle:{"padding-right":"10px"}}),e._v("编辑")]),e._v(" "),a("li",{staticStyle:{margin:"0px 10px","font-size":"14px","line-height":"30px",height:"30px"},on:{click:e.deletePage}},[a("i",{staticClass:"el-icon-delete",staticStyle:{"padding-right":"10px"}}),e._v("删除")])])])],1):e._e(),e._v(" "),a("el-container",[a("tree-main",{staticStyle:{width:"100%"},attrs:{"view-name":e.viewName,"view-info":e.viewInfo}}),e._v(" "),a("el-dialog",{attrs:{title:"",visible:e.dialogAddFolder,top:"10%",width:"30%","before-close":e.folderHandleClose},on:{"update:visible":function(t){e.dialogAddFolder=t}}},[a("div",{staticStyle:{background:"#ffffff",width:"100%",height:"150px",position:"relative"}},[a("el-form",{ref:"addFolder",staticStyle:{position:"absolute",top:"20%",left:"40%",transform:"translate(-50%,-50%)"},attrs:{model:e.addFolder,rules:e.rules,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"文件夹名称",prop:"folderName"}},[a("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"请输入文件夹名称","validate-event":"",clearable:""},model:{value:e.addFolder.folderName,callback:function(t){e.$set(e.addFolder,"folderName",t)},expression:"addFolder.folderName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"文件夹描述",prop:"folderDesc"}},[a("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"请输入文件夹描述","validate-event":"",clearable:""},model:{value:e.addFolder.folderDesc,callback:function(t){e.$set(e.addFolder,"folderDesc",t)},expression:"addFolder.folderDesc"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",staticStyle:{position:"absolute",top:"70%",left:"50%",transform:"translate(-50%,-50%)"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addFolderCancel}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addFolderM}},[e._v("确 定")])],1)],1)]),e._v(" "),a("el-dialog",{attrs:{title:"",visible:e.dialogAddPage,top:"10%",width:"30%","before-close":e.pageHandleClose},on:{"update:visible":function(t){e.dialogAddPage=t}}},[a("div",{staticStyle:{background:"#ffffff",width:"100%",height:"150px",position:"relative"}},[a("el-form",{ref:"addPage",staticStyle:{position:"absolute",top:"20%",left:"40%",transform:"translate(-50%,-50%)"},attrs:{model:e.addPage,rules:e.rules,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"页面名称",prop:"pageName"}},[a("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"请输入页面名称","validate-event":"",clearable:""},model:{value:e.addPage.pageName,callback:function(t){e.$set(e.addPage,"pageName",t)},expression:"addPage.pageName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"页面描述",prop:"pageDesc"}},[a("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"请输入页面描述","validate-event":"",clearable:""},model:{value:e.addPage.pageDesc,callback:function(t){e.$set(e.addPage,"pageDesc",t)},expression:"addPage.pageDesc"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",staticStyle:{position:"absolute",top:"70%",left:"50%",transform:"translate(-50%,-50%)"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.addPageCancel}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addPageM}},[e._v("确 定")])],1)],1)]),e._v(" "),a("el-dialog",{attrs:{title:"",visible:e.dialogEditPage,top:"5px",width:"95%",hight:"95%","before-close":e.editPageHandleClose,align:"center"},on:{"update:visible":function(t){e.dialogEditPage=t}}},[a("iframe",{ref:"editPageIframe",style:e.iframe.iframeStyle,attrs:{src:e.editPageUrl,width:e.iframe.iframeWidth,height:e.iframe.iframeHigh,frameborder:"0"}})])],1)],1)},n=[],r=(a("63ff"),a("f8f9")),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a(e.tabView,{tag:"component",attrs:{"node-info":e.nodeInfo}})],1)},l=[],s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-main",[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{name:"userManage"}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"el-icon-info"}),e._v(" 用户管理")]),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.pageInfo,"label-position":"right"}},[a("el-form-item",{attrs:{label:"页面名称"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{readonly:e.readonlyModify,clearable:""},model:{value:e.pageInfo.pageName,callback:function(t){e.$set(e.pageInfo,"pageName",t)},expression:"pageInfo.pageName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"页面描述"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea",readonly:e.readonlyModify,clearable:""},model:{value:e.pageInfo.pageDesc,callback:function(t){e.$set(e.pageInfo,"pageDesc",t)},expression:"pageInfo.pageDesc"}})],1),e._v(" "),a("el-form",{attrs:{inline:""}},[a("el-form-item",{attrs:{label:"创建日期"}},[a("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"datetime",placeholder:"选择日期时间",readonly:e.readonlyFlag,clearable:""},model:{value:e.pageInfo.createTime,callback:function(t){e.$set(e.pageInfo,"createTime",t)},expression:"pageInfo.createTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"修改日期"}},[a("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"datetime",placeholder:"选择日期时间",readonly:e.readonlyFlag,clearable:""},model:{value:e.pageInfo.updateTime,callback:function(t){e.$set(e.pageInfo,"updateTime",t)},expression:"pageInfo.updateTime"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"创建人"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{readonly:e.readonlyFlag},model:{value:e.pageInfo.userName,callback:function(t){e.$set(e.pageInfo,"userName",t)},expression:"pageInfo.userName"}})],1),e._v(" "),a("el-form",{attrs:{inline:""}},[a("el-form-item",{attrs:{label:"修改人"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{readonly:e.readonlyFlag},model:{value:e.pageInfo.updateUserId,callback:function(t){e.$set(e.pageInfo,"updateUserId",t)},expression:"pageInfo.updateUserId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"当前版本"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{prefix:"V",readonly:e.readonlyFlag},model:{value:e.pageInfo.curVersion,callback:function(t){e.$set(e.pageInfo,"curVersion",t)},expression:"pageInfo.curVersion"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"页面编号"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{readonly:e.readonlyFlag},model:{value:e.pageInfo.pageId,callback:function(t){e.$set(e.pageInfo,"pageId",t)},expression:"pageInfo.pageId"}})],1),e._v(" "),a("el-form-item",{attrs:{inline:""}},[e.readonlyModify?a("el-button",{attrs:{type:"primary"},on:{click:e.versionEdit}},[e._v("编辑")]):e._e(),e._v(" "),e.readonlyModify?e._e():a("el-button",{attrs:{type:"warning"},on:{click:e.versionSave}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.lookPageDesc}},[e._v("查看")])],1)],1)],1),e._v(" "),a("el-tab-pane",{attrs:{name:"versionManage"}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"el-icon-date"}),e._v(" 版本管理")]),e._v(" "),a("el-form",{ref:"listQuery",staticClass:"demo-form-inline",attrs:{model:e.listQuery,inline:""}},[a("el-form-item",{attrs:{prop:"userId",label:""}},[a("el-input",{attrs:{placeholder:"请输入用户编号",clearable:""},model:{value:e.listQuery.userId,callback:function(t){e.$set(e.listQuery,"userId",t)},expression:"listQuery.userId"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"version",label:""}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择版本号",clearable:""},model:{value:e.listQuery.version,callback:function(t){e.$set(e.listQuery,"version",t)},expression:"listQuery.version"}},e._l(e.versionOptions,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.conditionSearch}},[e._v("Search")])],1)],1),e._v(" "),a("el-table",{staticStyle:{"margin-bottom":"20px",width:"100%"},attrs:{data:e.tableData,border:"",fit:"",height:"calc(100vh - 400px)"}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:"页面名称"}},[a("span",[e._v(e._s(t.row.pageName))])]),e._v(" "),a("el-form-item",{attrs:{label:"页面描述"}},[a("span",[e._v(e._s(t.row.pageDesc))])]),e._v(" "),a("el-form-item",{attrs:{label:"创建人"}},[a("span",[e._v(e._s(t.row.userId))])]),e._v(" "),a("el-form-item",{attrs:{label:"创建时间"}},[a("span",[e._v(e._s(t.row.createTime))])])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"pageName",label:"页面名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"version",label:"版本号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"300","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:function(t){return e.lookPage(i)}}},[e._v("\n                查看\n              ")]),e._v(" "),a("el-button",{attrs:{size:"small",icon:"el-icon-edit",type:"success"},on:{click:function(t){return e.overridePage(i)}}},[e._v("\n                覆盖\n              ")]),e._v(" "),a("el-button",{attrs:{icon:"el-icon-delete",size:"small",type:"danger"},on:{click:function(t){return e.deleteVersion(i)}}},[e._v("\n                删除\n              ")])]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{"margin-top":"15px","text-align":"center"},attrs:{"current-page":e.currentPage,"page-sizes":[5,10,15,20],"page-size":e.queryParam.pageInfo.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.queryParam.pageInfo.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"",visible:e.dialogEditPage,top:"5px",width:"95%",hight:"95%","before-close":e.editPageHandleClose,align:"center"},on:{"update:visible":function(t){e.dialogEditPage=t}}},[a("iframe",{ref:"editPageIframe",style:e.iframe.iframeStyle,attrs:{src:e.editPageUrl,width:e.iframe.iframeWidth,height:e.iframe.iframeHigh,frameborder:"0"}})])],1),e._v(" "),a("el-dialog",{attrs:{title:"",visible:e.dialogCurrentVersion,top:"5px",width:"95%",hight:"95%","before-close":e.currentPageHandleClose,align:"center"},on:{"update:visible":function(t){e.dialogCurrentVersion=t}}},[a("iframe",{ref:"currentPageIframe",style:e.iframe.iframeStyle,attrs:{src:e.currentPageUrl,width:e.iframe.iframeWidth,height:e.iframe.iframeHigh,frameborder:"0"}})])],1)},d=[],c=a("7300"),u=a("e9e3"),f=a("b775"),g=function(){function e(){Object(c["a"])(this,e)}return Object(u["a"])(e,null,[{key:"initTree",value:function(){return Object(f["a"])({url:"/px-common-dragpage/treeManage/treeInit",method:"post"})}},{key:"addFolderJs",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/treeManage/addFolder",method:"post",data:e})}},{key:"addPageJs",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/treeManage/addPage",method:"post",data:e})}},{key:"deleteFolderJs",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/treeManage/deleteFolder",method:"post",data:e})}},{key:"queryFolderInfo",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/treeManage/queryFolder",method:"post",data:e})}},{key:"queryPageInfo",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/treeManage/queryPage",method:"post",data:e})}},{key:"deletePageJs",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/treeManage/deletePage",method:"post",data:e})}}]),e}(),p=function(){function e(){Object(c["a"])(this,e)}return Object(u["a"])(e,null,[{key:"initPage",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/dragPage/queryPageParam",method:"post",data:e})}},{key:"savePageParam",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/dragPage/savePageParam",method:"post",data:e})}},{key:"initTree",value:function(){return Object(f["a"])({url:"/px-common-dragpage/treeManage/treeInit",method:"post"})}},{key:"queryVersionList",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/versionManage/queryVersionList",method:"post",data:e})}},{key:"queryVersions",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/versionManage/queryVersions",method:"post",data:e})}},{key:"updateVersion",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/versionManage/updateVersion",method:"post",data:e})}},{key:"deleteVersion",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/versionManage/deleteVersion",method:"post",data:e})}},{key:"updatePageInfo",value:function(e){return Object(f["a"])({url:"/px-common-dragpage/versionManage/updatePageInfo",method:"post",data:e})}}]),e}(),m={name:"PageForm",props:["nodeInfo"],data:function(){return{activeName:"userManage",currentPage:1,tableData:[],dialogEditPage:!1,dialogCurrentVersion:!1,currentPageUrl:"",editPageUrl:"",iframe:{iframeWidth:"",iframeHigh:"",iframeStyle:""},baseURL:"http://192.100.2.66:12012",pageInfo:{pageName:"",pageDesc:"",createTime:"",updateTime:"",userName:"",updateUserId:"",curVersion:"",pageId:""},listQuery:{userId:"",version:""},versionOptions:[],queryParam:{data:{pageId:"",userId:"",version:""},pageInfo:{pageNum:1,pageSize:5,size:0,startRow:1,endRow:1,pages:0,prePage:0,nextPage:0,isFirstPage:!0,isLastPage:!0,hasPreviousPage:!1,navigatePages:0,navigatepageNums:[],navigateFirstPage:1,navigateLastPage:1,total:0}},readonlyFlag:!0,readonlyModify:!0}},mounted:function(){this.initPageInfo(this.nodeInfo)},methods:{resetForm:function(e){this.$refs[e].resetFields()},initPageInfo:function(e){var t=this,a={pageId:e};g.queryPageInfo(a).then((function(e){0===e.status&&(t.pageInfo=e.data)}))},handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.queryParam.pageInfo.pageSize=e,this.queryPage(this.queryParam)},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.queryParam.pageInfo.pageNum=e,this.queryPage(this.queryParam)},handleClick:function(e,t){"versionManage"===this.activeName?(this.queryParam.data.pageId=this.nodeInfo,this.queryPage(this.queryParam)):this.initPageInfo(this.nodeInfo)},currentPageHandleClose:function(e){e()},queryPage:function(e){var t=this;p.queryVersionList(e).then((function(e){t.tableData=e.data.list,t.queryParam.pageInfo.total=e.data.total,t.resetForm("listQuery")}));var a={pageId:this.nodeInfo};p.queryVersions(a).then((function(e){t.versionOptions=e.data}))},conditionSearch:function(){this.queryParam.data.userId=this.listQuery.userId,this.queryParam.data.version=this.listQuery.version,this.queryPage(this.queryParam)},lookPage:function(e){this.dialogCurrentVersion=!0,this.currentPageUrl=this.baseURL+"/px-common-dragpage/queryPage?pageId="+e.pageId+"&version="+e.version;var t=document.body.scrollWidth,a=document.body.scrollHeight,i=window.screen.height,n=window.screen.width;this.iframe.iframeStyle="position:relative;top: "+.05*i+";left: "+.05*n,t<985&&(t=985),this.iframe.iframeWidth=.9*t,this.iframe.iframeHigh=.8*a},overridePage:function(e){var t=this;console.log(e.version),this.pageInfo.curVersion!==e.version?this.$confirm("版本校验通过，确定覆盖当前版本?","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(Object(r["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:console.log("不一致，执行"),i={pageId:e.pageId,version:e.version},p.updateVersion(i).then((function(a){0===a.status&&(t.$message({type:"success",message:a.data}),t.pageInfo.curVersion=e.version,t.$parent.initTree())}));case 3:case"end":return a.stop()}}),a)})))).catch((function(e){console.error("取消"+e)})):this.$message({type:"warning",message:"与当前版本一致，不需要覆盖!"})},deleteVersion:function(e){var t=this;console.log(e.pageId),this.pageInfo.curVersion!==e.version?this.$confirm("版本校验通过，确定删除当前版本?","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(Object(r["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:i={pageId:e.pageId,version:e.version},p.deleteVersion(i).then((function(e){0===e.status&&(t.$message({type:"success",message:e.data}),t.queryPage(t.queryParam))}));case 2:case"end":return a.stop()}}),a)})))).catch((function(e){console.error("取消"+e)})):this.$message({type:"error",message:"删除的版本与当前应用的版本一致，不能删除!"})},versionEdit:function(){this.readonlyModify=!1},versionSave:function(){var e=this,t={pageId:this.nodeInfo,pageName:this.pageInfo.pageName,pageDesc:this.pageInfo.pageDesc,version:this.pageInfo.curVersion};p.updatePageInfo(t).then((function(t){0===t.status&&(e.$message({type:"success",message:t.data}),e.$parent.initTree(),e.readonlyModify=!0)}))},lookPageDesc:function(){this.dialogCurrentVersion=!0,this.currentPageUrl=this.baseURL+"/px-common-dragpage/queryPage?pageId="+this.nodeInfo+"&version=";var e=document.body.scrollWidth,t=document.body.scrollHeight,a=window.screen.height,i=window.screen.width;this.iframe.iframeStyle="position:relative;top: "+.05*a+";left: "+.05*i,e<985&&(e=985),this.iframe.iframeWidth=.9*e,this.iframe.iframeHigh=.8*t},editPageHandleClose:function(e){this.$confirm("确定退出?","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("执行"),e();case 2:case"end":return t.stop()}}),t)})))).catch((function(e){console.error("取消"+e)}))}},watch:{nodeInfo:function(e){this.initPageInfo(this.nodeInfo),this.activeName="userManage"}}},h=m,v=(a("8a5d"),a("6691")),b=Object(v["a"])(h,s,d,!1,null,"36f7bfe6",null),y=b.exports,x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-main",[a("div",{staticStyle:{background:"#ffffff",width:"100%",height:"600px",position:"relative"}},[a("span",{staticStyle:{position:"absolute",top:"10%",left:"44%",transform:"translate(-50%,-50%)","font-size":"16px","font-weight":"bold"}},[e._v("详细信息")]),e._v(" "),a("el-form",{ref:"form",staticStyle:{position:"absolute",top:"45%",left:"40%",transform:"translate(-50%,-50%)"},attrs:{model:e.folderInfo,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"文件夹名称"}},[a("el-input",{attrs:{clearable:""},model:{value:e.folderInfo.folderName,callback:function(t){e.$set(e.folderInfo,"folderName",t)},expression:"folderInfo.folderName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"文件夹描述"}},[a("el-input",{attrs:{type:"textarea",clearable:""},model:{value:e.folderInfo.folderDesc,callback:function(t){e.$set(e.folderInfo,"folderDesc",t)},expression:"folderInfo.folderDesc"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创建日期"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间",readonly:e.readonlyFlag,clearable:""},model:{value:e.folderInfo.createTime,callback:function(t){e.$set(e.folderInfo,"createTime",t)},expression:"folderInfo.createTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"修改日期"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间",readonly:e.readonlyFlag,clearable:""},model:{value:e.folderInfo.updateTime,callback:function(t){e.$set(e.folderInfo,"updateTime",t)},expression:"folderInfo.updateTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创建人"}},[a("el-input",{attrs:{readonly:""},model:{value:e.folderInfo.userId,callback:function(t){e.$set(e.folderInfo,"userId",t)},expression:"folderInfo.userId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"文件夹ID"}},[a("el-input",{attrs:{readonly:""},model:{value:e.folderInfo.folderId,callback:function(t){e.$set(e.folderInfo,"folderId",t)},expression:"folderInfo.folderId"}})],1)],1)],1)])],1)},I=[],P={name:"FolderForm",props:["nodeInfo"],data:function(){return{folderInfo:{folderName:"",folderDesc:"",createTime:"",updateTime:"",userId:"",folderId:""},readonlyFlag:!0}},mounted:function(){this.initFolderInfo(this.nodeInfo)},methods:{initFolderInfo:function(e){var t=this,a={folderId:e};g.queryFolderInfo(a).then((function(e){0===e.status&&(t.folderInfo=e.data)}))}},watch:{nodeInfo:function(e){this.initFolderInfo(this.nodeInfo)}}},w=P,_=(a("8a6b"),Object(v["a"])(w,x,I,!1,null,"c1da2c12",null)),k=_.exports,S={name:"TreeMain",props:["viewName","viewInfo"],data:function(){return{data:[],tabView:"",nodeInfo:""}},mounted:function(){this.tabView=this.viewName,this.nodeInfo=this.viewInfo,console.log(this.nodeInfo)},watch:{viewName:function(e){this.tabView=this.viewName},viewInfo:function(e){this.nodeInfo=this.viewInfo,console.log(this.nodeInfo)}},components:{page:y,folder:k},methods:{initTree:function(){console.log("进入"),this.$EventBus.$emit("childClick")}}},T=S,F=Object(v["a"])(T,o,l,!1,null,"c68eead2",null),N=F.exports,C={name:"DragPage",components:{TreeMain:N},data:function(){return{treeData:[{id:"1",label:"电力市场",grade:"0",children:[]}],dialogAddFolder:!1,dialogAddPage:!1,dialogEditPage:!1,addFolder:{folderName:"",folderDesc:""},addPage:{pageName:"",pageDesc:""},treeProps:{id:"id",children:"children",label:"label",grade:"grade",pid:"pid"},viewName:"",viewInfo:"",filterText:"",collapseBtnClick:!1,isCollapse:!0,menuVisible:!0,menuOneVisible:!1,menuTwoVisible:!1,menuThreeVisible:!1,currentId:"",currentName:"",jsonData:{list:[],config:{labelWidth:100,labelPosition:"right",size:"small"}},editPageUrl:"",iframe:{iframeWidth:"",iframeHigh:"",iframeStyle:""},rules:{folderName:[{required:!0,message:"请输入文件夹名称",trigger:"blur"},{min:3,max:32,message:"长度在 3 到 32 个字符",trigger:"blur"}],pageName:[{required:!0,message:"请输入页面名称",trigger:"blur"},{min:3,max:32,message:"长度在 3 到 32 个字符",trigger:"blur"}]}}},watch:{filterText:function(e){console.log(e),this.$refs.tree.filter(e)}},mounted:function(){var e=this;this.initTree(),(this.menuVisible||this.menuOneVisible||this.menuTwoVisible||this.menuThreeVisible)&&document.addEventListener("click",this.hideMenu),this.$EventBus.$on("childClick",(function(){e.initTree()}))},beforeDestroy:function(){this.$EventBus.$off("childClick")},methods:{hideMenu:function(){this.menuOneVisible=!1,this.menuTwoVisible=!1,this.menuThreeVisible=!1},folderHandleClose:function(e){e(),this.resetForm("addFolder")},pageHandleClose:function(e){e(),this.resetForm("addPage")},editPageHandleClose:function(e){this.$confirm("确定退出?","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("执行"),e();case 2:case"end":return t.stop()}}),t)})))).catch((function(e){console.error("取消"+e)}))},resetForm:function(e){this.$refs[e].resetFields()},addFolderCancel:function(){this.dialogAddFolder=!1,this.resetForm("addFolder")},addPageCancel:function(){this.dialogAddPage=!1,this.resetForm("addPage")},initTree:function(){var e=this;g.initTree().then((function(t){e.treeData=t.data}))},handleNodeClick:function(e,t){console.log(JSON.stringify(e)),this.viewInfo=e.id,void 0!==e.grade&&null!==e.grade&&"1"===e.grade?this.viewName="folder":void 0!==e.grade&&null!==e.grade&&"2"===e.grade&&(this.viewName="page")},filterNode:function(e,t){return console.log(t),!e||-1!==t.label.indexOf(e)},rightClick:function(e,t,a,i){console.log("当前文件夹id为"+a.data.id),this.currentId=a.data.id,this.currentName=a.data.label;var n=null;if(this.menuVisible=!1,"0"===t.grade)this.menuOneVisible=!1,this.menuTwoVisible=!1,this.menuThreeVisible=!0,n=document.querySelector("#menuThree");else if("1"===t.grade)this.menuOneVisible=!1,this.menuTwoVisible=!0,this.menuThreeVisible=!1,n=document.querySelector("#menuTwo");else{if("2"!==t.grade)return;this.menuOneVisible=!0,this.menuTwoVisible=!1,this.menuThreeVisible=!1,n=document.querySelector("#menuOne")}n.style.left=e.clientX-207+"px",n.style.top=e.clientY-131+"px",n.style.position="absolute",console.log(e.clientX),console.log(e.clientY),console.log(n.style.left),console.log(n.style.top)},createFolder:function(){console.log("进入创建文件夹"),this.dialogAddFolder=!0},addFolderM:function(){var e=this,t=this.currentId,a={parentId:t,folderName:this.addFolder.folderName,folderDesc:this.addFolder.folderDesc};g.addFolderJs(a).then((function(t){0===t.status&&(e.$message({type:"success",message:"添加成功!"}),e.addFolderCancel(),e.initTree())}))},createPage:function(){console.log("进入添加页面接口"),this.dialogAddPage=!0},addPageM:function(){var e=this,t=this.currentId,a={folderId:t,pageName:this.addPage.pageName,pageDesc:this.addPage.pageDesc,jsonData:JSON.stringify(this.jsonData)};g.addPageJs(a).then((function(t){0===t.status&&(e.$message({type:"success",message:"添加页面成功!"}),e.addPageCancel(),e.initTree())}))},deleteFolder:function(){var e=this,t=this.currentId,a={folderId:t};g.deleteFolderJs(a).then((function(t){0===t.status&&(e.$message({type:"success",message:"节点删除文件夹成功!"}),e.initTree())}))},editPage:function(){this.dialogEditPage=!0,this.editPageUrl="http://192.100.2.67:13035/#/";var e=document.body.scrollWidth,t=document.body.scrollHeight,a=window.screen.height,i=window.screen.width;this.iframe.iframeStyle="position:relative;top: "+.05*a+";left: "+.05*i,e<985&&(e=985),this.iframe.iframeWidth=.9*e,this.iframe.iframeHigh=.8*t;var n=this;setTimeout((function(){n.$refs.editPageIframe.contentWindow.postMessage({cmd:"showPage",params:{pageId:n.currentId,pageName:n.currentName}},"*")}),1e3)},deletePage:function(){var e=this,t=this.currentId,a={pageId:t};g.deletePageJs(a).then((function(t){0===t.status&&(e.$message({type:"success",message:"节点删除文件成功!"}),e.initTree())}))}}},V=C,$=(a("11b5"),Object(v["a"])(V,i,n,!1,null,"4bd6019e",null));t["default"]=$.exports},3693:function(e,t,a){},"8a5d":function(e,t,a){"use strict";var i=a("3693"),n=a.n(i);n.a},"8a6b":function(e,t,a){"use strict";var i=a("de93"),n=a.n(i);n.a},b582:function(e,t,a){},de93:function(e,t,a){}}]);