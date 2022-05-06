import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Header from "../components/Header"
import Footer from '../components/footer';
import Breadcrumb from '../components/session/Breadrumb';
import { Alert, Typography } from '@mui/material';
import SessionMenu from '../components/session/SessionMenu';
import { Paper } from '@mui/material';
import { getItem } from '../utility/localStorageControl';
import Snackbar from '../components/Snackbar';
import Chat from '../components/session/Chat'
import ModalPass from '../components/session/ModalPass';
import ReactPlayer from 'react-player'
import { getSessionById, getChatFile } from '../services/session';

function Session() {

    const { id, otp } = useParams()
    const location = useLocation()

    const [select, setSelect] = useState('Video')
    const [openModal, setOpenModal] = useState(false)
    const [sessionData, setSessionData] = useState({ name: '', user: '', date: '', time: '', idSession: '' })
    const [links, setLinks] = useState([{ name: 'Buscador de Sesiones', link: '/search' }])
    const [alert, setAlert] = useState({ Video: '', Audio: '', Chat: '' })
    const [linkVideo, setLinkVideo] = useState('')
    const [linkAudio, setLinkAudio] = useState('')
    const [fileNames, setFileNames] = useState({ Audio: '', Video: '', Chat: '' })
    const [text, setText] = useState('')

    useEffect(() => {
        if (getItem('westToken') === null || otp !== undefined) {
            setOpenModal(true)
        }
        else {
            getSessionById(id).then(res => {
                if (res.success !== false) {
                    setData(res.data)
                }
                else if (res.error.request.status === 401 || res.error.request.status === 403) {
                    setOpenModal(true)
                }
                else {
                    setAlert({ Video: 'No se ha podido reproducir el archivo de video', Audio: 'No se ha podido reproducir el archivo de audio', Chat: '' })
                }
            })
        }
        if (location.state !== undefined) {
            setLinks([{ name: location.state.prevName, link: location.state.prevPath }])
        }
    }, [])

    const setData = (data) => {
        try {
            let object = JSON.parse(data.filePath)
            let validateVideo = false
            let validateAudio = false
            let secondaryVideo = ''
            let secondaryVideoPath = ''
            let fileNames = {Audio:'', Video:'', Chat:''}
            let cloudFrontDomain = process.env.REACT_APP_CLOUDFRONT_DOMAIN
            for (let i = 0; i < object.length; i++) {
                if (object[i].name.indexOf('shared_screen_with_speaker_view') !== -1) {
                    // Victor H. Olvera modifications start here.
                    const s3LinkVideo = object[i].path
                    const s3DomainUrl = ( new URL( s3LinkVideo ) )
                    const s3Domain = s3DomainUrl.hostname
                    const cloudFrontUrl = s3LinkVideo.replace( s3Domain, cloudFrontDomain )
                    // Victor H. Olvera modifications end here.
                    setLinkVideo(cloudFrontUrl)// Original: setLinkVideo(object[i].path)
                    fileNames={ ...fileNames, Video: object[i].name }
                    validateVideo = true
                }
                if (object[i].name.indexOf('.MP4') !== -1) {
                    secondaryVideo = object[i].name
                    secondaryVideoPath =object[i].path
                }
                if (object[i].name.indexOf('audio_only') !== -1) {
                    setLinkAudio(object[i].path)
                    fileNames={ ...fileNames, Audio: object[i].name }
                    validateAudio = true
                }
                if (object[i].name.indexOf('.TXT') !== -1) {
                    fileNames={ ...fileNames, Chat: object[i].name }
                }
            }
            if (!validateVideo) {
                if (secondaryVideo.length !== 0) {
                    fileNames={ ...fileNames, Video: secondaryVideo }
                    setLinkVideo(secondaryVideoPath)
                }
                else {
                    setAlert({ ...alert, Video: "No se ha podido reproducir el archivo de video" })
                }
            }
            if (!validateAudio) {
                setAlert({ ...alert, Audio: "No se ha podido reproducir el archivo de audio" })
            }
            setFileNames(fileNames)
        } catch (error) {
            setAlert({ Video: 'No se ha podido reproducir el archivo de video', Audio: 'No se ha podido reproducir el archivo de audio', Chat: '' })
        }
        getChatFile(id).then(res => {
            return res.blob()
        }).then(blob => {
            const reader = new FileReader()
            reader.onload = async (e) => {
                setText(e.target.result)
            };
            reader.readAsText(blob)
        }).catch(err => setText(''))
        setSessionData({ name: data.sessionName, user: data.userName, date: data.sessionDate, time: data.duration, idSession: data.idSession })
        setOpenModal(false)
    }

    return (
        <div className="body row d-flex">
            <ModalPass open={openModal} setData={setData} />
            <Snackbar />
            <Header />
            <Header static={true} />
            <div className="col-12 d-flex flex-column justify-content-start">
                <div className="row p-4 pl-5">
                    {getItem('westToken') === null || otp !== undefined ? '' : <Breadcrumb localTitle={sessionData.idSession} links={links} />}
                </div>
                <div className="row pl-5 pr-5 pb-3 divider-bottom">
                    <div className="col-6 p-0  head d-flex flex-column">
                        <Typography className="col" align='left' variant="h4" gutterBottom component="div">
                            {sessionData.name}
                        </Typography>
                        <Typography className="col" align='left' variant="h6" gutterBottom component="div">
                            {sessionData.user}
                        </Typography>
                    </div>
                    <div className="col-6 d-flex head flex-column">
                        <Typography className="col" align='right' variant="h5" gutterBottom component="div">
                            {sessionData.date}
                        </Typography>
                        <Typography className="col" align="right" variant="body1" gutterBottom>
                            {sessionData.time === '' ? '' : "Duración: " + sessionData.time + " min"}
                        </Typography>
                    </div>
                </div>
                <div className="row d-flex align-items-stretch full-h">
                    <div className="col-3 d-flex justify-content-center pb-5 pl-5 pr-5 pt-4" >
                        <SessionMenu id={id} otp={otp} select={select} setSelect={setSelect} download={fileNames[select]} />
                    </div>
                    <div className="col-9 justify-content-center row pr-5">
                        {alert[select].length !== 0 ?
                            (<Alert className="mb-3 mt-3" style={{ width: '1080px', maxHeight: '8%' }} icon={false} severity='error' title='idk'>
                                {alert[select]}
                            </Alert>) : ""}
                        {select === 'Video' ? <ReactPlayer controls config={{ file: { attributes: { controlsList: 'nodownload' } } }} width='1080px' height='720px' url={linkVideo} /> : ''}
                        {console.log(linkVideo)}
                        {select === 'Audio' ? <ReactPlayer controls config={{ file: { attributes: { controlsList: 'nodownload' } } }} width='1080px' url={linkAudio} /> : ''}
                        {select === 'Chat' ?
                            (<Paper className='mt-4 mr-5' variant="outlined" sx={{ width: '100%', minHeight: '100vh' }}>
                                <Chat text={text} />
                            </Paper>)
                            : ''}
                    </div>
                </div>
                <Footer />
            </div>
        </div >
    );
}



export default Session;