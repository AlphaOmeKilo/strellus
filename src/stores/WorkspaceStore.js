import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions'
import Vue from 'vue';

import { getAPI } from "@/stores/helpers/apiHelpers.js";

const WorkspaceStore = {
    namespaced: true,
    state: {
        activeWorkspace: 0,
        workspaces: [],
        workspaceStack: {},
    },
    getters: {
        getWorkspaceNameById: state => id => {
            const filteredWorkspaces = state.workspaces.filter((workspace) => {
                return workspace.id === id
            });

            if(filteredWorkspaces[0]) {
                return filteredWorkspaces[0].name;
            }
        }
    },
    mutations: {
        addWorkspace(state, payload) {
            Vue.set(state.workspaces, state.workspaces.length, payload);
        },
        clearWorkspaces(state) {
            state.workspaces = [];
        },
        setWorkspaces(state, payload) {
            state.workspaces = payload;
        },
        setWorkspaceStack(state, payload) {
            state.workspaceStack = payload;
        },
        setActiveWorkspace(state, payload) {
            state.activeWorkspace = payload;
        },
    },
    actions: {
        /**
         * Get the list of workspaces the user is part of
         * @param commit: The vuex commit object 
         */
        async getWorkspaces({ commit }) {
            commit("clearWorkspaces");
            const workspaces = await getAPI("workspaces");
            commit("setWorkspaces", workspaces.data);
        },
        /**
         * Get the details of a workspace based on a given  workspace uuid
         * @param commit: The vuex commit object 
         * @param uuid: The uuid of the workspace
         */
        getWorkspaceStack({ commit }, { uuid }) {

            firebase.firestore().collection('workspaces')
                .doc(uuid)
                .get()
                .then(result => {
                    const workspace = {
                        name: result.data().name
                    }
                    commit("setActiveWorkspace", result.id);
                    commit("setWorkspaceStack", workspace);
                })
                .catch(error => {

                });
        },
    }
}

export default WorkspaceStore;