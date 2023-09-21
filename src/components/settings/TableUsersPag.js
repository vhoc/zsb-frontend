import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination } from '@mui/material';
import { Typography, TextField, InputAdornment } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { getUsers, putUserBackup, putAllUsersBackup } from '../../services/admin';
import Switch from '@mui/material/Switch';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import { useGlobalState } from '../../utility/useGlobalState';

function createData(id, name, email, status) {
    return {
        id,
        name,
        email,
        status
    };
}


function EnhancedTableHead() {

    return (
        <TableHead>
            <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell >Correo Electrónico</TableCell>
                <TableCell >Respaldar</TableCell>
            </TableRow>
        </TableHead>
    );
}


export default function EnhancedTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([createData("", <p>No hay resultados que mostrar</p>)])
    const [totalRecords, setTotalRecords] = useState(0)
    const [usersTotal, setUsersTotal] = useState(0)
    const [usersSync, setUsersSync] = useState(0)
    const [search, setSearch] = useState('')

    const { controlData } = useGlobalState()

    // TODO: Get this default value from the backend, it should come from there
    const [backupAll, setBackupAll] = useState(false)

    const [confirmBackupAllDialog, setConfirmBackupAllDialog] = useState(false)

    const handleChangeBackupAllSwitch = () => {
        setConfirmBackupAllDialog(true)
    }

    const handleChangePage = (event, newPage) => {
        getUsers(rowsPerPage, newPage, search).then(res => {
            if (res.success !== false) {
                setTotalRecords(res.data.totalRecords)
                setPage(res.data.pageNumber)
                const dataTable = []
                let allBackup = true
                console.log(res)
                res.data.data.users.map((e) => {
                    if (!e.status) {
                        allBackup = false
                    }
                    return dataTable.push(createData(e.id, e.userName, e.email, e.status))
                })
                setUsersSync(res.data.data?.totalSyncUsers??0)
                setBackupAll(allBackup)
                if (dataTable.lenght === 0) {
                    setRows([createData("", <p>No hay resultados que mostrar</p>)])
                }
                else {
                    setRows(dataTable)
                }
            }
        })
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        let getPage = ((parseInt(event.target.value, 10) * page) - parseInt(event.target.value, 10)) / parseInt(event.target.value, 10)
        getUsers(parseInt(event.target.value, 10), Math.floor(getPage), search).then(res => {
            if (res.success !== false) {
                setTotalRecords(res.data.totalRecords)
                setPage(res.data.pageNumber)
                let dataTable = []
                let allBackup = true
                res.data.data.users.map((e) => {
                    if (!e.status) {
                        allBackup = false
                    }
                    return dataTable.push(createData(e.id, e.userName, e.email, e.status))
                })
                setUsersSync(res.data.data?.totalSyncUsers??0)
                setBackupAll(allBackup)
                if (dataTable.length === 0) {
                    setRows([createData("", <p>No hay resultados que mostrar</p>)])
                }
                else {
                    setRows(dataTable)
                }
            }
        })
    };

    const onSearch = (e) => {
        setSearch(e.target.value)
        getUsers(rowsPerPage, 1, e.target.value).then(res => {
            if (res.success !== false) {
                setTotalRecords(res.data.totalRecords)
                setPage(res.data.pageNumber)
                setRowsPerPage(res.data.pageSize)
                let dataTable = []
                let allBackup = true
                res.data.data.users.map((e) => {
                    if (!e.status) {
                        allBackup = false
                    }
                    return dataTable.push(createData(e.id, e.userName, e.email, e.status))
                })
                setUsersSync(res.data.data?.totalSyncUsers??0)
                setBackupAll(allBackup)
                if (dataTable.length === 0) {
                    setRows([createData("", <p>No hay resultados que mostrar</p>)])
                }
                else {
                    setRows(dataTable)
                }
            }
        })
    }

    const onChangeStatus = (id) => {
        putUserBackup(id).then(res => {
            if (res.success !== false) {
                controlData('success', 'Se ha cambiado el respaldo del usuario')
                handleChangePage('', page)
            }
            else {
                controlData('error', 'Ocurrió un error al modificar el respaldo')
            }
        })
    }

    const onChangeAllStatus = (status) => {
        let usersId = []
        rows.map((user) => {
            return usersId.push(user.id)
        })
        putAllUsersBackup(usersId, status).then(res => {
            if (res.success !== false) {
                controlData('success', 'Se ha cambiado el respaldo de los usuarios')
                handleChangePage('', page)
            }
            else {
                controlData('error', 'Ocurrió un error al modificar el respaldo de los usuarios')
            }
        })
    }

    useEffect(() => {
        getUsers(10, 1).then(res => {
            if (res.success !== false) {
                setUsersTotal(res.data.totalRecords)
                setTotalRecords(res.data.totalRecords)
                setRowsPerPage(res.data.pageSize)
                setPage(res.data.pageNumber)
                let dataTable = []
                let allBackup = true
                console.log(res.data.data)
                res.data.data.users.map((e) => {
                    if (!e.status) {
                        allBackup = false
                    }
                    return dataTable.push(createData(e.id, e.userName, e.email, e.status))
                })
                setUsersSync(res.data.data?.totalSyncUsers??0)
                setBackupAll(allBackup)
                if (dataTable.length === 0) {
                    setRows([createData("", <p>No hay resultados que mostrar</p>)])
                }
                else {
                    setRows(dataTable)
                }
            }
        })
    }
        , [])

    return (
        <div className="p-0 pl-4">
            <div className="d-flex flex-column pb-4 pt-5 pl-2 justify-content-between align-items-start">
                <Typography variant="body1 pb-3" >
                    Selecciona los usuarios que deseas respaldar en Dropbox
                </Typography>
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <TextField
                        className=""
                        size="small"
                        //fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRoundedIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={onSearch}
                        value={search}
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        variant="filled"
                        placeholder="Buscar usuario"
                    />
                    <Typography variant="body2" color={'#000000'} >
                       
                        {usersSync} usuarios sincronizados
                    </Typography>

                    <div className='d-flex align-items-center'>
                        <Typography variant="body2" color={'#000000'} >
                            Respaldar todos los usuarios
                        </Typography>
                        <Switch
                            checked={backupAll}
                            onChange={handleChangeBackupAllSwitch}
                        />
                    </div>

                </div>

            </div>
            <Paper variant="outlined" sx={{ width: '100%' }}>
                <TableContainer>
                    <Table
                        aria-labelledby="Usuarios"
                    >
                        <EnhancedTableHead
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <TableRow
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell>
                                            {row.name}
                                        </TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        {/* dynamic */}
                                        <TableCell width={70}>
                                            {/* WAITING FOR BACKEND: */}
                                            <Switch
                                                checked={row.status}
                                                onChange={() => {
                                                    // change current row (user) iteration value to its opposite.
                                                    onChangeStatus(row.id)
                                                    // setBackupAll(false)
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex">
                        <TablePagination
                            className='d-flex align-items-center'
                            rowsPerPageOptions={[5, 10]}
                            component="Pagination"
                            count={totalRecords}
                            rowsPerPage={rowsPerPage}
                            page={page - 1}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Resultados p/p"
                        />
                    </div>
                    <div>
                        <Pagination
                            page={page}
                            count={Math.ceil(totalRecords / rowsPerPage)}
                            onChange={handleChangePage}
                        />
                    </div>
                </div>
            </Paper>
            <Dialog
                open={confirmBackupAllDialog}
                onClose={() => setConfirmBackupAllDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Respaldar todos los usuarios"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {backupAll ? '¿Estás seguro de que quieres quitar el respaldo de las sesiones de todos los usuarios?' : '¿Estás seguro de que quieres respaldar las sesiones de todos los usuarios de la cuenta de Zoom?'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmBackupAllDialog(false)}>CANCELAR</Button>
                    <Button
                        onClick={() => {
                            setBackupAll(true)
                            onChangeAllStatus(!backupAll)
                            setConfirmBackupAllDialog(false)
                        }}
                        autoFocus
                    >
                        CONFIRMAR
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}