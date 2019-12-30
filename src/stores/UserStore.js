import firebase from 'firebase';

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
    getProfileImage({ commit }) {
      firebase.firestore().collection('profiles').where("user_id", "==", firebase.auth().currentUser.uid)
        .get()
        .then(result => {
          if(result.docs[0]) {
            firebase.firestore().collection('profiles').doc(result.docs[0].id)
            .get()
            .then(profile => {
              const profileImageUrl = profile.data().profile_image_url;
              commit("setProfileImageUrl", profileImageUrl);
            })
            .catch(error => {

            });

          }
        })
        .catch(error => {

        });
    },
  }
}

export default WorkspaceStore;