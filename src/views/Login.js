import React from 'react';
import { useLocation } from 'react-router';
import LoginCard from "../components/login/LoginCard"
import PasswordCard from '../components/login/PasswordCard';
import Logo from "../assets/img/official/img_login.svg"

function Login() {
    const location = useLocation()

    return (
        <div className="login">
            <div className="d-flex align-ites-center justify-content-center flex-column pt-5">
                <div className="justify-items-center">
                    <img alt="Logo" src={Logo} width="300px" />
                </div>
                <h5 className="mt-4 mb-4">Zoom Session Backup</h5>
                <h6>Business Edition</h6>
                <div className="d-flex align-ites-center justify-content-center">
                    {location.pathname.indexOf('/activate-account') === 0 || location.pathname.indexOf('/recover-account') === 0 || location.pathname.indexOf('/change-password') === 0 ?
                        <PasswordCard /> :
                        <LoginCard />}
                </div>
            </div>
            <p className="footer">vPrealfa 1.0. (UXN Fork) © West Telco 2021. <a style={{color:'white'}} href='https://www.westtelco.com.mx/aviso-de-privacidad/' rel='noreferrer' target={"_blank"}> Aviso de Privacidad.</a> Todos los derechos reservados.</p>
        </div >
    );
}

export default Login;