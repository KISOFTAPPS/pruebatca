import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleInicio = () => {
        navigate("/");
    };
    return (
        <nav className="navbar bg-base-100 md:fixed z-50">
            <div className="flex-1">
                <button
                    className="btn btn-ghost normal-case text-xl font-extrabold text-red-600"
                    onClick={handleInicio}
                >
                    TCA
                </button>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to="/">Inicio</NavLink>
                    </li>

                    <li>
                        <NavLink to="/panel">Panel</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
