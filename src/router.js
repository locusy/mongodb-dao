import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Student from './components/Student'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/student',
    component: Student,
    name: 'Student'
  }
]

const router =  new VueRouter({
  routes
})

export default router

