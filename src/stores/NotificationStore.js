import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Vue from 'vue';

const NotificationStore = {
    namespaced: true,
    state: {
        notifications: [
            
        ]
    },
    getters: {

    },
    mutations: {
        addNotification(state, payload) {
            Vue.set(state.notifications, state.notifications.length, payload);
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
        updateNotifications({ commit, dispatch, rootGetters }) {

            commit("clearNotifications");

            firebase.firestore().collection('workspace_membership').where("user_id", "==", firebase.auth().currentUser.uid).where("private", "==", false).get()
            .then(memberships => {
                memberships.forEach(membership => {
                    firebase.firestore().collection('notifications').where("workspace_id", "==", membership.data().workspace_id).get()
                    .then(notifications => {
                        // all notifications for the workspace
                        notifications.forEach(notification => {
                            const data = notification.data();

                            getNotificationUser(notification.id, data.user_id, dispatch, commit),

                            commit("addNotification", {
                                id: notification.id,
                                workspace: getWorkspaceName(data.workspace_id, rootGetters),
                                doctype: data.doctype,
                                chain: data.chain,
                                icon_class: data.icon_class,
                                message: data.message,
                                timestamp: data.timestamp
                            });
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
                });
                
            })
            .catch(error => {
                console.log(error);
            })

            
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