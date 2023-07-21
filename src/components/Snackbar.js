import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useGlobalState } from '../utility/useGlobalState'
import { Alert } from '@mui/material';

export default function ControlSnackbar() {

    const { control } = useGlobalState()
    const [render, setRender] = useState(0)

    useEffect(() => {
        if (render !== 0) {
            if (control.text !== '' && control.severity !== '') {
                setSeverity(control.severity)
                setText(control.text)
                setOpen(true)
            }
        }
        setRender(1)
    }, [control])

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState()
    const [text, setText] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <div>
            <Snackbar
                className='mt-5'
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
}