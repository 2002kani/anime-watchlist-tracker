import { useNavigate } from "react-router-dom";
import "./NavbarButtons.css"
import { useLocation } from "react-router-dom";

const NavbarButtons = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
    return(
        <div className="navbar-buttons">
            <button 
            className={ location.pathname === "/" ? "active" : "" }
            onClick={() => navigate("/")}>
                Suche
            </button>
                <span className="separator"></span>
            <button 
            className={ location.pathname === "/Meine-Liste" ? "active" : "" }
            onClick={() => navigate("/Meine-Liste")}>
                Sammlung
            </button>
                <span className="separator"></span>
            <button
            className={ location.pathname === "/Favoriten" ? "active" : "" }
            onClick={() => navigate("/Favoriten")}>
                Favoriten
            </button>
        </div>
    );
}

export default NavbarButtons