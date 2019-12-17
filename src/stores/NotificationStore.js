import firebase from 'firebase';
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
        }
    },
    actions: {
        updateNotifications({ commit, rootGetters }) {

            commit("clearNotifications");

            firebase.firestore().collection('workspace_membership').where("user_id", "==", firebase.auth().currentUser.uid).where("private", "==", false).get()
            .then(memberships => {
                memberships.forEach(membership => {
                    firebase.firestore().collection('notifications').where("workspace_id", "==", membership.data().workspace_id).get()
                    .then(notifications => {
                        // all notifications for the workspace
                        notifications.forEach(notification => {
                            const data = notification.data();

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
    const workspace = rootGetters["WorkspaceStore/getWorkspaceNameById"](id);

    if(workspace[0]) {
        return workspace[0].name;
    }
}

export default NotificationStore;