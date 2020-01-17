import { getAPI } from "@/stores/helpers/apiHelpers.js";

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
        },
        clearNotifications(state) {
            state.notifications = [];
        },
        updateNotification(state, payload) {
            state.notifications.forEach(notification => {
                if(notification.id === payload.id) notification.avatar = payload.avatar;
            })
        }
    },
    actions: {
        async updateNotifications({ commit }) {
            commit("clearNotifications");
            const notifications = await getAPI("notifications");
            commit("setNotifications", notifications.data);
        },
        clearNotifications({commit}) {
            const notificationList = [];
            commit("setNotifications", notificationList);
        }
    }
}; 

const getWorkspaceName = (id, rootGetters) => { 
    return rootGetters["WorkspaceStore/getWorkspaceNameById"](id);
}

const getNotificationUser = (notification_id, user_id, dispatch, commit) => {
    return dispatch('UserStore/getProfileImage', user_id, { root: true } ).then(result => {
        commit("updateNotification", { id: notification_id, avatar: result});
    })
}

export default NotificationStore;