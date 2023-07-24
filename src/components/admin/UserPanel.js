import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TableUsersWithAccess from "./TableUsersWithAccess"
import Rol from "./Rol"
import { List } from '@mui/material/';
import EditUser from './EditUser';
import { getUsersWithAccess } from '../../services/admin';
import { useGlobalState } from '../../utility/useGlobalState';


function UserPanel(props) {

    const { control } = useGlobalState()

    const [users, setUsers] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [toAdd, setToAdd] = useState([])

    useEffect(() => {        
        setLoadingUsers(true)
        setUsers( getUsersWithAccess() )
        setLoadingUsers(false)
    }, [props.title, control])

    return (
        <div className="d-flex flex-column justify-content-start p-3 ">
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="body1" >
                    {props.title}
                </Typography>
                <EditUser type='create' variant="create" btn={props.btn} />
            </div>
            <div className="col-12 p-0 pt-3 basic-text text-left">
                <Typography align="left" alignContent="left" variant="body2" gutterBottom>
                    {props.text}
                </Typography>
            </div>
                <div className="col-12 pt-3 pl-0">
                    {<TableUsersWithAccess setSelected={setToAdd} selected={toAdd} loading={loadingUsers} data={users} />}
                </div>
        </div>
    );
}

export default UserPanel;