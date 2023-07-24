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
                    //setRoles(res.data)
                    // DUMMY DATA
                    setRoles([
                        {
                            groupId: 1,
                            groupName: 'Super Admin',
                            totalUsers: 77,
                        },
                        {
                            groupId: 2,
                            groupName: 'Prueba',
                            totalUsers: 1,
                        },
                        {
                            groupId: 3,
                            groupName: 'Depto de Ventas',
                            totalUsers: 3,
                        },
                        {
                            groupId: 5,
                            groupName: 'Ingenierias',
                            totalUsers: 1,
                        },
                    ])
                }
            })
        }
        if (props.title === 'Administradores') {
            setLoadingAdmin(true)
            getAdmins().then((res) => {
                if (res.success !== false) {
                    //console.log(res.data)
                    // setUsers(res.data)
                    // DUMMY DATA
                    setUsers([
                        {
                            "id": "15e1fd91-3956-4b15-a362-f1ecd9fd1552",
                            "userName": "Victor Olvera",
                            "email": "vhocar@gmail.com",
                            "status": 1,
                            "groups": [
                                {
                                    "groupId": 1,
                                    "groupName": "Super Admin",
                                    "totalUsers": 77
                                }
                            ]
                        },
                        {
                            "id": "3dde82c6-fc45-4241-b94f-e27f43a91e82",
                            "userName": "super-admin",
                            "email": "dblanco@westtelco.com.mx",
                            "status": 1,
                            "groups": [
                                {
                                    "groupId": 1,
                                    "groupName": "Super Admin",
                                    "totalUsers": 77
                                }
                            ]
                        },
                        {
                            "id": "5d96ee93-8227-4727-a80e-97305026673f",
                            "userName": "Andres Reaza",
                            "email": "andres@uxneighbor.com",
                            "status": 1,
                            "groups": [
                                {
                                    "groupId": 5,
                                    "groupName": "Ingenierias",
                                    "totalUsers": 1
                                }
                            ]
                        },
                        {
                            "id": "8e445865-a24d-4543-a6c6-9443d048cdb9",
                            "userName": "Admin",
                            "email": "AdminZoom@email.com",
                            "status": 1,
                            "groups": [
                                {
                                    "groupId": 1,
                                    "groupName": "Super Admin",
                                    "totalUsers": 77
                                }
                            ]
                        },
                        {
                            "id": "99f93ef4-f132-4483-a89a-3d5a0b87e218",
                            "userName": "super-admin",
                            "email": "maguilera@westtelco.com.mx",
                            "status": 1,
                            "groups": [
                                {
                                    "groupId": 1,
                                    "groupName": "Super Admin",
                                    "totalUsers": 77
                                }
                            ]
                        },
                        {
                            "id": "bc4a5b87-761c-4f97-ad48-e3b8f0dfb781",
                            "userName": "super-admin",
                            "email": "victor@uxneighbor.com",
                            "status": 1,
                            "groups": null
                        }
                    ])
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