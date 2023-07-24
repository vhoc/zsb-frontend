import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material//DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Typography } from '@mui/material';
import { useGlobalState } from '../../utility/useGlobalState';
import { useFormik } from 'formik';
import { FormHelperText } from '@mui/material';
import Alert from '@mui/material/Alert'
import ModalALert from '../Alert'
import * as yup from 'yup';

import { getRoles, postAdmin, putAdmin, getAdminById } from '../../services/admin'

const validationSchema = yup.object({
    name: yup
        .string('Nombre')
        .required('Se requiere ingresar nombre'),
    email: yup
        .string('Email')
        .email('Ingresa un email valido')
        .required('Se requiere email'),
    rol: yup
        .string('Rol')
        .required('Se requiere asignar un rol'),
});

export default function EditAdmin(props) {

    const { controlData } = useGlobalState()

    const formik = useFormik({
        initialValues: {
            email: props.email,
            name: props.name,
            rol: props.rol
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            setAlert({ severity: 'success', text: '', open: false })
            if (props.variant === 'create') {
                postAdmin(values.name, values.email, values.rol).then((res) => {
                    if (res.success !== false) {
                        controlData('success', 'Se ha creado un nuevo usuario exitosamente')
                        setOpen(false)
                        resetForm()
                    }
                    else {
                        if (res.error.response.status === 400) {
                            setAlert({ severity: 'error', text: res.error.response.data.errors[0], open: true })
                        }
                        else {
                            setAlert({ severity: 'error', text: 'Ocurrió un error', open: true })
                        }
                    }
                })
            }
            else {
                putAdmin(props.id, values.name, values.email, values.rol).then((res) => {
                    if (res.success !== false) {
                        if (initRol !== values.rol) {
                            setModalAlert({ open: true, text: 'Se ha enviado una notificación al usuario para confirmar su cambio de rol.' })
                        }
                        else {
                            controlData('success', 'El usuario ha sido modificado exitosamente')
                            setOpen(false)
                        }
                        resetForm()
                    }
                })
            }
        },
    });


    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState([{ name: '' }])
    const [alert, setAlert] = useState({ severity: 'success', text: '', open: false })
    const [modalAlert, setModalAlert] = useState({ open: false, text: '' })
    const [initRol, setInitRol] = useState(props.rol)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        formik.resetForm()
        setAlert({ severity: 'success', text: '', open: false })
        setOpen(false);
    };

    const selectChange = (e) => {
        formik.setFieldValue('rol', e.target.value)
    }

    const confirmChange = () => {
        setModalAlert({ open: false, text: "" })
        controlData('success', 'El usuario ha sido modificado exitosamente')
        setOpen(false)
    }

    useEffect(() => {
        if (open) {
            if (props.variant !== 'create') {
                getAdminById(props.id).then(res => {
                    if (res.success !== false) {
                        formik.setFieldValue('email', res.data.email)
                        formik.setFieldValue('name', props.name)
                        let getRol = ''
                        try {
                            getRol = res.data.groups[0].groupId === undefined || res.data.groups[0].groupId === null ? 0 : res.data.groups[0].groupId
                        }
                        catch (error) {
                            console.log(error)
                        }
                        formik.setFieldValue('rol', getRol)
                        setInitRol(getRol)
                    }
                })
            }
            getRoles().then(res => {
                if (res.success !== false) {
                    setRoles(res.data)
                }
            })
        }
    }, [open])

    return (
        <div>
            <ModalALert open={modalAlert.open} onConfirm={confirmChange} btnConfirm="OK" text={modalAlert.text} />
            {props.variant === 'create' ?
                <Button variant="contained" color="primary"
                    startIcon={<AddIcon />} onClick={handleClickOpen}
                >
                    {props.btn}
                </Button>
                :
                <MenuItem onClick={handleClickOpen}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Editar Rol </Typography>
                </MenuItem>
            }
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">
                        {props.variant === 'create' ?
                            'Nuevo Administrador' :
                            'Editar Administrador'
                        }
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {props.variant === 'create' ?
                                'Introduce los datos del usuario y selecciona un rol para enviar una invitación.' :
                                ''
                            }
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre"
                            variant="filled"
                            fullWidth
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            disabled
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Correo Electrónico"
                            variant="filled"
                            type="email"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            disabled
                        />
                        <FormControl
                            margin="dense"
                            fullWidth
                            variant="filled"
                        >
                            <InputLabel id="demo-simple-select-label">Seleccionar Rol del Usuario</InputLabel>
                            <Select
                                autoFocus
                                margin="dense"
                                id="rol"
                                label="Seleccionar Rol del Usuario"
                                variant="filled"
                                fullWidth
                                value={formik.values.rol}
                                onChange={selectChange}
                                error={formik.touched.rol && Boolean(formik.errors.rol)}
                            >
                                {roles.map(e => {
                                    return <MenuItem key={e.groupName} id={e.groupId} value={e.groupId}>{e.groupName}</MenuItem>
                                })}
                            </Select>
                            {formik.touched.rol && Boolean(formik.errors.rol) && <FormHelperText error>{formik.touched.rol && formik.errors.rol}</FormHelperText>}
                            {alert.open ? <Alert className='mt-3' icon={false} severity={alert.severity}>
                                {alert.text}
                            </Alert> : ''}
                        </FormControl>
                    </DialogContent>
                    <DialogActions className="p-3 pr-5">
                        <Button onClick={handleClose} color="error">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                            {props.variant === 'create' ?
                                'Invitar' :
                                'Guardar'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}