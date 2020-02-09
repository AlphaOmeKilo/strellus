import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth'

import store from './store';

import Platform from './views/Platform.vue';
import Dashboard from './views/Dashboard.vue';

import Workspace from './views/Workspace.vue';
import Profile from './views/Profile.vue';

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
        next();
        Promise.all([
          store.commit("setLoading", true),
          store.dispatch('UserStore/getProfileImage'),
          store.dispatch('WorkspaceStore/getWorkspaces')
        ])
        .then(() => {
          store.commit("setLoading", false);
          store.commit("NotificationStore/setLoading", true);
          return store.dispatch('NotificationStore/updateNotifications');
        })
        .then(() => {
          store.commit("NotificationStore/setLoading", false);
        })
        
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
          beforeEnter(to, from, next) {
            store.commit("setLoading", true);
            store.commit("WorkspaceStore/setActiveWorkspace", "0");
            next();
            store.commit("setLoading", false);
          },
        },
        {
          path: 'workspace/:uuid',
          name: 'workspace',
          component: Workspace,
          beforeEnter(to, from, next) {
            const uuid = to.params.uuid;
            store.dispatch('WorkspaceStore/getWorkspaceStack', { uuid }).then(res => next())
          },
          props: true
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile,
          meta: {
            leftMenuDisable: true
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
      path: '/invite',
      name: 'invite',
      component: () => import('./views/Invite.vue'),
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
