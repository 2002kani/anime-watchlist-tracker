import { useNavigate } from "react-router-dom";
import "./NavbarButtons.css"


const NavbarButtons = () => {

    const navigate = useNavigate();
    
    return(
        <div className="navbar-buttons">
            <button onClick={() => navigate("/")}>Suche</button>
                <span className="separator"></span>
            <button onClick={() => navigate("/Meine-Liste")}>Meine Liste</button>
                <span className="separator"></span>
            <button onClick={() => navigate("/Favoriten")}>Favoriten</button>
        </div>
    );
}

export default NavbarButtons