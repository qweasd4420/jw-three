function findRemoteFunc (list, funcList, tokenFuncList, blankList, methodList) {
  // alert(JSON.stringify(list))
  for (let i = 0; i < list.length; i++) {
    if (list[i].type == 'grid') {
      list[i].columns.forEach(item => {
        findRemoteFunc(item.list, funcList, tokenFuncList, blankList, methodList)
      })
    } else {
      if (list[i].type == 'blank') {
        if (list[i].model) {
          blankList.push({
            name: list[i].model,
            label: list[i].name
          })
        }
      } else if (list[i].type == 'imgupload') {
        if (list[i].options.tokenFunc) {
          tokenFuncList.push({
            func: list[i].options.tokenFunc,
            label: list[i].name,
            model: list[i].model
          })
        }
      } else if (list[i].type == 'button'){
        if(list[i].options.methodBody.remote && list[i].options.methodRjs != ''){
          methodList.push({
            func: list[i].options.methodRjs,
            methodUrl: list[i].options.methodBody.methodUrl,
            httpSendMethod: list[i].options.methodBody.httpSendMethod,
            contentType: list[i].options.methodBody.contentType,
            operateBtn: list[i].options.methodBody.operateBtn,
            tableList: list[i].options.methodBody.tableList
          })
        }
      } else {
        if (list[i].options.remote && list[i].options.remoteFunc) {
          funcList.push({
            func: list[i].options.remoteFunc,
            label: list[i].name,
            model: list[i].model
          })
        }
      }
    }
  }
}

export default function (data) {

  const funcList = []

  const tokenFuncList = []

  const blankList = []
  // 按钮绑定事件生成
  const methodList = []

  findRemoteFunc(JSON.parse(data).list, funcList, tokenFuncList, blankList ,methodList)

  let funcTemplate = ''

  // 按钮绑定事件生成
  let methodTemplate = ''

  let blankTemplate = ''

  for(let i = 0; i < funcList.length; i++) {
    funcTemplate += `
            ${funcList[i].func} (resolve) {
              // ${funcList[i].label} ${funcList[i].model}
              // 获取到远端数据后执行回调函数
              // resolve(data)
              // 添加调用后台的方法
            },
    `
  }

  for(let i = 0; i < tokenFuncList.length; i++) {
    funcTemplate += `
            ${tokenFuncList[i].func} (resolve) {
              // ${tokenFuncList[i].label} ${tokenFuncList[i].model}
              // 获取到token数据后执行回调函数
              // resolve(token)
              
            },
    `
  }

  for (let i = 0; i < blankList.length; i++) {
    blankTemplate += `
        <template slot="${blankList[i].name}" slot-scope="scope">
          <!-- ${blankList[i].label} -->
          <!-- 通过 v-model="scope.model.${blankList[i].name}" 绑定数据 -->
        </template>
    `
  }

  for (let i = 0; i < methodList.length; i++) {
    // 查询
    if(methodList[i].operateBtn == "query"){
      methodTemplate += `
          ${methodList[i].func} () {
            let data = this.$refs.generateForm.getData();
            this.queryParam.data = this.$refs.generateForm.getData()['_v']
            this.$refs.generateForm.getData().then(data => {
              $.ajax({
                  type:"${methodList[i].httpSendMethod}",
                  url: "${methodList[i].methodUrl}",
                  data: JSON.stringify(this.queryParam),
                  dataType: "json",
                  contentType: "${methodList[i].contentType}",
                  success: function (data) {
                  }
              }).then(data => {
                  if(data.status != undefined && data.status == "0"){
                    this.findTableList(this.jsonData.list, '${methodList[i].tableList}', data.data.list)
                  }
              })
            }).catch(e => {
            })
          },
    `
    } else if(methodList[i] == "add"){  // 增加

    } else if(methodList[i] == "update"){ // 更新

    } else if(methodList[i] == "delete"){ // 删除

    }
  }
  methodTemplate += `
          /**
           *
           * @param list  原始数据this.jsonData.list
           * @param tableModel  table的model值
           */
           findTableList (list, tableModel, tableList) {
            for (let i = 0; i < list.length; i++) {
              if (list[i].type == 'grid') {
                list[i].columns.forEach(item => {
                  this.findTableList(item.list, tableModel, tableList)
                })
              } else {
                if(list[i].type == 'table'){
                  if(list[i].model == tableModel){
                    // 赋值
                    list[i].options.defaultValue = tableList
                  }
                }
              }
            }
          }
  `

  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="./js/index.css">
    <link rel="stylesheet" href="./js/FormMaking.css">
  </head>
  <body>
    <div id="app">
      <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm" @childClick="myChild">
        ${blankTemplate}
      </fm-generate-form>
    </div>
    <script src="./js/vue.js"></script>
    <script src="./js/indexdrag.js"></script>
    <script src="./js/FormMaking.umd.js"></script>
    <script src="pdfjs/js/jquery1.11.js" ></script>
    <script>
      new Vue({
        el: '#app',
        data: {
          jsonData: ${data},
          editData: {},
          remoteFuncs: {
            ${funcTemplate}
          },
          queryParam: {
            data: {
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
        },
        
        mounted(){
          this.$EventBus.$on("childClick",(val)=>{
            console.log("执行父组件")
            console.log(val)
          })
        },
        methods: {
          myChild(val){
            alert("在generateCode")
          }
        }
      })
    </script>
  </body>
  </html>`
}
