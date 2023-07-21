import React, { useState } from 'react';
import TableModel from "../components/search/Table"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button"
import DateAdapter from '@mui/lab/AdapterDayjs';
import 'dayjs/locale/es'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Footer from '../components/footer';
import { getSessionList } from '../services/search';
import dayjs from 'dayjs';



function Search() {

    const [rango, setRango] = useState(1);
    const [tipoBusqueda, setTipoBusqueda] = useState(1)
    const [dataTable, setDataTable] = useState([])
    const [loading, setLoading] = useState(false)
    const [init, setInit] = useState(dayjs().format('YYYY-MM-DD[T]HH:mm:ss'))
    const [end, setEnd] = useState(dayjs().format('YYYY-MM-DD[T]HH:mm:ss'))
    const [endError, setEndError] = useState(false)
    const [inputSearch, setInputSearch] = useState('')

    const selectRango = (event) => {
        setRango(event.target.value);
    };

    const selectBusqueda = (event) => {
        setTipoBusqueda(event.target.value);
    };

    const search = () => {
        setLoading(true)
        getSessionList(rango, tipoBusqueda, init, end, inputSearch).then(res => {
            if (res.success !== false) {
                setDataTable(res.data)
            }
            else{
                setDataTable([])
            }
            setLoading(false)
        }
        )
    };

    return (
        <LocalizationProvider locale='es' dateAdapter={DateAdapter}>
            <div className="body row d-flex">
                <Header />
                <Header static={true} />
                <Sidebar />
                <div className="d-flex flex-column justify-content-start pt-4 pr-5 col-9 full-h">
                    <h2 className="text-left">
                        Buscador de sesiones
                    </h2>

                    <div className="row justify-content-start p-4 pb-1">
                        <div className="col-3 d-flex justify-content-start">
                            <FormControl
                                size="small"
                                fullWidth
                            >
                                <InputLabel id="demo-simple-select-label">Rango de tiempo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Rango de tiempo"
                                    value={rango}
                                    onChange={selectRango}
                                >
                                    <MenuItem value={1}>Últimos 7 días</MenuItem>
                                    <MenuItem value={2}>Últimos 30 días</MenuItem>
                                    <MenuItem value={3}>Últimos 90 días</MenuItem>
                                    <MenuItem value={4}>Personalizado</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {rango === 4 ? <>
                            <div className="col-3 d-flex pr-1 justify-content-start">

                                <DatePicker
                                    mask=''
                                    label="Fecha inicial"
                                    views={['year', 'month', 'day']}
                                    inputFormat="MMMM D, YYYY"
                                    value={init}
                                    onChange={(newValue) => {
                                        setInit(newValue.format('YYYY-MM-DD[T]HH:mm:ss'))
                                    }}
                                    renderInput={(params) => <TextField size="small" {...params} />}
                                />
                            </div>
                            <div className="col-3 d-flex flex-column pl-1 justify-content-start">
                                <DatePicker
                                    keyboard
                                    mask=''
                                    label=" Fecha limite"
                                    views={['year', 'month', 'day']}
                                    inputFormat="MMMM D, YYYY"
                                    value={end}
                                    onChange={(newValue) => {
                                        setEndError(false)
                                        if (new Date(newValue).getTime() <= new Date(init).getTime()) {
                                            setEndError(true)
                                        }
                                        else {
                                            setEnd(newValue.format('YYYY-MM-DD[T]HH:mm:ss'))
                                        }
                                    }}
                                    renderInput={(params) => <TextField size="small" {...params} />}
                                />
                                {endError ? <FormHelperText error>La Fecha limite no puede ser menor a la Fecha inicial</FormHelperText> : ''}
                            </div>
                        </>
                            :
                            ""}
                    </div>
                    <div className="row justify-content-start p-4">
                        <div className="col-3">
                            <FormControl
                                fullWidth
                                size="small"
                            >
                                <InputLabel id="demo-simple-select-label">Búsqueda específica</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tipoBusqueda}
                                    onChange={selectBusqueda}
                                    label="Busqueda especifica"
                                >
                                    <MenuItem value={1}>Por nombre de usuario</MenuItem>
                                    <MenuItem value={2}>Por nombre de la sesión</MenuItem>
                                    <MenuItem value={3}>Por ID de la sesión</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-4 d-flex justify-content-start ">
                            <TextField
                                className="no-border"
                                size="small"
                                fullWidth
                                value={inputSearch}
                                onChange={e => setInputSearch(e.target.value)}
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
                                placeholder={"Introduce el " + (tipoBusqueda === 1 ? "nombre de usuario" :
                                    tipoBusqueda === 2 ? "nombre de sesión" : "ID de sesión")} />
                        </div>
                        <div className="col-5 d-flex justify-content-end">
                            <Button variant="contained" color="primary" onClick={search} size="large">
                                BUSCAR
                            </Button>
                        </div>
                    </div>
                    <div className="row justify-content-start p-4 table-responsive">
                        <TableModel loading={loading} data={dataTable} />
                    </div>
                    <div className="col h-100 d-flex align-items-end">
                        <Footer />
                    </div>
                </div>
            </div >
        </LocalizationProvider >
    );
}


export default Search;