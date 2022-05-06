import React from 'react';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DownloadIcon from '@mui/icons-material/Download';
import { ListItemButton } from '@mui/material';
import ShareForm from './ShareForm'
import { getItem } from '../../utility/localStorageControl'

const base_url = process.env.REACT_APP_URL;

export default function SessionMenu(props) {

    return (
        <Paper variant='outlined' sx={{ height: 'fit-content', width: '100%', maxWidth: '100%' }}>
            <List>
                <div className="col-12 pl-4 d-flex justify-content-start side-title list">

                    <Typography variant="body1" gutterBottom>ARCHIVOS DE LA SESIÓN</Typography>
                </div>
                <ListItemButton selected={props.select === 'Video'} onClick={() => props.setSelect('Video')} className="list" >
                    <ListItemIcon> <OndemandVideoIcon /></ListItemIcon>
                    <ListItemText
                        disableTypography
                        primary={<Typography variant="body1" gutterBottom>Video/Audio</Typography>}
                    />
                </ListItemButton>
                <ListItemButton selected={props.select === 'Audio'} onClick={() => props.setSelect('Audio')} className="list" >
                    <ListItemIcon> <MusicNoteIcon /></ListItemIcon>
                    <ListItemText
                        disableTypography
                        primary={<Typography variant="body1" gutterBottom>Audio</Typography>}
                    />
                </ListItemButton>
                {getItem('westToken') === null || props.otp !== undefined ? '' :
                    <ListItemButton selected={props.select === 'Chat'} onClick={() => props.setSelect('Chat')} className="list" >
                        <ListItemIcon> <ChatBubbleOutlineIcon /></ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={<Typography variant="body1" gutterBottom>Chat</Typography>}
                        />
                    </ListItemButton>
                }
            </List>
            {getItem('westToken') === null || props.otp !== undefined ? '' :
                <>
                    <div className="col-12 pl-4 d-flex justify-content-start side-title list">
                        OPCIONES
                    </div>
                    <List className="pb-3">
                        {props.download.length !== 0 ?
                            <a className='no-format' href={base_url + "file/" + props.id + "/" + props.download} download>
                                <ListItemButton className="list"  >
                                    <ListItemIcon> <DownloadIcon /></ListItemIcon>
                                    <ListItemText
                                        disableTypography
                                        primary={<Typography variant="body1">Descargar archivo</Typography>}
                                    />
                                </ListItemButton>
                            </a> 
                            : '' }
                                <ShareForm id={props.id} />
                    </List>
                </>}
        </Paper>
    );
}