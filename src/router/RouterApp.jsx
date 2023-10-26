import {
    Routes,
    Route,
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Inicio from "../pages/publics/Inicio";
import Navbar from "../layoutComponents/Navbar";

import Panel from "../pages/privates/Panel";
import EditEstudiante from "../pages/privates/EditEstudiante";

export const Page404 = () => {
    const navigate = useNavigate();
    const handleInicio = () => {
        navigate("/");
    };
    return (
        <div
            className="hero min-h-screen bg-base-200"
            style={{ backgroundImage: "url(/assets/imgs/404.jpg)" }}
        >
            <div className="hero-overlay bg-opacity-60" />
            <div className="hero-content text-center">
                <div className="max-w-md text-white">
                    <h1 className="text-5xl font-bold drop-shadow">404</h1>
                    <p className="py-6">
                        Lo sentimos, pero parece que te has perdido en el
                        camino. La página que buscas no se encuentra en nuestro
                        sitio web. Esto puede deberse a varios motivos, como un
                        enlace roto o un error tipográfico.
                    </p>
                    <button className="btn btn-primary" onClick={handleInicio}>
                        ir a Inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

const RouterApp = () => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/panel" element={<Panel />} />
                <Route
                    path="/editestudiante/:ide"
                    element={<EditEstudiante />}
                />

                <Route path="*" element={<Page404 />} />
            </Routes>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>
                        Karim I. Sabag Ochoa© 2023 - Esto es una prueba para TCA
                    </p>
                </aside>
            </footer>
        </>
    );
};

export default RouterApp;
