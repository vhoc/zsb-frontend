import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ListItemIcon } from '@mui/material';
import { Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { ListItemButton } from '@mui/material';
import { ListItemText } from '@mui/material';
import { useGlobalState } from '../../utility/useGlobalState';
import { Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { postInvitation } from '../../services/session';
import * as yup from 'yup';

const validationSchema = yup.object({
    password: yup
        .string('Password')
        .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=(?:.*[.,'=+&%$#!<>@$?*"/¡\-_]){1})/, 'La contraseña no cumple con los requerimientos.')
        .required('La contraseña introducida no cumple con los requerimientos.'),
});

export default function EditAdmin(props) {

    const { controlData } = useGlobalState()

    const formik = useFormik({
        initialValues: {
            email: [],
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm, setErrors }) => {
            setErrors({ email: '' })
            let error = false
            var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            values.email.map(e => {
                if (!pattern.test(e)) {
                    return error = true
                }
                return ''
            })
            if (error) {
                setErrors({ email: 'Hay uno o mas emails sin formato valido, por favor verifica las entradas.' })
            }
            else if (values.email.length === 0) {
                setErrors({ email: 'Debes añadir al menos un correo' })
            }
            else {
                postInvitation(props.id, values.email, values.password).then(res => {
                    if (res.success !== false) {
                        controlData('success', 'La sesión se ha compartido con éxito')
                    }
                    else {
                        controlData('error', 'Ocurrió un error')
                    }
                })
                resetForm()
                setOpen(false)
            }

        },
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        formik.resetForm()
        setOpen(false);
    };

    return (
        <div>
            <ListItemButton onClick={handleClickOpen} className="list"  >
                <ListItemIcon> <ShareIcon /></ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Typography type="body2">Compartir sesión</Typography>}
                />
            </ListItemButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">Compartir sesión</DialogTitle>
                    <DialogContent>
                        <DialogContentText className='pt-3 pb-3'>
                            Introduce el correo electrónico de las personas con las que quieras compartir esta sesión. Pulsa ENTER para agregar.
                        </DialogContentText>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={data.map(option => option.title)}
                            ChipProps={{ color: 'primary', size: 'small' }}
                            fullWidth
                            freeSolo
                            value={formik.values.email}
                            onChange={(element, values) => formik.setFieldValue('email', values)}
                            renderInput={params => <TextField
                                hiddenLabel
                                variant='filled'
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                label="Correo electrónico"
                                margin="dense"
                                size='small'
                                {...params} />}
                        />
                        <DialogContentText className='pt-3 pb-3'>
                            Crea una contraseña para proteger la sesión.
                        </DialogContentText>
                        <div className="row">
                            <div className="col">
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="Contraseña"
                                    placeholder="Introduce una contraseña"
                                    variant="filled"
                                    fullWidth
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </div>
                            <div className='col-5 sub-text-form'>
                                <li>
                                    Introduce al menos 1 mayúscula, 1 número y un caractér especial.

                                </li>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions className="p-3 pr-5">
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                            Confirmar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

const data = [
    { title: "", year: 0 },
];