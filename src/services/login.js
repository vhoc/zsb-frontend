import { sendRequest } from "../utility/utility";
import { getItem } from "../utility/localStorageControl";

const tokenName = 'westToken'

const postLogin = async (email, password) => {
    const route = "auth/login";
    const request = {
        method: 'post',
        headers: {
            "method": "POST",
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        data: {
            email,
            password
        }
    };
    return await sendRequest(route, request);
}

const postForgotPass = async (email) => {
    const route = "auth/sendpasswordresetcode";
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        data: {
            email
        }
    };
    return await sendRequest(route, request);
}

const changePass = async (id, currentPass, newPass) => {
    const token = getItem(tokenName);
    const route = "users/changepassword";
    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            id,
            currentPass,
            newPass
        }
    };
    return await sendRequest(route, request);
}

const resetPass = async (email, otp, newPassword) => {
    const route = "auth/resetpassword";
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        data: {
            email,
            otp,
            newPassword
        }
    };
    return await sendRequest(route, request);
}

export {
    postLogin,
    postForgotPass,
    changePass,
    resetPass
}