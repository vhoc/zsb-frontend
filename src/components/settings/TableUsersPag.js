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
            <div className="d-flex pb-4 pt-5 pl-2 justify-content-between align-items-center">
                <Typography variant="body1" >
                    Usuarios respaldados ({usersTotal})
                </Typography>
                <div>
                    <Paper>
                        <TextField
                            className="no-border"
                            size="small"
                            fullWidth
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
                            placeholder="Buscar usuario" />
                    </Paper>
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
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex ">
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
        </div>
    );
}