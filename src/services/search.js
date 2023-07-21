import { sendRequest } from "../utility/utility";
import { getItem } from "../utility/localStorageControl";
import { Dayjs } from "dayjs";

const getSessionList = async (RankOfTime = 0, SpecificSearch = 0, StartDate = new Dayjs(), LimitDate = new Dayjs(), search = '') => {
    let route = "conference?"

    if (RankOfTime === 4) {
        route = route + "RankOfTime=" + RankOfTime + "&StartDate=" + StartDate + "&LimitDate=" + LimitDate
    }
    else {
        route = route + "RankOfTime=" + RankOfTime
    }
    switch (SpecificSearch) {
        case 1:
            route = route + "&SpecificSearch=" + SpecificSearch + "&UserName=" + search
            break
        case 2:
            route = route + "&SpecificSearch=" + SpecificSearch + "&ConferenceName=" + search
            break
        case 3:
            route = route + "&SpecificSearch=" + SpecificSearch + "&ConferenceId=" + search
            break
        default:
            route = route + "&SpecificSearch=" + SpecificSearch
            break
    }
    const token = getItem("westToken");
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
    getSessionList
}