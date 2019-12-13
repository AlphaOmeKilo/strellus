import Vue from 'vue';
import Vuex from 'vuex';

import NotificationStore from './stores/NotificationStore';
import WorkspaceStore from './stores/WorkspaceStore';
import InvitationStore from './stores/InvitationStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    NotificationStore,
    WorkspaceStore,
    InvitationStore
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
