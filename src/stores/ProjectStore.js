import firebase from 'firebase';

const ProjectStore = {
    namespaced: true,
    state: {
        activeProject: 0,
        projects: [],
        projectStack: {},
        invitations: []
    },
    getters: {

    },
    mutations: {
        setProjects(state, payload) {
            state.projects = payload;
        },
        addProject(state, payload) {
            state.projects.push(payload);
        },
        setProjectStack(state, payload) {
            state.projectStack = payload;
        },
        setActiveProject(state, payload) {
            state.activeProject = payload;
        },
        setInvitations(state, payload) {
            state.invitations = payload;
        }
    },
    actions: {
        /**
         * Get the list of projects the user is part of
         * @param commit: The vuex commit object 
         */
        getProjects({ commit }) {

            let projectList = [];

            firebase.firestore().collection('org_membership').where("user_id", "==", firebase.auth().currentUser.uid).get()
            .then(result => {
                result.forEach(doc => {
                    firebase.firestore().collection('organisations').doc(doc.data().org_id).get()
                    .then(result => {
                        const projectData = result.data();

                        projectList.push(
                            {
                                id: result.id,
                                name: projectData.org_name,
                                new: doc.data().new
                            }
                        )
                    })
                    .catch(error => {

                    });
                })
            })
            .catch(error => {

            });

            commit("setProjects", projectList);
        },
        /**
         * Get the details of a project based on a given  project uuid
         * @param commit: The vuex commit object 
         * @param uuid: The uuid of the project
         */
        getProjectStack({ commit }, { uuid }) {

            firebase.firestore().collection('organisations')
                .doc(uuid)
                .get()
                .then(result => {
                    const project = {
                        name: result.data().org_name
                    }
                    commit("setActiveProject", result.id);
                    commit("setProjectStack", project);
                })
                .catch(error => {

                });
        },
        getProjectInvitations({ commit }) {
            
            let invitations = [];

            firebase.firestore().collection('org_membership')
                .where("user_id", "==", firebase.auth().currentUser.uid)
                .where("new", "==", true)
                .get()
                .then(result => {
                    result.forEach(doc => {
                        firebase.firestore().collection('organisations').doc(doc.data().org_id).get()
                        .then(result => {
                            const projectData = result.data();

                            invitations.push(
                                {
                                    id: result.id,
                                    name: projectData.org_name
                                }
                            )
                        })
                        .catch(error => {

                        });
                    })
                })
                .catch(error => {

                });

            commit("setInvitations", invitations);
        },
        async clearInvitation({ commit }, { uuid }) {
            commit("setInvitations", []);
            firebase.firestore().collection('org_membership')
                .where("user_id", "==", firebase.auth().currentUser.uid)
                .where("org_id", "==", uuid)
                .get()
                .then(result => {
                    result.forEach(doc => {
                        firebase.firestore().collection('org_membership')
                            .doc(doc.id)
                            .update({
                                new: false
                            })
                            .then(result => {

                            })
                            .catch(error => {
        
                            });
                    })
                    
                })
                .catch(error => {

                });
        }
    }
}

export default ProjectStore;