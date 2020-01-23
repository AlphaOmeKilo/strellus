import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { getAPI, putAPI } from "@/stores/helpers/apiHelpers";

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
        async inviteUserToWorkspace({ commit }, { email, workspace_id}) {
            const invitation = await putAPI("invitations", null, {
                email: email,
                workspace_id: workspace_id
              });
            console.log(invitation, 'invite sent');
        },
        async getWorkspaceInvitations({ commit }) {
            const invitations = await getAPI("invitations");
            commit("setInvitations", invitations.data);
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