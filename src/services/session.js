import { sendRequest } from "../utility/utility";
import { getItem } from "../utility/localStorageControl";

const base_url = process.env.REACT_APP_URL;

const tokenName = 'westToken'

const getSessionById = async (id) => {
    let route = "conference/" + id;

    const token = getItem(tokenName);
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return await sendRequest(route, request);
}

const postInvitation = async (id, emails, password) => {
    let route = "conference/" + id + "/conferenceinvitation";

    const token = getItem(tokenName);
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            emails,
            password
        }
    };
    return await sendRequest(route, request);
}

const postValidation = async (otp, password) => {
    let route = "conference/passwordvalidation";

    const token = getItem(tokenName);
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            otp,
            password
        }
    };
    return await sendRequest(route, request);
}

const getChatFile = async (id) => {
    let route = base_url + 'file/' + id + '/chat_file.TXT';

    const token = getItem(tokenName);
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "text/plain"
        }
    };
    return await fetch(route, request);
}

export {
    getSessionById,
    postInvitation,
    postValidation,
    getChatFile
}