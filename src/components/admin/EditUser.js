import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableUsersWithAccessEdit from './TableUsersWithAccessEdit';
import { getUsersbyRol, getUsersOutRol, getUsers, postZoomUser, getUsersNotRegister } from '../../services/admin';
import { useGlobalState } from '../../utility/useGlobalState';
import Alert from '../Alert'
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  password: yup
      .string('password')
      .required('Se requiere ingresar una contraseña'),
});

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="P-0"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="pt-3 ">
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }


const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    minHeight: '100vh',
  }
});

export default function EditUsersWithAccess(props) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false)
  const [value, setValue] = useState(0);
  const [name, setName] = useState(props.name)
  const [dataOut, setDataOut] = useState([])
  const [toAdd, setToAdd] = useState(0)
  const [dataIn, setDataIn] = useState([])
  // const [toRemove, setToRemove] = useState([])
  const [alertOpen, setOpenAlert] = useState(false)
  const [alertText, setAlertText] = useState('')

  
    const { controlData } = useGlobalState()

  useEffect(() => {
    if (open) {
        getUsersNotRegister().then((res) => {
          if (res.success !== false) {
            setDataOut(res.data)
          }
        })
      }
  }, [open, props.name])

  const formik = useFormik({
    initialValues: {
        password:''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
            postZoomUser(toAdd, values.password).then((res) => {
                if (res.success !== false) {
                    controlData('success', 'Se ha añadido el usuario exitosamente')
                    setOpen(false)
                    setOpenPassword(false)
                    resetForm()
                }
                else {
                    if (res.error.response.status === 400 || res.error?.response?.status === 400) {
                      controlData('error', res.error.response.data.errors[0])
                        // setAlert({ severity: 'error', text: res.error.response.data.errors[0], open: true })
                    }
                    else {
                      controlData('error', 'Ocurrió un error')
                        // setAlert({ severity: 'error', text: 'Ocurrió un error', open: true })
                    }
                }
            })
    },
});

const handleClose = () => {
  formik.resetForm()
  setOpenPassword(false)
  setOpen(false);
};

  const handleClickOpen = () => {
    setOpen(true);
    setToAdd(0)
    // setToRemove([])
  };

  return (
    <div>
      <Alert open={alertOpen} onConfirm={() => setOpenAlert(false)} btnConfirm="OK" text={alertText} />
        <Button variant="contained" color="primary"
          startIcon={<AddIcon />} onClick={handleClickOpen}
        >
          {props.btn}
        </Button> 
      <Dialog
        fullWidth={true}
        maxWidth='md'
        classes={{
          paper: classes.dialog
        }} open={open} onClose={handleClose}>
        <DialogTitle>Selecciona usuario</DialogTitle>
        <DialogContent>         
          <Box sx={{ width: '100%' }}>
              <Typography align="justify" variant="body2" gutterBottom>
                Introduce el nombre del usuario de Zoom para buscar y seleccionarlo o introduce @ y el nombre del dominio [@tudominio] para filtrar usuarios por dominio y seleccionarlos de la lista de resultados.
              </Typography>
              <TableUsersWithAccessEdit data={dataOut} open={open} setSelected={setToAdd} selected={toAdd} type="add" />
          </Box>
        </DialogContent>
        <DialogActions className="m-3 pr-4">
          <Button variant="contained" color="inherit" onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={()=>setOpenPassword(true)}>Guardar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openPassword} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">
                        Añadir Usuario de Zoom
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                                Introduce una contraseña para añadir a este usuario.           
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Contraseña"
                            variant="filled"
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                          
                        />
                    </DialogContent>
                    <DialogActions className="p-3 pr-5">
                        <Button onClick={handleClose} color="error">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
    </div>
  );
}