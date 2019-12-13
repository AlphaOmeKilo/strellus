const NotificationStore = {
    namespaced: true,
    state: {
        notifications: [
            
        ]
    },
    getters: {

    },
    mutations: {
        setNotifications(state, payload) {
            state.notifications = payload;
        }
    },
    actions: {
        updateNotifications({ commit }) {
            const notificationList = [{
                id: 1,
                read: false,
                workspace: "Strellus",
                doctype: "Invision",
                chain: "Design",
                icon_class: "default",
                message: "Kev S updated the Link",
                timestamp: "4:32pm"
            },{
                id: 2,
                read: false,
                workspace: "Strellus",
                doctype: "Github",
                chain: "repo",
                icon_class: "default",
                message: "Alex O created the link",
                timestamp: "6:22pm 20/11/2019"
            },{
                id: 3,
                read: false,
                workspace: "Strellus",
                doctype: "Google",
                chain: "logins",
                icon_class: "default",
                message: "Alex O created the link",
                timestamp: "6:22pm 20/11/2019"
            }];

            commit("setNotifications", notificationList);
        },
        clearNotifications({commit}) {
            const notificationList = [];
            commit("setNotifications", notificationList);
        }
    }
}; 

export default NotificationStore;