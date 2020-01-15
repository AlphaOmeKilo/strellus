import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";

const apiRoot = "https://europe-west2-strellus-68be0.cloudfunctions.net";

export const API_ENDPOINTS = { 
  workspaces: {
      api: `${apiRoot}/getWorkspaces`
  }   
}

export async function getAPI(key) {
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

    const apiEndpoint = API_ENDPOINTS[key].api;
    return await axios.get(apiEndpoint);
}