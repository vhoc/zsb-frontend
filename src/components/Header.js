import React from 'react';
import { useHistory } from 'react-router';
import Profile from "../components/Profile"
import Logo from "../assets/img/official/img_header.svg"
import { getItem } from '../utility/localStorageControl';
import { Redirect, useLocation } from 'react-router';


function Header(props) {

    const history = useHistory()
    const location = useLocation()

    return (
        <div className={`App-header col-12 p-2 pt-3 pb-3 ${props.static ? "" : "fixed-top"}`}>
            {getItem('westToken') === null && location.pathname.indexOf('/session') === -1 ? <Redirect to='/' /> : ''}
            <div className='row'>
                <div className="col d-flex align-items-center justify-content-start align-self-center">
                    <div className="header-logo">
                        <a onClick={() => history.push('/search')} href="search">
                            <img alt="Logo" src={Logo} className="img-logo" />
                        </a>
                    </div>
                    <div className="col-5 d-flex align-items-center hd-txt">
                        Zoom Session Backup
                    </div>
                </div>
                <div className="col d-flex align-items-center justify-content-end align-self-center ">
                    <Profile anonymus={getItem('westToken') === null && location.pathname.indexOf('/session') !== -1 ? true : false} />
                </div>
            </div>
        </div >
    );
}

export default Header;