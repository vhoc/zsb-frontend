import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InputAdornment from '@mui/material/InputAdornment';
import MenuAdmin from './MenuAdmin';
import CircularProgress from '@mui/material/CircularProgress';
import MenuUserWithAccess from './MenuUserWithAccess';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(id, userName, email, status) {
    return { id, userName, email, status };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } =
        props;

    return (
        <TableHead>
            <TableRow>
                <TableCell align='right'>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell >Correo Electrónico</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function TableUsersWithAccess(props) {


    const [rows, setRows] = useState([createData("", "No hay resultados que mostrar", "", "", "")])
    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    // console.log(rows)
    const page = 0
    const dense = 0
    const rowsPerPage = 10000

    useEffect(() => {
        if (props.data !== undefined) {
            const dataTable = []
            props.data.map((e) => {
                return dataTable.push(createData(e.id, e.userName, e.email, e.status))
            })
            if (dataTable.length === 0) {
                setRows([createData("", <p>No hay resultados que mostrar</p>, '', '', '')])
            }
            else {
                setRows(dataTable)
            }
        }

    }, [props])

    const plainText = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      } 

    const onSearch = (input) => {
        setSearch(input.target.value)
        const dataTable = []
        props.data.map((e) => {
            let email = e.email === null ? '' : e.email
            let userName = e.userName === null ? '' : e.userName
            if (plainText(email).indexOf(plainText(input.target.value)) !== -1 || plainText(userName).indexOf(plainText(input.target.value)) !== -1) {
                return dataTable.push(createData(e.id, e.userName, e.email, e.status))
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

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            props.setSelected(newSelecteds);
            
            return;
        }
        props.setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = props.selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(props.selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(props.selected.slice(1));
        } else if (selectedIndex === props.selected.length - 1) {
            newSelected = newSelected.concat(props.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                props.selected.slice(0, selectedIndex),
                props.selected.slice(selectedIndex + 1),
            );
        }

        props.setSelected(newSelected);
    };

    const isSelected = (name) => props.selected.indexOf(name) !== -1;
    
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <div className="p-0">
            <div className="col-12 d-flex p-0 pb-3 mb-3 justify-content-between">
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
                    placeholder="Buscar usuario o sesión"
                />
                {
                    props.selected.length >= 1 ?
                        <Button variant="contained" color={'error'}
                            startIcon={<DeleteIcon />} onClick={() => alert('PENDING DELETION FUNCTIONALITY. WAITING FOR BACKEND.')}
                            >
                            ELIMINAR USUARIOS
                        </Button>
                    :
                        null
                }
            </div>
            <Paper variant="outlined" sx={{ width: '100%' }}>
                <TableContainer style={{ maxHeight: 700 }}>
                    <Table aria-label="simple table">
                        <EnhancedTableHead
                            numSelected={ props.selected ? props.selected.length : 0}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            type={props.type === 'delete' ? 'delete' : props.type === 'view' ? 'view' : 'add'}
                        />
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
                                {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(props.type === 'delete' ? row.id : row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell align='right'>
                                                
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                            </TableCell>
                                            <TableCell>
                                                {row.userName}
                                            </TableCell>
                                            <TableCell >{row.email}</TableCell>
                                            <TableCell >
                                                {row.status === '' ? '' : <Chip size="small" color={row.status === 1 ? "primary" : "secondary"} label={row.status === 1 ? "Activo" : "Pendiente"} />}
                                            </TableCell>
                                            <TableCell >
                                                {row.id === '' ? "" :
                                                    <MenuUserWithAccess email={row.email} id={row.id} name={row.userName} status={row.status} />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            </TableBody>
                        }
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}