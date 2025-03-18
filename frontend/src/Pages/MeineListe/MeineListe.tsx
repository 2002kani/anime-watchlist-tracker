import "./MeineListee.css"
import NavbarButtons from "../../Components/NavbarButtons/NavbarButtons";
import FilterButtons from "../../Components/FilterButtons/FilterButtons";
import { useEffect } from "react";
import { fetcher } from "../../utilities/fetcher";
import useSWR from "swr";

const MeineListe = () => {

    const { isLoading, error, data } = useSWR("http:localhost:5002/cards");

    useEffect(() => {

    }, []);

    return(
        <div className="meine-liste">
            <div className="navbar-buttons-container">
                <NavbarButtons />
            </div>

            <div className="liste-container">
                <h1> Meine Liste </h1>
            </div>

            <div className="filter-container">
                <FilterButtons />
            </div>

            <div className="sammlung-container">
                { !data && }
            </div>
        </div>
    );
}

export default MeineListe