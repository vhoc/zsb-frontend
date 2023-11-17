import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TableUsers from './TableUsers';
import { getUsersbyRol, getUsersOutRol, getUsers, postUsersGroup, postRole, putRole, deleteUsersGroup } from '../../services/admin';
import { useGlobalState } from '../../utility/useGlobalState';
import Alert from '../Alert'

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


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

export default function EditRol(props) {

  const { controlData } = useGlobalState()

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [name, setName] = useState(props.name)
  const [dataOut, setDataOut] = useState([])
  const [toAdd, setToAdd] = useState([])
  const [dataIn, setDataIn] = useState([])
  const [toRemove, setToRemove] = useState([])
  const [alertOpen, setOpenAlert] = useState(false)
  const [alertText, setAlertText] = useState('')

  useEffect(() => {
    if (open) {
      if (props.name !== undefined) {
        setName(props.name)
        getUsersbyRol(props.id).then((res) => {
          if (res.success !== false) {
            setDataIn(res.data)
          }
        })
        getUsersOutRol(props.id).then((res) => {
          if (res.success !== false) {
            setDataOut(res.data)
          }
        })
      }
      else {
        getUsers().then((res) => {
          if (res.success !== false) {
            setDataOut(res.data.users)
          }
        })
      }
    }
  }, [open, props.name])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setToAdd([])
    setToRemove([])
  };

  const handleClose = () => {
    setOpen(false);
    setName('')
  };

  const save = () => {
    if (props.variant === 'create') {
      postRole({ name }).then((res) => {
        console.log(res)
        if (res.success !== false) {
          setName('')
          setOpen(false)
          if (toAdd.length !== 0) {
            postUsersGroup(res.data.id, toAdd).then(res => {
              if (res.success !== false) {
                controlData('success', 'Se ha creado un nuevo rol exitosamente')
              }
              else {
                controlData('error', 'Ocurrió un error al guardar los usuarios')
              }
            })
          }
          else {
            controlData('success', 'Se ha creado un nuevo rol exitosamente')
          }
        }
        else if (res.error) {
          // setAlertText(String(res.error))
          setAlertText('Verifica que hayas escrito correctamente el nombre del rol.')
          setOpenAlert(true)
        }
        else {
          controlData('error', 'Ocurrió un error')
          setName('')
          setOpen(false)
        }
      })
    }
    else {
      putRole(props.id, name).then((res) => {
        if (res.success !== false) {
          setName('')
          setOpen(false)
          controlData('success', 'Se ha modificado el rol exitosamente')
          if (toAdd.length === 0 && toRemove.length === 0) {
            return controlData('success', 'Se ha modificado el rol exitosamente')
          }
          if (toAdd.length !== 0) {
            postUsersGroup(props.id, toAdd).then(res => {
              if (res.success !== false) {
                return controlData('success', 'Se ha modificado el rol exitosamente')
              }
              else {
                return controlData('error', 'Ocurrió un error al guardar los usuarios')
              }
            })
          }
          if (toRemove.length !== 0) {
            deleteUsersGroup(props.id, toRemove).then(res => {
              if (res.success !== false) {
                return controlData('success', 'Se ha modificado el rol exitosamente')
              }
              else {
                return controlData('error', 'Ocurrió un error al guardar los usuarios')
              }
            })
          }
        }
        else if (res.error.response.status === 400) {
          setAlertText(res.error.response.data)
          setOpenAlert(true)
        }
        else {
          setName('')
          setOpen(false)
          controlData('error', 'Ocurrió un error')
        }
      })
    }
  }

  return (
    <div>
      <Alert open={alertOpen} onConfirm={() => setOpenAlert(false)} btnConfirm="OK" text={alertText} />
      {props.variant === 'create' ?
        <Button variant="contained" color="primary"
          startIcon={<AddIcon />} onClick={handleClickOpen}
        >
          {props.btn}
        </Button> :
        <IconButton aria-label="edit" color="primary" onClick={handleClickOpen}>
          <EditIcon color="disabled" />
        </IconButton>}
      <Dialog
        fullWidth={true}
        maxWidth='md'
        classes={{
          paper: classes.dialog
        }} open={open} onClose={handleClose}>
        <DialogTitle>Configurar rol</DialogTitle>
        <DialogContent>
          <Typography variant="body1" >
            Introduce un nombre de rol
          </Typography>
          <div className="col-12 d-flex p-0 pb-3 mb-3 pt-3 justify-content-start">
            <TextField
              fullWidth
              defaultValue={props.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="filled"
              id="filled-basic"
              label="Nombre del rol"
            />
          </div>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Buscar Usuarios" {...a11yProps(0)} />
                <Tab label="Añadidos" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Typography variant="body1" >
                Selecciona el grupo de usuarios
              </Typography>
              <Typography align="justify" variant="body2" gutterBottom>
                Introduce el nombre del usuario de Zoom para buscar y seleccionarlo o introduce @ y el nombre del dominio [@tudominio] para filtrar usuarios por dominio y seleccionarlos de la lista de resultados.
              </Typography>
              <TableUsers data={dataOut} open={open} setSelected={setToAdd} selected={toAdd} type="add" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TableUsers data={dataIn} open={open} setSelected={setToRemove} selected={toRemove} type="delete" />
            </TabPanel>
          </Box>
        </DialogContent>
        <DialogActions className="m-3 pr-4">
          <Button variant="contained" color="inherit" onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={save}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}