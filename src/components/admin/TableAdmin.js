import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InputAdornment from '@mui/material/InputAdornment';
import MenuAdmin from './MenuAdmin';
import CircularProgress from '@mui/material/CircularProgress';

function createData(id, userName, email, groups, status) {
    let rol = ''

    if (groups !== null) {
        if (groups.length !== 0) {
            rol = groups[0]
        }
    }
    return { id, userName, email, rol, status };
}



export default function TableUsers(props) {


    const [rows, setRows] = useState([createData("", "No hay resultados que mostrar", "", "", "")])
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (props.data !== undefined) {
            const dataTable = []
            props.data.map((e) => {
                return dataTable.push(createData(e.id, e.userName, e.email, e.groups, e.status))
            })
            if (dataTable.length === 0) {
                setRows([createData("", <p>No hay resultados que mostrar</p>, '', '', '')])
            }
            else {
                setRows(dataTable)
            }
        }

    }, [props])

    const onSearch = (input) => {
        setSearch(input.target.value)
        const dataTable = []
        props.data.map((e) => {
            let email = e.email === null ? '' : e.email
            let userName = e.userName === null ? '' : e.userName
            if (email.indexOf(input.target.value) !== -1 || userName.indexOf(input.target.value) !== -1) {
                return dataTable.push(createData(e.id, e.userName, e.email, e.groups, e.status))
            }
            else {
                return ''
            }
        })
        if (dataTable.length === 0) {
            setRows([createData("", "No hay resultados que mostrar", "", "", "")])
        }
        else {
            setRows(dataTable)
        }
    }

    return (
        <div className="p-0">
            <div className="col-12 d-flex p-0 pb-3 mb-3 justify-content-start">
                <TextField
                    size="small"
                    value={search}
                    onChange={onSearch}
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
            </div>
            <Paper variant="outlined" sx={{ width: '100%' }}>
                <TableContainer style={{ maxHeight: 700 }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell >Rol</TableCell>
                                <TableCell >Estatus</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        {props.loading ?
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
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.userName}
                                            <Typography className="sub-text" variant="overline" display="block" >
                                                {row.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell >
                                            {row.rol['groupName']}
                                        </TableCell>
                                        <TableCell >
                                            {row.status === '' ? '' : <Chip size="small" color={row.status === 1 ? "primary" : "secondary"} label={row.status === 1 ? "Activo" : "Pendiente"} />}
                                        </TableCell>
                                        <TableCell >
                                            {row.id === '' ? "" :
                                                <MenuAdmin email={row.email} id={row.id} name={row.userName} rol={row.rol['groupId']} status={row.status} />
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        }
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}