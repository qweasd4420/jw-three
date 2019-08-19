<template>
  <fm-generate-form
    :data="jsonData"
    :remote="remoteFuncs"
    :value="values"
    ref="generateForm">
  </fm-generate-form>
</template>

<script>
export default {
  data() {
    return {
      jsonData: {
        'list': [
          {
            'type': 'input',
            'name': '单行文本',
            'icon': 'icon-input',
            'options': {
              'width': '100%',
              'defaultValue': '',
              'required': false,
              'dataType': 'string',
              'pattern': '',
              'placeholder': '',
              'remoteFunc': 'func_1540908864000_94322'
            },
            'key': '1540908864000_94322',
            'model': 'input_1540908864000_94322',
            'rules': [
              {
                'type': 'string',
                'message': '单行文本格式不正确'
              }
            ]
          }
        ],
        'config': {
          'labelWidth': 100,
          'labelPosition': 'top',
          'size': 'small'
        }
      },
      values: {},
      remoteFuncs: {}
    }
  }
}
</script>

<style scoped>

</style>
