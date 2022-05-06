/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
import axios from "axios"
import { removeItem } from "./localStorageControl";

const base_url = process.env.REACT_APP_URL;

const sendRequest = async (route, request) => {
  let response;
  try {
    response = await axios(base_url + route, request)
    return response;
  } catch (error) {
    if (error.response !== undefined) {
      if ((window.location.pathname.indexOf('/session') === -1) && (error.response.status === 401 || error.response.status === 403)) {
        //Este campo es para saber si la sesion expiro
        removeItem('westUser')
        removeItem('westToken')
        window.location.reload()
        return { success: false, error: "refresh token" };
      }
    }
    return { success: false, error };
  }
};

export {
  sendRequest,
};
