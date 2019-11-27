import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import store from './store';

import Platform from './views/Platform.vue';
import Dashboard from './views/Dashboard.vue';
import AddLink from './components/link/AddLink.vue';

import Project from './views/Project.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Platform,
      meta: {
        requiresAuth: true,
      },
      beforeEnter(to, from, next) {
        store.dispatch('ProjectStore/getProjects').then(res => next())
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
          beforeEnter(to, from, next) {
            store.commit("ProjectStore/setActiveProject", 0);
            store.dispatch('NotificationStore/updateNotifications').then(res => next())
          },
          children: [
            {
              path: "addLink",
              name: "Add Link",
              components: {
                addLink: AddLink
              },
              meta: {
                showModal: true
              }
            },
          ]
        },
        {
          path: 'project/:uuid',
          name: 'project',
          component: Project,
          beforeEnter(to, from, next) {
            const uuid = to.params.uuid;
            store.dispatch('ProjectStore/getProjectStack', { uuid }).then(res => next())
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignUp.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if (!requiresAuth && currentUser) {
    next('dashboard');
  } else {
    next();
  }
});

export default router;
