import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";

const apiRoot = "https://europe-west2-strellus-68be0.cloudfunctions.net";

export const API_ENDPOINTS = { 
  workspaces: {
      api: `${apiRoot}/workspaces/`
  },
  notifications: {
      api: `${apiRoot}/notifications/`
  },
  user: {
      api: `${apiRoot}/user/`
  },
  invitations: {
    api: `${apiRoot}/invitations/`
  }
}
async function setUserToken() {
    let userToken;
    await firebase.auth().currentUser.getIdToken(true)
    .then(function (token) {
        userToken = token;
    })
    .catch(function (err) {
        console.error(err);
    });

    axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + userToken;

}

export async function putAPI(key, path, content) {
    await setUserToken();
    const apiEndpoint = path ? API_ENDPOINTS[key].api + path : API_ENDPOINTS[key].api;
    return await axios.put(apiEndpoint, { data: content });
}

export async function postAPI(key, path, content) {
    await setUserToken();
    const apiEndpoint = path ? API_ENDPOINTS[key].api + path : API_ENDPOINTS[key].api;
    return await axios.post(apiEndpoint, { data: content });
}

export async function getAPI(key, path) {
    await setUserToken();
    const apiEndpoint = path ? API_ENDPOINTS[key].api + path : API_ENDPOINTS[key].api;
    return await axios.get(apiEndpoint);
}