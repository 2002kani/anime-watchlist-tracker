import "./FilterButtons.css"
import MiniSuchleiste from "../MiniSuchleiste/MiniSuchleiste";
import { useState } from "react";

const FilterButtons = () => {

    const [activeFilter, setActiveFilter] = useState("neuste");

    const activeFilterUpdate = (filter: string) => {
        setActiveFilter(filter)
    }

    return(
        <div className="filter-container">
            <div className="filter-left">
                <button className={activeFilter === "neuste" ? "active" : ""}
                        onClick={() => activeFilterUpdate("neuste")}>
                    Neuste
                </button>
                <button className={activeFilter === "älteste" ? "active" : ""}
                        onClick={() => activeFilterUpdate("älteste")}>
                    Älteste
                </button>
                <button className={activeFilter === "favorisierte" ? "active" : ""}
                        onClick={() => activeFilterUpdate("favorisierte")}>
                    Favorisierte
                </button>
            </div>
            <div className="filter-right">
                <MiniSuchleiste />
            </div>
        </div>
    );
}

export default FilterButtons