import React from 'react';
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from '../components/footer';
import AdminPanel from "../components/admin/AdminPanel"
import Snackbar from "../components/Snackbar"

function Admin() {

    return (
        <div className="body row d-flex">
            <Snackbar />
            <Header />
            <Header static={true} />
            <Sidebar />
            <div className="d-flex flex-column justify-content-start pt-4 pr-5 col-9 align-items-stretch">
                <h2 className="text-left">
                    Gestión de administradores
                </h2>
                <div className="row d-flex align-items-stretch full-h">
                    <div className="col-4 align-self-stretch divider">
                        <AdminPanel title="Roles" btn="AÑADIR ROL" text="Añade roles para tener grupos de usuarios preestablecidos y asignarlos a los usuarios administradores" />
                    </div>
                    <div className="col-8 align-self-stretch">
                        <AdminPanel title="Administradores" btn="AÑADIR NUEVO ADMINISTRADOR" text="Los administradores creados tendrán acceso a la plataforma con su propio usuario y contraseña. Estos usuarios sólo podrán buscar, visualizar y compartir sesiones respaldadas pertenecientes al grupo de usuarios definidos en su rol." />
                    </div>
                </div>
                <Footer />
            </div>
        </div >
    );
}



export default Admin;