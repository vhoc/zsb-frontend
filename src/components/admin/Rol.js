import React, { useState } from 'react';
import { ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Divider from '@mui/material/Divider';
import EditRol from './EditRol'
import Alert from '../Alert'
import { deleteRole } from '../../services/admin';
import { useGlobalState } from '../../utility/useGlobalState';


function Rol(props) {

    const { controlData } = useGlobalState()
    
    const [alert, setAlert] = useState(false)

    const cancel = () => {
        setAlert(false)
    }

    const confirm = () => {
        deleteRole(props.id).then((e) => {
            if (e.success !== false) {
                controlData('success', 'El rol se ha eliminado exitosamente')
            }
            else {
                controlData('error', 'Error')
            }
            setAlert(false)
        })
    }

    return (<div>
        <ListItem key={props.name} className='list-rol col-12'>
            <Alert open={alert} onCancel={cancel} onConfirm={confirm} btnCancel="Cancelar" btnConfirm="Eliminar" text={`Estas seguro que deseas eliminar el rol "${props.name}"?`} />
            <ListItemText primary={props.name} secondary={props.users} />
            {/* {props.name === 'General' ? '' :
                <div className="d-flex justify-content-between align-items-center">
                    <IconButton onClick={() => setAlert(true)} aria-label="delete" color="primary">
                        <DeleteOutlineIcon color="disabled" />
                    </IconButton>
                    <EditRol variant='edit' id={props.id} name={props.name} />
                </div>
            } */}
            {props.name === 'SuperAdmin' ? '' :
                <div className="d-flex justify-content-between align-items-center">
                    <IconButton onClick={() => setAlert(true)} aria-label="delete" color="primary">
                        <DeleteOutlineIcon color="disabled" />
                    </IconButton>
                    <EditRol variant='edit' id={props.id} name={props.name} />
                </div>
            }
        </ListItem>
        <Divider />
    </div>
    );
}

export default Rol;