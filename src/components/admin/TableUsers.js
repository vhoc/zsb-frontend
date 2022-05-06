import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';


function createData(id, userName, email) {
    return {
        id,
        userName,
        email,
    };
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
                <TableCell>Usuario</TableCell>
                <TableCell >Correo Electrónico</TableCell>
                <TableCell align="right">
                    {props.type === 'delete' ?
                        <>
                            Remover
                            <IconButton aria-label="delete" disabled color="primary">
                                <DeleteOutlineIcon />
                            </IconButton>
                        </>
                        :
                        <>
                            Añadir
                            <Checkbox
                                color="primary"
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all desserts',
                                }}
                            />
                        </>
                    }
                </TableCell>
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

export default function TableUsers(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [rows, setRows] = useState(([createData("", "No hay resultados que mostrar", "")]))
    const page = 0
    const dense = 0
    const rowsPerPage = 10000

    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!props.open) {
            setSearch('')
        }
        if (props.data !== undefined) {
            const dataTable = []
            props.data.map((e) => {
                return dataTable.push(createData(e.id, e.userName, e.email))
            })
            if (dataTable.length === 0) {
                setRows([createData("", "No hay resultados que mostrar", "")])
            }
            else {
                setRows(dataTable)
            }
        }
        else {
            setRows([createData("", "No hay resultados que mostrar", "")])
        }

    }, [props.open, props.data])

    const onSearch = (input) => {
        setSearch(input.target.value)
        const dataTable = []
        props.data.map((e) => {
            let email = (e.email !== null ? e.email : '')
            let userName = (e.userName !== null ? e.userName : '')
            if (email.toLowerCase().indexOf(input.target.value.toLowerCase()) !== -1 || userName.toLowerCase().indexOf(input.target.value.toLowerCase()) !== -1) {
                return dataTable.push(createData(e.id, e.userName, e.email))
            }
            else {
                return ''
            }
        })
        if (dataTable.length === 0) {
            setRows([createData("", "No hay resultados que mostrar", "")])
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
            <TextField
                className="mt-3 mb-3"
                size="small"
                value={search}
                onChange={onSearch}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRoundedIcon />
                        </InputAdornment>
                    ),
                    endAdornment:
                        (
                            <IconButton onClick={()=>onSearch({target:{value:''}})} aria-label="delete" color="primary">
                                <CancelSharpIcon color="disabled" />
                            </IconButton>
                        ),
                }}
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
                placeholder="Nombre o @dominio" />
            <Paper variant="outlined" sx={{ width: '100%', maxHeight: '1200px' }}>
                <TableContainer style={{ maxHeight: 700 }}>
                    <Table
                        size='small'
                        aria-labelledby="Usuarios"
                    >
                        <EnhancedTableHead
                            numSelected={props.selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            type={props.type === 'delete' ? 'delete' : 'add'}
                        />
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
                                            <TableCell>
                                                {row.userName}
                                            </TableCell>
                                            <TableCell >{row.email}</TableCell>
                                            <TableCell align='right'>
                                                {row.id === '' ? '' : props.type === "delete" ?
                                                    <IconButton aria-label="delete" color="primary">
                                                        <DeleteOutlineIcon color={isSelected(row.id) ? 'error' : "disabled"} />
                                                    </IconButton>
                                                    :
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />}
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
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}