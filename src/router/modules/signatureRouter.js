import Layout from '@/layout'

const signatureRouter = {
  path: '/Signature',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Signature',
  meta: {
    title: '电子文件签章',
    icon: 'component'
  },
  children: [
    {
      path: 'EleDocSign',
      component: () => import('@/views/signature/EleDocSign'),
      name: 'EleDocSign',
      meta: { title: '电子文件签章' }
    }
  ]
}

export default signatureRouter
