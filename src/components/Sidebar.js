import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import BookSharpIcon from '@mui/icons-material/BookSharp';
import { ListItemButton } from '@mui/material';
import { getItem } from '../utility/localStorageControl';
import EngineeringIcon from '@mui/icons-material/Engineering';

const drawerWidth = "20%";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        zIndex: 0,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 0,
    },
    drawerContainer: {
        overflow: 'auto',
    }
}));

export default function Sidebar() {

    const history = useHistory();
    const location = useLocation()
    const [user, setUser] = useState({ userRol: '' })

    useEffect(() => {
        let user = getItem('westUser')
        if (user !== null || typeof user !== undefined) {
            setUser(user)
        }
    },[])


    const classes = useStyles();

    if (user.userRol === 'SuperAdministrador') {
        return (
            <div className="col-3 d-inline-block  side-bar">
                <div className={classes.drawerContainer}>
                    <List>
                        <div className="col-12 pl-4 d-flex justify-content-start side-title list">
                            RESPALDO
                        </div>
                        <ListItemButton selected={location.pathname === "/search"} className="list" onClick={() => history.push("/search")} >
                            <ListItemIcon> <EventSeatIcon /></ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography type="body2">Buscador de sesiones</Typography>}
                            />
                        </ListItemButton>

                    </List>
                    <div className="col-12 pl-4 d-flex justify-content-start side-title list">
                        OPCIONES DE RESPALDO
                    </div>
                    <List>
                        {/* CONFIGURACION */}
                        <ListItemButton selected={location.pathname === "/settings"} className="list" onClick={() => history.push("/settings")} >
                            <ListItemIcon> <SettingsIcon /></ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography type="body2">Configuración</Typography>}
                            />
                        </ListItemButton>
                        {/* ADMINISTRADORES */}
                        <ListItemButton className="list" selected={location.pathname === "/admin-panel"} onClick={() => history.push("/admin-panel")} >
                            <ListItemIcon> <EngineeringIcon /></ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography type="body2">Administradores</Typography>}
                            />
                        </ListItemButton>
                        {/* USUARIOS */}
                        <ListItemButton className="list" selected={location.pathname === "/users"} onClick={() => history.push("/users")} >
                            <ListItemIcon> <PeopleIcon /></ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography type="body2">Usuarios</Typography>}
                            />
                        </ListItemButton>
                        {/* REGISTRO DE ACTIVIDAD */}
                        <ListItemButton selected={location.pathname === "/logs"} className="list" onClick={() => history.push("/logs")} >
                            <ListItemIcon> <BookSharpIcon /></ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography type="body2">Registro de actividad</Typography>}
                            />
                        </ListItemButton>

                    </List>
                </div>
            </div>
        );
    }

    else {
        return (
            <div className="col-3 d-inline-block  side-bar">
                <div className={classes.drawerContainer}>
                    <List>
                        <div className="col-12 pl-4 d-flex justify-content-start side-title list">
                            RESPALDO
                        </div>
                        <ListItemButton selected={location.pathname === "/search"} className="list" onClick={() => history.push("/search")} >
                            <ListItemIcon> <EventSeatIcon /></ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography type="body2">Buscador de sesiones</Typography>}
                            />
                        </ListItemButton>

                    </List>
                </div>
            </div>
        );
    }

}