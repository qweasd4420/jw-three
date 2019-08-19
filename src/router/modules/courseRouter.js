import Layout from '@/layout'
import Course from '../../views/course/Course'

const courseRouter = {
  path: '/Course',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Course',
  meta: {
    title: '课程管理',
    icon: 'component'
  },
  children: [
    {
      path: 'Course',
      component: Course,
      name: 'Course',
      meta: { title: '课程管理' }
    }
  ]
}

export default courseRouter
