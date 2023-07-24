import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditUser from './EditUser';
import { deleteAdmin, sendInvitation } from '../../services/admin';
import Alert from '../Alert'
import { useGlobalState } from '../../utility/useGlobalState';

export default function MenuUserWithAccess(props) {

    const { controlData } = useGlobalState()

    const [anchorEl, setAnchorEl] = useState(null);
    const [alertDelete, setAlertDelete] = useState(false)
    const [alertSend, setAlertSend] = useState(false)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteUser = () => {
        deleteAdmin(props.id).then((res) => {
            if (res.success !== false) {
                controlData('success', 'El usuario se ha eliminado exitosamente')
            }
            else {
                controlData('error', 'Error')
            }
            setAlertDelete(false)
        })
    }

    const sendMessage = () => {
        sendInvitation(props.id).then(res => {
            if (res.success !== false) {
                controlData('success', 'Se envió la invitación')
            }
            else {
                controlData('error', 'Error')
            }
        })
        setAlertSend(false)
    }

    return (
        <div>
            <Alert open={alertDelete} onCancel={() => setAlertDelete(false)} onConfirm={deleteUser} btnCancel="Cancelar" btnConfirm="Eliminar" text={`Estas seguro que deseas eliminar el usuario "${props.email}"?`} />
            <Alert open={alertSend} onCancel={() => setAlertSend(false)} onConfirm={sendMessage} btnCancel="Cancelar" btnConfirm="Confirmar" text={`Deseas reenviar una nueva invitación para activar la cuenta de "${props.name}"? Esto hará que la invitación anterior sea inválida.`} />
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                
                {props.status === 0 ?
                    <MenuItem onClick={() => setAlertSend(true)}>
                        <ListItemIcon>
                            <CachedIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Reenviar Invitación</Typography>
                    </MenuItem> : ''
                }
                <MenuItem onClick={() => setAlertDelete(true)}>
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Eliminar</Typography>
                </MenuItem>

            </Menu>
        </div>
    );
}