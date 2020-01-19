import { getAPI, postAPI } from "@/stores/helpers/apiHelpers";

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
    async updateProfileImage({ commit }, { url }) {
      const imageObj = await postAPI("user","profile-image", {
        profile_image_url: url
      });
      commit("setProfileImageUrl", imageObj.data.profile_image_url);
    },
    /**
     * Get the profile image of the user if it exists
     * @param commit: The vuex commit object
     */
    async getProfileImage({ commit }) {
      const profileImageUrl = await getAPI("user","profile-image");
      if(profileImageUrl.data[0] && profileImageUrl.data[0].profile_image) {
        commit("setProfileImageUrl", profileImageUrl.data[0].profile_image)
      } else {
        commit("setProfileImageUrl", require('@/assets/default-user-icon.png'));
      }
    },
  }
}

export default WorkspaceStore;