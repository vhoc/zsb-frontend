import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TableAdmin from "./TableAdmin"
import Rol from "./Rol"
import { List } from '@mui/material/';
import EditAdmin from './EditAdmin';
import EditRol from './EditRol';
import { getRoles, getAdmins } from '../../services/admin';
import { useGlobalState } from '../../utility/useGlobalState';


function AdminPanel(props) {

    const { control } = useGlobalState()

    const [roles, setRoles] = useState([])
    const [users, setUsers] = useState([])
    const [loadingAdmin, setLoadingAdmin] = useState(false)

    useEffect(() => {
        if (props.title === 'Roles') {
            getRoles().then((res) => {
                if (res.success !== false) {
                    //console.log(res.data)
                    setRoles(res.data)
                    // DUMMY DATA
                    // setRoles([
                    //     {
                    //         groupId: 1,
                    //         groupName: 'Super Admin',
                    //         totalUsers: 77,
                    //     },
                    //     {
                    //         groupId: 2,
                    //         groupName: 'Prueba',
                    //         totalUsers: 1,
                    //     },
                    //     {
                    //         groupId: 3,
                    //         groupName: 'Depto de Ventas',
                    //         totalUsers: 3,
                    //     },
                    //     {
                    //         groupId: 5,
                    //         groupName: 'Ingenierias',
                    //         totalUsers: 1,
                    //     },
                    // ])
                }
            })
        }
        if (props.title === 'Administradores') {
            setLoadingAdmin(true)
            getAdmins().then((res) => {
                if (res.success !== false) {
                    setUsers(res.data)
                }
                setLoadingAdmin(false)
            })
        }
    }, [props.title, control])

    return (
        <div className="d-flex flex-column justify-content-start p-3">
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="body1" >
                    {props.title}
                </Typography>
                {props.title === "Administradores" ?
                    <EditAdmin type='create' variant="create" btn={props.btn} />
                    :
                    <EditRol variant="create" btn={props.btn} />}
            </div>
            <div className="col-12 p-0 pt-3 basic-text text-left">
                <Typography align="left" alignContent="left" variant="body2" gutterBottom>
                    {props.text}
                </Typography>
            </div>
            {props.title === "Administradores" ?
                <div className="col-12 pt-3 pl-0">
                    {<TableAdmin loading={loadingAdmin} data={users} />}
                </div>
                :
                <List className="col-12 p-0">
                    {roles.map((e) => {
                        return <Rol key={e.groupId} id={e.groupId} name={e.groupName} users={e.totalUsers + " Usuarios"} />
                    })}
                </List>
            }
        </div>
    );
}

export default AdminPanel;