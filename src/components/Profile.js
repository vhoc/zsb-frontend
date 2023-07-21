import React from 'react';
import { useHistory } from 'react-router';
import { blue } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { removeItem, getItem } from '../utility/localStorageControl';

const company_name = process.env.REACT_APP_NAME

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


export default function Profile(props) {

    let user = getItem('westUser')
    user = (typeof user === 'undefined' || user === null) ? { userName: '' } : user


    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        removeItem('westToken')
        removeItem('westUser')
        history.push('/')
    }

    return (
        <div className="col-6 d-flex justify-content-end">
            {props.anonymus ?
                <div className="col-9 d-flex align-items-center justify-content-end pr-0 profile-sub">
                    {company_name !== undefined ? company_name : 'Compañia Demo'}
                </div>
                :
                <div className="col-9 d-flex align-items-end flex-column pr-0">
                    <div className="d-flex align-items-end justify-content-end profile-title">
                        {user.userName}
                    </div>
                    <div className="d-flex align-items-end justify-content-end profile-sub">
                        {company_name !== undefined ? company_name : 'Compañia Demo'}
                    </div>
                </div>}
            {props.anonymus ?
                <Button className='p-0'>
                    <Avatar sx={{ bgcolor: blue[500] }} className="profile-icon p-0" variant="rounded">
                        {company_name[0].toUpperCase() + company_name[1].toUpperCase()}
                    </Avatar>
                </Button> :
                <Button onClick={handleClick} className='p-0'>
                    <Avatar sx={{ bgcolor: blue[500] }} className="profile-icon p-0" variant="rounded">
                        {user.userName.lenght <= 2 ? 'U' : user.userName[0] + user.userName[1]}
                    </Avatar>
                </Button>}
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={logout} disableRipple>
                    <LogoutIcon />
                    Cerrar sesión
                </MenuItem>
                <MenuItem onClick={() => history.push('/change-password/' + user.userId)} disableRipple>
                    <SettingsIcon />
                    Cambiar contraseña
                </MenuItem>
            </StyledMenu>
        </div>
    );
}