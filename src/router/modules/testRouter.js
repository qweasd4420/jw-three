import Layout from '@/layout'
import Test from '../../views/test/knowsearch'

const testRouter = {
  path: '/Test',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Test',
  meta: {
    title: '测试',
    icon: 'component'
  },
  children: [
    {
      path: 'Test',
      component: Test,
      name: 'Test',
      meta: { title: '测试' }
    }
  ]
}

export default testRouter
