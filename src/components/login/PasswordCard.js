import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import { ButtonBase } from '@mui/material';
import { changePass, resetPass } from '../../services/login';
import { useFormik } from 'formik';
import * as yup from 'yup';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PasswordCard(props) {

    const history = useHistory()
    let { id, otp } = useParams()
    const location = useLocation()
    const query = useQuery();

    const [alert, setAlert] = useState({ open: false, severity: '', text: '' })

    const validationSchema = yup.object({
        input: yup
            .string('Input')
            .nullable()
            .required('Campo requerido'),
        password: yup
            .string('Contraseña')
            .min(8, 'Tu contraseña debe ser mayor a 8 caracteres')
            .required('Se requiere ingresar contraseña')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=(?:.*[.,'=+&%$#!<>@$?*"/¡\-_]){1})/, 'La contraseña no cumple con los requerimientos.'),
        confirmPassword: yup
            .string('Confirmar Contraseña')
            .required('Se requiere confirmar contraseña')
            .oneOf([yup.ref('password'), null], 'La contraseña no coincide')
        ,
    });

    const formik = useFormik({
        initialValues: {
            input: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setAlert({ open: false, severity: '', text: '' })
            if (location.pathname.indexOf('/change-password') !== -1) {
                changePass(id, values.input, values.password).then(res => {
                    if (res.success !== false) {
                        setAlert({ open: true, severity: 'success', text: 'Cambio de contraseña exitoso.' })
                    }
                    else {
                        setAlert({ open: true, severity: 'error', text: 'Ocurrió un error.' })
                    }
                })
            }
            if (location.pathname.indexOf('/activate-account') !== -1) {
                resetPass(query.get("email"), otp, values.password).then(res => {
                    if (res.success !== false) {
                        setAlert({ open: true, severity: 'success', text: 'Registro exitoso, ahora puedes iniciar sesión.' })
                    }
                    else {
                        setAlert({ open: true, severity: 'error', text: 'Ocurrió un error.' })
                    }
                })
            }
            if (location.pathname.indexOf('/recover-account') !== -1) {
                resetPass(query.get("email"), otp, values.password).then(res => {
                    if (res.success !== false) {
                        setAlert({ open: true, severity: 'success', text: 'Se guardo la contraseña, ahora puedes iniciar sesión.' })
                    }
                    else {
                        setAlert({ open: true, severity: 'error', text: 'Ocurrió un error.' })
                    }
                })
            }

        },
    });

    useEffect(() => {
        if (location.pathname.indexOf('/change-password') === -1) {
            formik.setFieldValue('input', query.get("email"))
        }
        return () => {

        }
    }, [])

    return (
        <form id="login" onSubmit={formik.handleSubmit} className="card col-4 col-md-3 d-flex justify-content-center login-card mt-5 mb-4 pt-4 pb-5 px-4">
            <Typography variant='body1'>
                {location.pathname.indexOf('/activate-account') !== -1 ? "Crea una contraseña para activar tu cuenta" :
                    location.pathname.indexOf('/recover-account') !== -1 ? "Crea una contraseña para recuperar tu cuenta" :
                        "Cambiar contraseña"
                }
            </Typography>
            <br />
            {location.pathname.indexOf("/change-password") !== -1 ?
                <TextField
                    id="input"
                    name="input"
                    label="Contraseña actual"
                    type='password'
                    value={formik.values.input}
                    onChange={formik.handleChange}
                    error={formik.touched.input && Boolean(formik.errors.input)}
                    helperText={formik.touched.input && formik.errors.input}
                /> :
                <TextField
                    id="input"
                    name="input"
                    label="Email"
                    value={formik.values.input}
                    onChange={formik.handleChange}
                    error={formik.touched.input && Boolean(formik.errors.input)}
                    disabled
                    helperText={formik.touched.input && formik.errors.input}
                />

            }
            <br />
            <Typography variant="caption" display="block" gutterBottom>
                Para crear una contraseña segura, introduce al menos 1 mayúscula, 1 número y un caractér especial.
            </Typography>
            <br />
            <TextField
                id="password"
                name="password"
                label="Introduce Contraseña"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <br />
            <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirma Contraseña"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <br />
            {alert.open ?
                (<Alert className="mb-3" icon={false} severity={alert.severity}>
                    {alert.text}
                </Alert>) : ""}
            {location.pathname.indexOf('/change-password') !== -1 ?
                <Button type="submit" variant="contained" color="primary" >
                    Cambiar contraseña
                </Button>
                :
                <Button type="submit" variant="contained" color="primary" >
                    Activar Cuenta
                </Button>
            }
            <br />
            {location.pathname.indexOf('/change-password') !== -1 ?
                <ButtonBase type="button">
                    <Button className="login-sub-btn mt-2 mb-2" onClick={() => history.goBack()} color="primary">
                        Regresar a cuenta de usuario
                    </Button>
                </ButtonBase>
                :
                <ButtonBase type="button">
                    <Button className="login-sub-btn mt-2 mb-2" onClick={() => history.push('/')} color="primary">
                        Inicio de Sesión
                    </Button>
                </ButtonBase>
            }
        </form >
    );
}

export default PasswordCard;