import { sendRequest } from "../utility/utility";
import { getItem } from "../utility/localStorageControl";

const tokenName = 'westToken'

const getLogs = async (rowspp, page, name) => {
    let route = "conference";
    if (rowspp !== undefined && page !== undefined) {
        route = 'conference?PageNumber=' + page + '&PageSize=' + rowspp 
    }
    if (name !== undefined) {
        route = route + "&user=" + name
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

export {
    getLogs
}