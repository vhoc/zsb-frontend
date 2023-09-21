import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TableUsersWithAccess from "./TableUsersWithAccess"
import Rol from "./Rol"
import { List } from '@mui/material/';
import EditUser from './EditUser';
import { deleteArrayUsers, getUsersWithAccess } from '../../services/admin';
import { useGlobalState } from '../../utility/useGlobalState';
import AlertDialog from '../Alert';


function UserPanel(props) {

    const { controlData, control } = useGlobalState()

    const [users, setUsers] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [toAdd, setToAdd] = useState([])
    const [alertDelete, setAlertDelete] = useState(false)
    const [reload, setReload] = useState(1)

    const onDeleteUserList = () => {
        setAlertDelete(true)
    }

    const deleteUserList = () => {
        deleteArrayUsers(toAdd).then((res) => {
            if (res.success !== false) {
                setAlertDelete(false)
                controlData('success', 'Los usuarios se han eliminado exitosamente')
                setReload(reload + 1)
                setToAdd([])
            }
            else {
                controlData('error', 'Error')
            }
        })
    }

    useEffect(() => {
        setLoadingUsers(true)
        getUsersWithAccess().then((res) => {
            if (res.success !== false) {
                setUsers(res.data)
            }
        })
        setLoadingUsers(false)
    }, [props.title, control, reload])

    return (
        <div className="d-flex flex-column justify-content-start p-3 ">
            <AlertDialog open={alertDelete} onCancel={() => setAlertDelete(false)} onConfirm={deleteUserList} btnCancel="Cancelar" btnConfirm="Eliminar" text={`Estas seguro que deseas eliminar los usuarios?`} />
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
                {<TableUsersWithAccess setSelected={setToAdd} selected={toAdd} loading={loadingUsers} data={users} onDeleteUserList={onDeleteUserList} />}
            </div>
        </div>
    );
}

export default UserPanel;