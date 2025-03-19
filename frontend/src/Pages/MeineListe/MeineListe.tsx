import "./MeineListee.css"
import NavbarButtons from "../../Components/NavbarButtons/NavbarButtons";
import FilterButtons from "../../Components/FilterButtons/FilterButtons";
import useSWR from "swr";
import { fetcher } from "../../utilities/fetcher";
import { truncateDescription } from "../../utilities/truncate";

const MeineListe = () => {

    const { isLoading, error, data } = useSWR("http://localhost:5002/cards", fetcher);

    return(
        <>
            <div className="navbar-buttons-container">
                <NavbarButtons />
            </div>
            
            <div className="meine-liste">
                <div className="top-container">
                    <div className="liste-container">
                        <h1> Meine Liste </h1>
                    </div>
                    <div className="filter-container">
                        <FilterButtons />
                    </div>
                </div>

                <div className="sammlung-container">
                    { error && <h3> Fehler beim Laden der Seite! </h3> }
                    { isLoading && <h3> Lade Ergebnisse... </h3> }
                    { !data && <h1> Du hast noch keine Anime in deiner Sammlung! </h1> }
                <ul>
                    {data ? (
                        data.map((card: ({ mal_id: number; title: string; img_url: string; rank: number; score: number; synopsis: string; })) => (
                        <li key={card.mal_id}>
                            <div className="sammlung-card">
                                <div className="left-side">
                                    <div className="card-updaten">
                                        <button id="sammlung-fav-button">
                                            <i className='bx bx-heart'/>
                                        </button>
                                        <button id="sammlung-save-button">
                                            <i className='bx bxs-bookmark'/>
                                        </button>
                                    </div>
                                    <img src={card.img_url} alt={card.title} className="sammlung-img" />
                                    <h3>{card.title}</h3>
                                </div>
                                <div className="right-side">
                                    <div className="details-top">
                                        { card.synopsis ? <p>{truncateDescription(card.synopsis, 26)}</p> : <p> Fehler beim Laden der Beschreibung! Es ist Keine Beschreibung vorhanden.</p> }
                                    </div>
                                    <div className="details-bottom">
                                        <p> Platzierung: <span>#{card.rank}</span></p>
                                        <p> Score: <span>{card.score}</span> </p>
                                    </div>
                                </div>
                                <div className="far-right-side">
                                    <p id="top">Bewertung: </p>
                                    <p id="bottom"> <span> 8 </span> / 10 <i className='bx bx-edit'></i> </p>
                                </div>
                            </div>
                        </li>
                        ))
                    ) : ( <h3> Du hast bisher noch keine Anime in deiner Sammlung.. </h3> )}
                </ul>
                </div>
            </div>
        </>
    );
}

export default MeineListe