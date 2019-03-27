import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/index/home',
      component: () => import(/* webpackChunkName: "about" */ './views/Index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import(/* webpackChunkName: "about" */ './components/Home.vue')
        },
        {
          path: 'nbBolg',
          name: 'nbBolg',
          component: () => import(/* webpackChunkName: "about" */ './components/nbBolg/nbBolg.vue')
        },
        {
          path: 'happyDay',
          name: 'happyDay',
          component: () => import(/* webpackChunkName: "about" */ './components/happyDay/happyDay.vue')
        },
        {
          path: 'selfZone',
          name: 'selfZone',
          component: () => import(/* webpackChunkName: "about" */ './components/selfZone/selfZone.vue')
        },
        {
          path: 'studyWeb',
          name: 'studyWeb',
          component: () => import(/* webpackChunkName: "about" */ './components/studyWeb/studyWeb.vue')
        },
        {
          path: 'studyNote',
          name: 'studyNote',
          component: () => import(/* webpackChunkName: "about" */ './components/studyNote/studyNote.vue')
        }
      ]
    }
  ]
})
