import React from 'react';
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from '../components/footer';
import UserPanel from "../components/admin/UserPanel"
import Snackbar from "../components/Snackbar"

function Users() {

    return (
        <div className="body row d-flex">
            <Snackbar />
            <Header />
            <Header static={true} />
            <Sidebar />
            <div className="d-flex flex-column justify-content-start pt-4 pr-5 col-9 align-items-stretch">
                <h2 className="text-left">
                    Gestión de usuarios
                </h2>
                <div className="row d-flex align-items-stretch full-h">
                    <div className="col-12 align-self-stretch">
                        <UserPanel title="Usuarios" btn="AÑADIR USUARIO" text="Los usuarios añadidos en esta lista tendrán acceso exclusivamente a las sesiones de Zoom que hayan creado ellos como anfitrion. Podrán descargar localmente los archivos de la sesión y compartirlas con terceras personas." />
                    </div>
                </div>
                <Footer />
            </div>
        </div >
    );
}



export default Users;