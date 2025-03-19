import "./FilterButtons.css"
import MiniSuchleiste from "../MiniSuchleiste/MiniSuchleiste";

const FilterButtons = () => {
    return(
        <div className="filter-container">
            <div className="filter-left">
                <button> Neusten </button>
                <button> Ältesten </button>
                <button> Favorisierte </button>
            </div>
            <div className="filter-right">
                <MiniSuchleiste />
            </div>
        </div>
    );
}

export default FilterButtons