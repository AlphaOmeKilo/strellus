import firebase from 'firebase';
import Vue from 'vue';

const WorkspaceStore = {
    namespaced: true,
    state: {
        activeWorkspace: 0,
        workspaces: [],
        workspaceStack: {},
    },
    getters: {
        getWorkspaceNameById: state => id => {
            return state.workspaces.filter((workspace) => {
                return workspace.id === id
            });
        }
    },
    mutations: {
        addWorkspace(state, payload) {
            Vue.set(state.workspaces, state.workspaces.length, payload);
        },
        clearWorkspaces(state) {
            state.workspaces = [];
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
        getWorkspaces({ commit }) {

            commit("clearWorkspaces");

            firebase.firestore().collection('workspace_membership').where("user_id", "==", firebase.auth().currentUser.uid).get()
            .then(result => {
                result.forEach(doc => {
                    firebase.firestore().collection('workspaces').doc(doc.data().workspace_id).get()
                    .then(result => {
                        const workspaceData = result.data();

                        commit("addWorkspace", {
                            id: result.id,
                            name: workspaceData.name,
                            new: doc.data().new,
                            admin: doc.data().admin,
                            private: doc.data().private
                        });
                    })
                    .catch(error => {

                    });
                })
            })
            .catch(error => {

            });

            
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