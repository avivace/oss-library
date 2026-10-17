import { createRouter, createWebHashHistory } from 'vue-router'
import LibraryView from './views/LibraryView.vue'

export default createRouter({
  // Hash URLs (/#/about) work on any static host, GitHub Pages included
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'library', component: LibraryView },
    { path: '/about', name: 'about', component: () => import('./views/AboutView.vue') },
    { path: '/lists', name: 'lists', component: () => import('./views/ListsView.vue') },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
