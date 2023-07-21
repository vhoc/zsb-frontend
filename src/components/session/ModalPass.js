import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import { postValidation } from '../../services/session';
import { useGlobalState } from '../../utility/useGlobalState';
import * as yup from 'yup';

const validationSchema = yup.object({
    password: yup
        .string('Password')
        .required('Debes ingresar la contraseña de la sesion.'),
});

export default function ModalPass(props) {

    const { otp } = useParams()

    const { controlData } = useGlobalState()

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm, setErrors }) => {
            setErrors({ email: '' })
            postValidation(otp, values.password).then(res => {
                if (res.success !== false) {
                    controlData('success', 'Validación correcta')
                    props.setData(res.data)
                    resetForm()
                }
                else {
                    controlData('error', 'Contraseña incorrecta')
                }

            })

        },
    });

    return (
        <div>
            <Dialog open={props.open} aria-labelledby="form-dialog-title">
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">Acceder a la sesión</DialogTitle>
                    <DialogContent>
                        <DialogContentText className='pt-3 pb-3'>
                            Introduce la contraseña para ingresar a la sesión.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Contraseña"
                            placeholder="Introduce contraseña"
                            variant="filled"
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </DialogContent>
                    <DialogActions className="p-3 pr-5">
                        <Button type="submit" color="primary">
                            Confirmar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
