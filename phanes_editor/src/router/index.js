import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '../views/EditorView.vue'
import CreateProjectPage from '@/components/CreateProjectPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import LandingPage from '@/views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
        name: 'landing',
        component: LandingPage
    },
    {
    path: '/editor',
      name: 'editor',
      component: EditorView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateProjectPage
      // component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage
      // component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
