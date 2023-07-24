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
const getUsersWithAccess = () => {
    return [
        {
            id: 1,
            userName: 'Juan Magaña Ornelas',
            email: 'jmagana@empresa1.com',
            status: 1,
        },
        {
            id: 2,
            userName: 'Maria Fernanda Gomez Espino',
            email: 'mgomez@empresa1.com',
            status: 1,
        },
        {
            id: 3,
            userName: 'Maria Fernanda Gomez Espino',
            email: 'mgomez@empresa1.com',
            status: 0,
        }
    ]
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
    sendInvitation
}