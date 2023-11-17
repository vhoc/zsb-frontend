import { sendRequest } from "../utility/utility";
import { getItem } from "../utility/localStorageControl";

const tokenName = 'westToken'

const getRoles = async () => {
    const route = "groupsessions";
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

const postRole = async ({ name }) => {
    const route = "groupsessions";
    const token = getItem(tokenName);
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            name
        }
    };
    return await sendRequest(route, request);
}

const putRole = async (id, groupName) => {
    const route = "groupsessions/" + id;
    const token = getItem(tokenName);
    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            groupName
        }
    };
    return await sendRequest(route, request);
}

const deleteRole = async (id) => {
    const route = "groupsessions/" + id;
    const token = getItem(tokenName);
    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return await sendRequest(route, request);
}


const getAdmins = async (rowspp, page, userRequest) => {
    let route = "users";
    if (rowspp !== undefined && page !== undefined) {
        route = 'users?PageNumber=' + page + '&PageSize=' + rowspp + '&paginated=true'
    }
    else {
        route = 'users?paginated=false'
    }
    if (userRequest !== undefined) {
        route = route + "&userRequest=" + userRequest
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
// These users are the ones selected from all the zoom users who will have access.
const getUsersWithAccess = async () => {
    let route = "users/users_zoom";

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

const deleteUsersWithAccess = async (usersList) => {
    let route = "zoomusers/paginated";
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

const getUsers = async (rowspp, page, userRequest) => {
    let route = "zoomusers/paginated";
    if (rowspp !== undefined && page !== undefined) {
        route = 'zoomusers/paginated?PageNumber=' + page + '&PageSize=' + rowspp + '&paginated=true'
    }
    else {
        route = 'zoomusers/paginated?paginated=false'
    }
    if (userRequest !== undefined) {
        route = route + "&userRequest=" + userRequest
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

const getUsersNotRegister = async (rowspp, page, userRequest) => {
    let route = "zoomusers/get_users_not_regist";
    // if (rowspp !== undefined && page !== undefined) {
    //     route = 'zoomusers/paginated?PageNumber=' + page + '&PageSize=' + rowspp + '&paginated=true'
    // }
    // else {
    //     route = 'zoomusers/paginated?paginated=false'
    // }
    // if (userRequest !== undefined) {
    //     route = route + "&userRequest=" + userRequest
    // }
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

const putUserBackup = async (id) => {
    let route = "zoomusers/backup_zoom_user/" + id;

    const token = getItem(tokenName);
    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return await sendRequest(route, request);
}
const putAllUsersBackup = async (usersId, status) => {
    let route = "zoomusers/backup_zoom_user";

    const token = getItem(tokenName);
    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            list_ids: usersId,
            status: status
        }
    };
    return await sendRequest(route, request);
}

const getAdminById = async (id) => {
    let route = "users/" + id;
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

const getUsersbyRol = async (id) => {
    let route = "groupsessions/" + id + "/zoomusers";
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

const getUsersOutRol = async (id) => {
    let route = "groupsessions/" + id + "/zoomusers?out=true";
    if (id === undefined) {
        route = "user/usersoutgroup"
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

const postAdmin = async (name, email, groupId) => {
    const token = getItem(tokenName);
    const route = "auth/adduser";
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            name,
            email,
            groupId
        }
    };
    return await sendRequest(route, request);
}

const putAdmin = async (id, userName, userEmail, groupId) => {
    const token = getItem(tokenName);
    const route = "users/" + id;
    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            userName,
            userEmail,
            groupId
        }
    };
    return await sendRequest(route, request);
}

const deleteAdmin = async (id) => {
    const route = "users/" + id;
    const token = getItem(tokenName);
    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
    };
    return await sendRequest(route, request);
}

const deleteArrayUsers = async (ids) => {

    const route = "users/delete_array";
    const token = getItem(tokenName);
    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data:{"list_users_ids":ids ? ids : []}
    };
    return await sendRequest(route, request);
}

const postZoomUser = async (id, password) => {
    const token = getItem(tokenName);
    const route = "auth/register_zoom_user";
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data:
        {
            id: id,
            password: password
        }

    };
    return await sendRequest(route, request);
}

const postUsersGroup = async (id, array) => {
    const route = "groupsessions/" + id + "/zoomusers"
    const token = getItem(tokenName);
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            groupId: id,
            usersId: array
        }
    };
    return await sendRequest(route, request);
}

const deleteUsersGroup = async (id, array) => {
    const route = "groupsessions/" + id + "/zoomusers"
    const token = getItem(tokenName);
    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        data: {
            groupId: id,
            usersId: array
        }
    };
    return await sendRequest(route, request);
}

const sendInvitation = async (id) => {
    const token = getItem(tokenName);
    const route = "auth/resendinvitation/" + id;
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    };
    return await sendRequest(route, request);
}

export {
    putAdmin,
    deleteAdmin,
    getRoles,
    postRole,
    putRole,
    deleteRole,
    getUsers,
    getAdmins,
    getUsersWithAccess,
    getAdminById,
    getUsersbyRol,
    getUsersOutRol,
    postAdmin,
    postUsersGroup,
    deleteUsersGroup,
    sendInvitation,
    putUserBackup,
    putAllUsersBackup,
    postZoomUser,
    deleteArrayUsers,
    getUsersNotRegister
}