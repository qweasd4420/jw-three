import Layout from '@/layout'
import SurveyQueryPage from '../../views/surveyquery/SurveyQuery'
const surveyRouter = {
  path: '/SurveyQuery',
  component: Layout,
  redirect: 'noRedirect',
  name: 'SurveyQuery',
  meta: {
    title: '调查问卷评价查询',
    icon: 'component'
  },
  children: [
    {
      path: 'SurveyQueryPage',
      component: SurveyQueryPage,
      name: 'SurveyQueryPage',
      meta: { title: '调查问卷评价查询' }
    }
  ]
}

export default surveyRouter
