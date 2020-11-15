import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Admin from '@/views/Admin'
import Contribute from '@/views/ContributePage'
import Restaurant from '@/views/Restaurant'
// Regions
import North from '@/views/North'
import NorthEast from '@/views/NorthEast'
import South from '@/views/South'
import East from '@/views/East'
import West from '@/views/West'
import Central from '@/views/Central'
// User pages
import Settings from '@/views/Settings'
import Favorites from '@/views/Favorites'
import ForgetPassword from '@/views/ForgetPassword'
// Footer
import ContactUs from '@/views/ContactUs'
import PrivacyPolicy from '@/views/PrivacyPolicy'
import SiteMap from '@/views/Sitemap'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: Contribute
  },
  {
    path: '/restaurant/:id',
    name: 'Restaurant',
    component: Restaurant
  },
  // Regions
  {
    path: '/north',
    name: 'North',
    component: North
  },
  {
    path: '/north-east',
    name: 'NorthEast',
    component: NorthEast
  },
  {
    path: '/south',
    name: 'South',
    component: South
  },
  {
    path: '/east',
    name: 'East',
    component: East
  },
  {
    path: '/west',
    name: 'West',
    component: West
  },
  {
    path: '/central',
    name: 'Central',
    component: Central
  },
  // User pages
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/forgetpassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  },
  // Footers
  {
    path: '/contactUs',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/PrivacyPolicy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/sitemap',
    name: 'SiteMap',
    component: SiteMap
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) { // Resets scroll bar to top of the page
    return { x: 0, y: 0 }
  }
})

export default router
