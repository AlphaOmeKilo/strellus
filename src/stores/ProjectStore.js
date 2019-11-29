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
            const projectList = [{
                id: 1,
                name: "Strellus",
                icon: "strellus"
            }];

            commit("setProjects", projectList);
        },
        /**
         * Get the details of a project based on a given  project uuid
         * @param commit: The vuex commit object 
         * @param uuid: The uuid of the project
         */
        getProjectStack({ commit }, { uuid }) {
            const name = uuid === 1 ? "Strellus" : "Other";
            const projectStack = {
                name: name,
                folders: [
                    {
                        name: 'folder 1'
                    },
                    {
                        name: 'folder 2'
                    }
                ]
            };

            commit("setActiveProject", uuid);
            commit("setProjectStack", projectStack);
        },
        getProjectInvitations({ commit }) {
            const currentUser = firebase.auth().currentUser;

            // currentUser.email

            // if user email has pending invites

            
            const newProject = {
                id: 2,
                name: "My New Workspace",
                icon: "workspace"
            }

            const invitations = [
                newProject
            ]

            commit("addProject", newProject);
            commit("setInvitations", invitations);
        },
        clearInvitations({ commit }) {
            const currentUser = firebase.auth().currentUser;

            commit("setInvitations", []);
        }
    }
}

export default ProjectStore;