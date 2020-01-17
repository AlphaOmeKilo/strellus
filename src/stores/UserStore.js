import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { getAPI } from "@/stores/helpers/apiHelpers.js";

const WorkspaceStore = {
  namespaced: true,
  state: {
    profileImageUrl: null
  },

  mutations: {
    setProfileImageUrl(state, payload) {
      state.profileImageUrl = payload;
    },
  },
  actions: {
    updateProfileImage({commit}, {url}) {
      firebase.firestore().collection('profiles').where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(result => {
        result.forEach(doc => {
            firebase.firestore().collection('profiles')
            .doc(doc.id)
            .update({
                profile_image_url: url
            })
            .then(result => {
                commit("setProfileImageUrl", url);
            })
            .catch(error => {

            });
        });
      })
      .catch(error => {

      });
    },
    /**
     * Get the profile image of the user if it exists
     * @param commit: The vuex commit object
     */
    async getProfileImage({ commit }) {
      const profileImageUrl = await getAPI("user","profile-image");
      commit("setProfileImageUrl", profileImageUrl.data[0].profile_image);
    },
  }
}

export default WorkspaceStore;