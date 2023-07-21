import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

function createData(id, idSession, user, name, date, duration) {
    let time = ''
    if (date === undefined || date === null) {
        date = ''
    }
    else {
        time = date.substring(date.length - 8, date.length)
        date = date.substring(0, date.length - 8)
    }
    return { id, idSession, user, name, date, time, duration };
}



export default function TableModel(props) {

    const classes = useStyles();
    const history = useHistory()

    const [rows, setRows] = useState([createData("", "", <p>No hay resultados que mostrar</p>)])

    useEffect(() => {
        if (props.data !== undefined) {
            const dataTable = []
            props.data.map((e) => {
                return dataTable.push(createData(e.id, e.idSession, e.userName, e.sessionName, e.sessionDate, e.duration))
            })
            if (props.data.length === 0) {
                setRows([createData("", "", <p>No hay resultados que mostrar</p>)])
            }
            else {
                setRows(dataTable)
            }
        }
    }, [props])


    return (
        <Paper variant="outlined" sx={{ width: '100%' }}>
            <TableContainer >
                <Table className={classes.table} aria-label="Users">
                    <TableHead>
                        <TableRow>
                            <TableCell>Usuario</TableCell>
                            <TableCell >Nombre/ID de la sesión</TableCell>
                            <TableCell >Fecha de sesión</TableCell>
                            <TableCell >Duración</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    {props.loading ?
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="row align-items-start loading">
                                        <div className="row align-items-center m-3">
                                            <CircularProgress className="mr-3" /> Buscando sesiones en el respaldo, por favor espera...
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
                                        {row.user}
                                    </TableCell>
                                    <TableCell >
                                        {row.name}
                                        <Typography className="sub-text" variant="overline" display="block" gutterBottom>
                                            {row.idSession}
                                        </Typography>
                                    </TableCell>
                                    <TableCell >
                                        {row.date}
                                        <Typography className="sub-text" variant="overline" display="block" gutterBottom>
                                            {row.time}
                                        </Typography>
                                    </TableCell>
                                    <TableCell >{row.duration !== undefined ? row.duration + ' Min' : ''}</TableCell>
                                    <TableCell >
                                        {row.name === undefined ? "" :
                                            <Button
                                                onClick={() => history.push({
                                                    pathname: "/session/" + row.id,
                                                    state: {
                                                        prevPath: "/search",
                                                        prevName: 'Buscador de sesiones'
                                                    }
                                                })}
                                                variant="contained" color="primary">
                                                Abrir
                                            </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                </Table>
            </TableContainer>
        </Paper>
    );
}