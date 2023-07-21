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
import { getUsers } from '../../services/admin';
import Switch from '@mui/material/Switch';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';

function createData(id, name, email) {
    return {
        id,
        name,
        email
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
    const [search, setSearch] = useState('')

    // TODO: Get this default value from the backend, it should come from there
    const [backupAll, setBackupAll] = useState(false)

    const [confirmBackupAllDialog, setConfirmBackupAllDialog] = useState(false)

    const handleChangeBackupAllSwitch = () => {
        // if false, show confirm popup, on OK toggle backupAll state to true
        if ( backupAll === false ) {
            setConfirmBackupAllDialog(true)            
            return
        }
        setBackupAll(false)
        // if true, just toggle backupAll state to false
    }

    const handleChangePage = (event, newPage) => {
        getUsers(rowsPerPage, newPage, search).then(res => {
            if (res.success !== false) {
                setTotalRecords(res.data.totalRecords)
                setPage(res.data.pageNumber)
                const dataTable = []
                res.data.data.map((e) => {
                    return dataTable.push(createData(e.id, e.userName, e.email))
                })
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
                res.data.data.map((e) => {
                    return dataTable.push(createData(e.id, e.userName, e.email))
                })
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
                res.data.data.map((e) => {
                    return dataTable.push(createData(e.id, e.userName, e.email))
                })
                if (dataTable.length === 0) {
                    setRows([createData("", <p>No hay resultados que mostrar</p>)])
                }
                else {
                    setRows(dataTable)
                }
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
                res.data.data.map((e) => {
                    return dataTable.push(createData(e.id, e.userName, e.email))
                })
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
                        {/* dynamic */}
                        4 usuarios seleccionados
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
                                                onChange={() => {
                                                    // change current row (user) iteration value to its opposite.
                                                    setBackupAll(false)
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
                    ¿Estás seguro de que quieres respaldar las sesiones de todos los usuarios de la cuenta de Zoom?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setConfirmBackupAllDialog(false)}>CANCELAR</Button>
                <Button
                    onClick={() => {
                        setBackupAll(true)
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