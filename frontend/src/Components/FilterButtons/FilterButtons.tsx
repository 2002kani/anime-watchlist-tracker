import "./FilterButtons.css"
import MiniSuchleiste from "../MiniSuchleiste/MiniSuchleiste";
import { useState } from "react";
import { FilterButtonProps } from "../../types";

const FilterButtons: React.FC<FilterButtonProps> = ({ onFilterChange }) => {

    const [activeFilter, setActiveFilter] = useState("neuste");

    const activeFilterUpdate = (filter: string) => {
        setActiveFilter(filter);
        onFilterChange(filter);
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