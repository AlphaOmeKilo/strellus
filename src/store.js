import Vue from 'vue';
import Vuex from 'vuex';

import NotificationStore from './stores/NotificationStore';
import ProjectStore from './stores/ProjectStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    NotificationStore,
    ProjectStore
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
