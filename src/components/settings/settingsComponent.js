import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { TimePicker } from '@mui/lab';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import Alert from '../Alert'


const useStyles = makeStyles(() => ({
    icon: {
        fill: '#0965DF',
        backgroundColor: 'white'
    }
}));


function SettingsComponent(props) {

    const classes = useStyles();
    const [openAlert, setOpenAlert] = useState(false)

    const cancel = () => {
        setOpenAlert(false)
    }

    const confirm = () => {
        props.setRequest(req => ({ ...req, deleteSessions: true }))
        setOpenAlert(false)
    }

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <div className={`d-flex flex-column justify-content-start p-3 ${props.type === 'remove' ? "" : "settings-c"}`}>
                <Alert open={openAlert} onCancel={cancel} onConfirm={confirm} btnCancel="Cancelar" btnConfirm="Confirmar" text='Has seleccionado "Eliminar sesiones de Zoom Cloud". Esto hará que se eliminen los archivos de la sesión al completar el respaldo. Por favor confirma que deseas esta configuración.' />
                <div className="d-flex justify-content-between align-items-center">
                    <Typography variant="body1" >
                        {props.title}
                    </Typography>
                </div>
                <div className="col-12 p-0 pt-3 basic-text text-left">
                    <Typography align="left" alignContent="left" variant="body2" gutterBottom>
                        {props.text}
                    </Typography>
                </div>
                <div className="col-12 p-0 pt-3">
                    {props.type === "frecuencia" ?
                        < FormControl
                            size="small"
                            fullWidth
                        >
                            <InputLabel id="demo-simple-select-label">Perioricidad de respaldo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Perioricidad de Respaldo"
                                value={props.request.periods}
                                onChange={(e) => props.setRequest(req => ({ ...req, periods: e.target.value }))}
                            >
                                <MenuItem value={0}>Diaria</MenuItem>
                                <MenuItem value={1}>Semanal</MenuItem>
                                <MenuItem value={2}>Mensual</MenuItem>
                                <MenuItem value={3}>Anual</MenuItem>
                            </Select>
                        </FormControl>
                        :
                        props.type === 'horario' ?
                            <div className="row p-2">
                                <div className="col-6">
                                    <TimePicker
                                        label="Hora de inicio"
                                        value={props.request.startTime}
                                        onChange={(newValue) => {
                                            props.setRequest(req => ({ ...req, startTime: newValue }))

                                        }}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </div>
                                <div className="col-6">
                                    <TimePicker
                                        label="Hora de fin"
                                        value={props.request.endTime}
                                        onChange={(newValue) => {
                                            props.setRequest(req => ({ ...req, endTime: newValue }))
                                        }}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </div>
                                <div className="col-12 d-flex justify-content-start pt-3">
                                    <Select
                                        variant='standard'
                                        labelId="demo-simple-select-standard-label"
                                        id="Select-blue"
                                        label="Perioricidad de respaldo"
                                        size='small'
                                        style={{maxWidth:'100%' }}
                                        disableUnderline
                                        inputProps={{
                                            classes: {
                                                icon: classes.icon,
                                            },
                                        }}
                                        value={props.request.timeZone}
                                        onChange={(e) => props.setRequest(req => ({ ...req, timeZone: e.target.value }))}
                                    >
                                        {GMT.map(e => {
                                            return <MenuItem
                                                value={e.value} key={e.value}>{e.text}</MenuItem>
                                        })}

                                    </Select>
                                </div>
                            </div>
                            :
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={props.request.deleteSessions}
                                onChange={(e) => {
                                    if (e.target.value === 'true') {
                                        setOpenAlert(true)
                                    }
                                    else {
                                        props.setRequest(req => ({ ...req, deleteSessions: false }))
                                    }
                                }}
                            >
                                <FormControlLabel value={'false'} control={<Radio />} label="No borrar de Zoom Cloud" />
                                <FormControlLabel value={'true'} control={<Radio />} label="Eliminar al completar respaldo" />
                            </RadioGroup>
                    }
                </div>
            </div >
        </LocalizationProvider>
    );
}

const GMT = [
    {value:'GMT+12', text:'GMT+12, Auckland, Christchurch NZ, Fiji, Kamchatka,Samoa, Wellington, Suva'},
    {value:'GMT+11', text:'GMT+11, Magadan, New Caledonia, Solomon Is'},
    {value:'GMT+10', text:'GMT+10, Brisbane, Canberra, Guam, Hobart, Melbourne, Port Moresby, Sydney, Vladivostok'},
    {value:'GMT+9', text:'GMT+9, Osaka, Seoul, Sapporo, Seoul, Tokyo, Yakutsk'},
    {value:'GMT+8', text:'GMT+8, Beijing, Chongqing, Hong Kong, Kuala Lumpur, Manila, Perth, Singapore, Taipei, Urumqi'},
    {value:'GMT+7', text:'GMT+7, Bangkok, Hanoi, Jakarta, Phnom Penh'},
    {value:'GMT+6', text:'GMT+6, Almaty, Dhakar, Kathmandu, Colombo, Sri Lanka'},
    {value:'GMT+5', text:'GMT+5, Calcutta, Colombo, Islamabad, Madras, New Dehli, India'},
    {value:'GMT+4', text:'GMT+4, Abu Dhabi, Baku, Kabul, Kazan, Muscat, Tehran, Tbilisi, Volgograd'},
    {value:'GMT+3', text:'GMT+3, Ankara, Aden, Amman, Baghdad, Bahrain, Beirut, Dammam, Kuwait, Moscow, Nairobi, Riyadh'},
    {value:'GMT+2', text:'GMT+2, Athens, Bucharest, Cairo, Cape Town, Cyprus, Estonia, Finland, Greece, Harare, Helsinki, Israel'},
    {value:'GMT+1', text:'GMT+1, Amsterdam, Berlin, Berne, Bratislava, Brussels, Budapest, European Union, Lagos, Madrid, Malta, Prague, Paris, Riga, Rome, Sarajevo, Valletta, Vienna, Warsaw, Zagreb'},
    {value:'GMT', text:'GMT'},
    {value:'GMT-1', text:'GMT-1, Azores, Cape Verde Is'},
    {value:'GMT-2', text:'GMT-2, Mid-Atlantic'},
    {value:'GMT-3', text:'GMT-3, Brasilia, Buenos Aires, Georgetown, Montevideo, Rio de Janeiro'},
    {value:'GMT-4', text:'GMT-4, Caracas, Labrador, La Paz, Maritimes, Santiago'},
    {value:'GMT-5', text:'GMT-5, Bogota, Boston, Kingston,Lima, Miami, Montreal, New York, Quebec, Washington'},
    {value:'GMT-6', text:'GMT-6, Mexico City, Guatemala, Chicago, Dallas, Houston'},
    {value:'GMT-7', text:'GMT-7, Alberta, British Columbia N.E., Denver, Edmonton,Phoenix'},
    {value:'GMT-8', text: 'GMT-8, Anchorage, British Columbia Cent., Los Angeles, San Diego, San Francisco, Seattle, Tijuana, Vancouver, Yukon'},
    {value:'GMT-9', text: 'GMT-9, Alaska'},
    {value:'GMT-10', text:'GMT-10, Hawaiian Standard Time'},
    {value:'GMT-11', text:'GMT-11, Midway Island'},
    {value:'GMT-12', text:'GMT-12, Eniwetok, Kwaialein'},
]

export default SettingsComponent;