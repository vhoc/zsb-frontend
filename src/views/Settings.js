import React, { useEffect, useState } from 'react';
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from '../components/footer';
import SettingsComponent from "../components/settings/settingsComponent"
import TableUsers from '../components/settings/TableUsersPag';
import Button from '@mui/material/Button'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { getSettings } from '../services/settings';
import { requestSettings } from '../services/settings';
import Snackbar from '../components/Snackbar'
import { useGlobalState } from '../utility/useGlobalState';


function Settings() {

    const { controlData } = useGlobalState()

    const [request, setRequest] = useState({ method: 'POST', periods: 0, endTime: dayjs(), startTime: dayjs(), timeZone: 'GMT', deleteSessions: false })
    const [descart, setDescart] = useState(false)
    const [loading, setLoading] = useState(false)


    const sendSettings = () => {
        let req = {
            method: request.method,
            periods: request.periods,
            endTime: request.endTime.hour() + ':' + request.endTime.minute() + ':' + request.endTime.second(),
            startTime: request.startTime.hour() + ':' + request.startTime.minute() + ':' + request.startTime.second(),
            timeZone: request.timeZone,
            deleteSessions: request.deleteSessions
        }
        requestSettings(req).then(res => {
            if (res.success !== false) {
                controlData('success', 'Se guardó la configuración')
            }
            else {
                controlData('error', 'Ocurrió un error al guardar')
            }
        })
    }

    useEffect(() => {
        setLoading(true)
        getSettings().then((res) => {
            if (res.success !== false) {
                if (res.status === 204) {
                    setRequest(prevState => ({ ...prevState, method: 'POST' }))
                    setLoading(false)
                }
                else {
                    setRequest({ method: 'PUT', periods: res.data.periods, endTime: dayjs("0000-01-01T" + res.data.endTime), startTime: dayjs("0000-01-01T" + res.data.startTime), timeZone: res.data.timeZone, deleteSessions: res.data.deleteSessions })
                    setLoading(false)
                }
            }
        })
    }, [descart])

    return (
        <div className="body row d-flex">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar />
            <Header />
            <Header static={true} />
            <Sidebar />
            <div className="d-flex flex-column justify-content-start pt-4 pr-5 col-9 admin mh-100 align-items-stretch">
                <h2 className="text-left">
                    Configuración de respaldo
                </h2>
                <div className="row d-flex align-items-stretch pt-3 full-h">
                    <div className="col-4 align-self-stretch divider">
                        <SettingsComponent request={request} setRequest={setRequest} type="frecuencia" title="Frequencia del respaldo" text="Seleccione la recurrencia con la que desea iniciar respaldos de sesiónes." />
                        <SettingsComponent request={request} setRequest={setRequest} type="horario" title="Horario de respaldo" text="Seleccione el periodo de tiempo diario en el que desea utilizar internet para hacer el respaldo." />
                        <SettingsComponent request={request} setRequest={setRequest} type="remove" title="Eliminar sesiones de Zoom Cloud" text="Seleccione si desea o no eliminar las sesiones de Zoom Cloud una vez que sean respaldadas existosamente en su repositorio." />
                        <div className="d-flex justify-content-end mb-5">

                            <Button onClick={() => setDescart(!descart)} className='mr-3' variant="contained" color="inherit">
                                Descartar
                            </Button>
                            <Button onClick={() => sendSettings()} variant="contained">
                                Actualizar
                            </Button>
                        </div>
                    </div>
                    <div className="col-8 align-self-stretch">
                        <TableUsers />
                    </div>
                </div>
                <Footer />
            </div>
        </div >
    );
}



export default Settings;