import firebase from 'firebase';

const WorkspaceStore = {
    namespaced: true,
    state: {
        activeWorkspace: 0,
        workspaces: [],
        workspaceStack: {},
    },
    getters: {

    },
    mutations: {
        setWorkspaces(state, payload) {
            state.workspaces = payload;
        },
        addWorkspace(state, payload) {
            state.workspaces.push(payload);
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

            let workspaceList = [];

            firebase.firestore().collection('workspace_membership').where("user_id", "==", firebase.auth().currentUser.uid).get()
            .then(result => {
                result.forEach(doc => {
                    firebase.firestore().collection('workspaces').doc(doc.data().workspace_id).get()
                    .then(result => {
                        const workspaceData = result.data();

                        workspaceList.push(
                            {
                                id: result.id,
                                name: workspaceData.name,
                                new: doc.data().new,
                                admin: doc.data().admin,
                                private: doc.data().private
                            }
                        )
                    })
                    .catch(error => {

                    });
                })
            })
            .catch(error => {

            });

            commit("setWorkspaces", workspaceList);
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