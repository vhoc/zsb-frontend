import { sendRequest } from "../utility/utility";
import { getItem } from "../utility/localStorageControl";

const tokenName = 'westToken'

const getSettings = async () => {
    const route = "configuration";
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

const searchUsersSettings = async (search, page, rows) => {
    let route = "users/finduser?paginated=true";
    if(search!==undefined){
        route = "users/finduser?user=" + search + "&paginated=true";
    }
    if (page !== undefined) {
        route = route + "&PageNumber=" + page
    }
    if (rows !== undefined) {
        route = route + "&PageSize=" + rows
    }
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


const requestSettings = async ({ method, periods, startTime, endTime, timeZone, deleteSessions }) => {
    let route = "configuration";
    const token = getItem(tokenName);
    const request = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            periods,
            startTime,
            endTime,
            timeZone,
            deleteSessions
        }
    };
    return await sendRequest(route, request);
}

export {
    getSettings,
    requestSettings,
    searchUsersSettings
}