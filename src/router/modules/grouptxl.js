import Layout from '@/layout'
import grouptxl from '../../views/test/grouptxl'
import grouptest from '../../views/test/grouptest'

const groupRouter = {
  path: '/grouptxl',
  component: Layout,
  redirect: 'noRedirect',
  name: 'grouptxl',
  meta: {
    title: '测试',
    icon: 'component'
  },
  children: [
    {
      path: 'grouptxl',
      component: grouptxl,
      name: 'grouptxl',
      meta: { title: '通讯录' }
    },
    {
      path: 'grouptest',
      component: grouptest,
      name: 'grouptest',
      meta: { title: '通讯录测试' }
    }
  ]
}

export default groupRouter
