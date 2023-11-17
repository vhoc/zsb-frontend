import React, { useEffect, useState } from 'react';
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from '../components/footer';
import Snackbar from "../components/Snackbar"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import { TextField, InputAdornment, Typography, Chip } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Pagination from '@mui/material/Pagination';
import { getLogs } from '../services/logs';
import { useHistory } from 'react-router-dom';


function createData(id, idSession, user, name, date, duration, init, finish, status) {
    let dateTime = ''
    let initTime = ''
    let finishTime = ''
    let inProces = false
    if (date === undefined || date === null) {
        date = ''
    }
    else {
        dateTime = date.substring(date.length - 8, date.length)
        date = date.substring(0, date.length - 8)
    }
    if (init === undefined || init === null) {
        init = ''
    }
    else {
        initTime = init.substring(init.length - 8, init.length)
        init = init.substring(0, init.length - 8)
    }
    if (finish === undefined || finish === null) {
        finish = ''
    }
    else {
        finishTime = finish.substring(finish.length - 8, finish.length)
        finish = finish.substring(0, finish.length - 8)
    }
    return {
        id,
        idSession,
        user,
        name,
        date,
        dateTime,
        duration,
        init,
        initTime,
        finish,
        finishTime,
        status,
        inProces
    };
}


function EnhancedTableHead() {

    return (
        <TableHead>
            <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell >Nombre/ID Sesión</TableCell>
                <TableCell >Fecha de sesión</TableCell>
                <TableCell >Duración</TableCell>
                <TableCell >Inicio de respaldo</TableCell>
                <TableCell >Finalización de respaldo</TableCell>
                <TableCell ></TableCell>
            </TableRow>
        </TableHead>
    );
}


export default function Logs() {

    const history = useHistory()

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([createData("", "", <p>No hay resultados que mostrar</p>)])
    const [totalRecords, setTotalRecords] = useState(0)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(0)

    const handleChangePage = (event, newPage) => {
        getLogs(rowsPerPage, newPage, search).then(res => {
            if (res.success !== false) {
                setTotalRecords(res.data.totalRecords)
                setPage(res.data.pageNumber)
                const dataTable = []
                res.data.data.map((e) => {
                    return dataTable.push(createData(e.id, e.idSession, e.userName, e.sessionName, e.sessionDate, e.duration, e.backupStart, e.backupFinish, e.sessionStatus))
                })
                if (dataTable.length === 0) {
                    setRows([createData("", "", <p>No hay resultados que mostrar</p>)])
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
        getLogs(parseInt(event.target.value, 10), Math.floor(getPage), search).then(res => {
            if (res.success !== false) {
                setTotalRecords(res.data.totalRecords)
                setPage(res.data.pageNumber)
                const dataTable = []
                res.data.data.map((e) => {
                    return dataTable.push(createData(e.id, e.idSession, e.userName, e.sessionName, e.sessionDate, e.duration, e.backupStart, e.backupFinish, e.sessionStatus))
                })
                if (dataTable.length === 0) {
                    setRows([createData("", "", <p>No hay resultados que mostrar</p>)])
                }
                else {
                    setRows(dataTable)
                }
            }
        })
    };

    const onSearch = (e) => {
        setSearch(e.target.value)
        getLogs(rowsPerPage, page, e.target.value).then(res => {
            if (res.success !== false) {
                setTotalRecords(res.data.totalRecords)
                setPage(res.data.pageNumber)
                setRowsPerPage(res.data.pageSize)
                let dataTable = []
                res.data.data.map((e) => {
                    return dataTable.push(createData(e.id, e.idSession, e.userName, e.sessionName, e.sessionDate, e.duration, e.backupStart, e.backupFinish, e.sessionStatus))
                })
                if (dataTable.length === 0) {
                    setRows([createData("", "", <p>No hay resultados que mostrar</p>)])
                }
                else {
                    setRows(dataTable)
                }
            }
        })
    }

    useEffect(() => {
        setLoading(true)
        getLogs(10, 1).then(res => {
            if (res.success !== false) {
                if (res.data.length !== 0) {
                    setTotalRecords(res.data.totalRecords)
                    setRowsPerPage(res.data.pageSize)
                    setPage(res.data.pageNumber)
                    const dataTable = []


                    res.data.data.map((e) => {
                        return dataTable.push(createData(e.id, e.idSession, e.userName, e.sessionName, e.sessionDate, e.duration, e.backupStart, e.backupFinish, e.sessionStatus))
                    })
                    if (dataTable.length === 0) {
                        setRows([createData("", "", <p>No hay resultados que mostrar</p>)])
                        setLoading(false)
                    }
                    else {
                        setRows(dataTable)
                        setLoading(false)
                    }
                }
            }
            setLoading(false)
        })
        setTimeout(() => {
            if (search.length === 0) {
                setReload(reload + 1)
            }
        }, 60000)
    }
        , [reload])

    return (
        <div className="body row d-flex">
            <Snackbar />
            <Header />
            <Header static={true} />
            <Sidebar />
            <div className="d-flex flex-column justify-content-start pt-4 pr-5 col-9 align-items-stretch">
                <div className="d-flex pb-4 pt-5 pl-2 justify-content-between align-items-center">
                    <h2 className="text-left">
                        Registro de actividad
                    </h2>
                    <div>
                        <Paper>
                            <TextField
                                className="no-border"
                                size="small"
                                fullWidth
                                onChange={onSearch}
                                value={search}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                variant="filled"
                                placeholder="Buscar usuario o sesión" />
                        </Paper>
                    </div>

                </div>
                <div className="pl-5 full-h">
                    <Paper variant="outlined" sx={{ width: '100%', }}>
                        <TableContainer>
                            <Table
                                aria-labelledby="Usuarios"
                            >
                                <EnhancedTableHead
                                />
                                {loading ?
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <div className="row align-items-start loading">
                                                    <div className="row align-items-center m-3">
                                                        <CircularProgress className="mr-3" />
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    :
                                    <TableBody>
                                        {rows.map((row, index) => {
                                            return (
                                                <TableRow
                                                    tabIndex={-1}
                                                    key={row.id}
                                                >
                                                    <TableCell>
                                                        {row.user}
                                                    </TableCell>
                                                    <TableCell >
                                                        <a href={"/session/" + row.id} onClick={() => history.push({
                                                            pathname: "/session/" + row.id,
                                                            state: {
                                                                prevPath: "/logs",
                                                                prevName: 'Registro de actividad'
                                                            }
                                                        })} >
                                                            {row.name}
                                                        </a>
                                                        <Typography className="sub-text" variant="overline" display="block" gutterBottom>
                                                            {row.idSession}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Typography variant='body2'>
                                                            {row.date}
                                                        </Typography>
                                                        <Typography className="sub-text" variant="overline" display="block" gutterBottom>
                                                            {row.dateTime}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Typography variant='body2'>
                                                            {row.duration !== undefined ? row.duration + ' Min' : ''}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Typography variant='body2'>
                                                            {row.init}
                                                        </Typography>
                                                        <Typography className="sub-text" variant="overline" display="block" gutterBottom>
                                                            {row.initTime}
                                                        </Typography>
                                                    </TableCell>
                                                    {row.finish === '01/01/0001'?
                                                        (<TableCell >
                                                            <Typography variant='body2'>
                                                                {row.finish}
                                                            </Typography>
                                                            <Typography className="sub-text" variant="overline" display="block" gutterBottom>
                                                                {row.finishTime}
                                                            </Typography>
                                                        </TableCell>):
                                                        (<TableCell >
                                                            <Typography variant='body2'>
                                                                En proceso
                                                            </Typography>
                                                        </TableCell>)}
                                                    <TableCell>
                                                        {row.status === undefined ? '' : <Chip size="small" color={row.status === 0 ? "error" : row.status === 2 ? "success" : "primary"} label={row.status === 0 ? "Error" : row.status === 2 ? "Descargando" : "Exitoso"} />}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                }
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
                <Footer />
            </div>
        </div>
    );
}