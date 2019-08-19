import Layout from '@/layout'
import Student from '../../views/student/Student'

const studentRouter = {
  path: '/Student',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Student',
  meta: {
    title: '学生管理',
    icon: 'component'
  },
  children: [
    {
      path: 'Student',
      component: Student,
      name: 'Student',
      meta: { title: '学生管理' }
    }
  ]
}

export default studentRouter
