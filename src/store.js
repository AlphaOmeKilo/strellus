import Vue from 'vue';
import Vuex from 'vuex';

import NotificationStore from './stores/NotificationStore';
import WorkspaceStore from './stores/WorkspaceStore';
import InvitationStore from './stores/InvitationStore';
import UserStore from './stores/UserStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    NotificationStore,
    WorkspaceStore,
    InvitationStore,
    UserStore
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
