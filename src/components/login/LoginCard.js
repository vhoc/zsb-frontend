import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Alert, ButtonBase } from '@mui/material';
import { postLogin, postForgotPass } from '../../services/login';
import { setItem } from '../../utility/localStorageControl';
import { useFormik } from 'formik';
import * as yup from 'yup';


function LoginCard() {

    const validationSchema = () => {
        if (forgotPass) {
            return yup.object({
                email: yup
                    .string('Email')
                    .email('Introduce un formato válido')
                    .required('Se requiere email'),
            });
        }
        else {
            return yup.object({
                email: yup
                    .string('Email')
                    .email('Ingresa un email valido')
                    .required('Se requiere email'),
                password: yup
                    .string('Contraseña')
                    .min(8, 'Tu contraseña debe ser mayor a 8 caracteres')
                    .required('Se requiere ingresar contraseña'),
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setAlert({ active: false, text: '', severity: 'error' })
            setError()
            if (forgotPass) {
                postForgotPass(values.email).then(res => {
                    if (res.success !== false) {
                        setAlert({ active: true, text: "Hemos enviado un correo electrónico con las instrucciones para recuperar tu contraseña.", severity: "success" })
                    }
                    else {
                        setAlert({ active: true, text: "No se ha podido localizar una cuenta asociada con ese email. Intenta de nuevo.", severity: "error" })
                    }
                })
            }
            else {
                postLogin(values.email, values.password).then(res => {
                    if (res.success !== false) {
                        setItem('westToken', res.data.token.token)
                        let user = {
                            refreshToken: res.data.token.refreshToken,
                            userEmail: res.data.userEmail,
                            userId: res.data.userId,
                            userName: res.data.userName,
                            userStatus: res.data.userStatus,
                            userRol: res.data.roles[0]
                        }
                        setItem('westUser', JSON.stringify(user))
                        history.push("/search")
                        return true
                    }
                    else {
                        setError("Credenciales inválidas")
                    }
                })
            }
        },
    });

    const history = useHistory()

    const [error, setError] = useState();
    const [alert, setAlert] = useState({ active: false, text: '', severity: 'error' })
    const [sendEmail, setSendEmail] = useState(false)
    const [forgotPass, setForgotPass] = useState(false)

    return (
        <form id="login" onSubmit={formik.handleSubmit} className="card col-4 col-md-3 d-flex justify-content-center login-card mt-5 mb-4 pt-4 pb-5 px-4">
            {forgotPass ? <div className="text-login">
                Por favor introduce tu email para localizar tu cuenta
            </div> :
                <Typography className="mt-4 mb-4" variant="h5" component="h2">
                    Iniciar Sesión
                </Typography>
            }
            <br />
            <TextField
                id="email"
                name="email"
                label="Correo electrónico"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <br />
            {!forgotPass ?
                <TextField
                    id="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                : alert.active ?
                    (<Alert icon={false} severity={alert.severity}>
                        {alert.text}
                    </Alert>)
                    : ""}
            <br />
            {error ?
                (<Alert icon={false} severity="error">
                    {error}
                </Alert>) : ""}
            {forgotPass ?
                <Button type="submit" variant="contained" color="primary" disabled={sendEmail ? true : false}>
                    Localizar Cuenta
                </Button>
                :
                <ButtonBase type="button">
                    <Button className="login-sub-btn mt-2 mb-2" onClick={() => {
                        setSendEmail(false)
                        setForgotPass(true)
                        setError()
                        setAlert({ active: false, text: '', severity: 'error' })

                    }}
                        color="primary">
                        ¿Olvidaste tu contraseña?
                    </Button>
                </ButtonBase>}
            <br />
            {forgotPass ?
                <ButtonBase type="button">
                    <Button className="login-sub-btn mt-2 mb-2" onClick={() => {
                        setSendEmail(false)
                        setForgotPass(false)
                        setAlert({ active: false, text: '', severity: 'error' })
                        setError()
                    }} color="primary">
                        Regresar a Inicio de Sesión
                    </Button>
                </ButtonBase>
                :
                <Button type="submit" variant="contained" color="primary" disabled={formik.values.password && formik.values.email ? false : true}>
                    INICIAR SESIÓN
                </Button>
            }
        </form >
    );
}

export default LoginCard;