const ProjectStore = {
    namespaced: true,
    state: {
        activeProject: 0,
        projects: [],
        projectStack: {}
    },
    getters: {

    },
    mutations: {
        setProjects(state, payload) {
            state.projects = payload;
        },
        setProjectStack(state, payload) {
            state.projectStack = payload;
        },
        setActiveProject(state, payload) {
            state.activeProject = payload;
        }
    },
    actions: {
        getProjects({ commit }) {
            const projectList = [{
                id: 1,
                name: "Strellus",
                icon: "strellus"
            }];

            commit("setProjects", projectList);
        },
        getProjectStack({ commit }, { uuid }) {
            const projectStack = {
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
        }
    }
}

export default ProjectStore;