import axios from "axios";

const apiRoot = "https://api.emailjs.com/api/v1.0/email";

export const API_ENDPOINTS = { 
  send: {
      api: `${apiRoot}/send`
  }
}

export async function postAPI(key, content) {
    const apiEndpoint = API_ENDPOINTS[key].api
    return await axios.post(apiEndpoint, content);
}