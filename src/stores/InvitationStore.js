import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const InvitationStore = {
    namespaced: true,
    state: {
        invitations: []
    },
    getters: {

    },
    mutations: {
        setInvitations(state, payload) {
            state.invitations = payload;
        }
    },
    actions: {
        inviteUserToWorkspace({ commit }, { email, workspace_id}) {
            firebase.firestore().collection('workspace_membership').add({
                admin: false,
                new: true,
                private: false,
                user_id: email,
                workspace_id: workspace_id
              })
              .then(function(doc) {
                console.log("invite sent!");
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
        },
        async getWorkspaceInvitations({ commit }) {
            
            let invitations = [];

            firebase.firestore().collection('workspace_membership')
                .where("user_id", "==", firebase.auth().currentUser.uid)
                .where("new", "==", true)
                .get()
                .then(result => {
                    result.forEach(doc => {
                        firebase.firestore().collection('workspaces').doc(doc.data().workspace_id).get()
                        .then(result => {
                            const workspaceData = result.data();

                            invitations.push(
                                {
                                    id: result.id,
                                    name: workspaceData.name
                                }
                            )
                        })
                        .catch(error => {

                        });
                    })
                })
                .catch(error => {

                });

            firebase.firestore().collection('workspace_membership')
                .where("user_id", "==", firebase.auth().currentUser.email)
                .get()
                .then(result => {
                    result.forEach(doc => {
                        firebase.firestore().collection('workspace_membership')
                            .doc(doc.id)
                            .update({
                                "user_id": firebase.auth().currentUser.uid
                            })
                            .then(() => {
                                firebase.firestore().collection('workspaces').doc(doc.data().workspace_id).get()
                                .then(result => {
                                    const workspaceData = result.data();

                                    invitations.push(
                                        {
                                            id: result.id,
                                            name: workspaceData.name
                                        }
                                    )
                                })
                                .catch(error => {

                                });
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                })
                .catch(error => {

                });

                commit("setInvitations", invitations);
            
        },
        async clearInvitation({ commit }, { uuid }) {
            commit("setInvitations", []);
            firebase.firestore().collection('workspace_membership')
                .where("user_id", "==", firebase.auth().currentUser.uid)
                .where("workspace_id", "==", uuid)
                .get()
                .then(result => {
                    result.forEach(doc => {
                        firebase.firestore().collection('workspace_membership')
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

export default InvitationStore;