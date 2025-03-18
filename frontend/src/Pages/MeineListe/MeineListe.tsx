import "./MeineListee.css"
import NavbarButtons from "../../Components/NavbarButtons/NavbarButtons";
import FilterButtons from "../../Components/FilterButtons/FilterButtons";
import { fetcher } from "../../utilities/fetcher";
import useSWR from "swr";
import { truncateDescription } from "../../utilities/truncate";

const MeineListe = () => {

    const { isLoading, error, data } = useSWR("http://localhost:5002/cards", fetcher);

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
            { error && <h3> Fehler beim Laden der Seite! </h3> }
            { isLoading && <h3> Lade Ergebnisse... </h3>}

            {data ? (
                data.map((card: ({ mal_id: number; title: string; img_url: string; rank: number; score: number; synopsis: string; })) => (
                    <div className="sammlung-card" key={card.mal_id}>
                        <div className="left-side">
                            <img src={card.img_url} alt={card.title} className="sammlung-img" />
                            <h3>{card.title}</h3>
                        </div>
                        <div className="right-side">
                            <div className="details-top">
                                { card.synopsis ? <p>{truncateDescription(card.synopsis, 20)}</p> : <p> Fehler beim Laden der Beschreibung! Es ist Keine Beschreibung vorhanden.</p> }
                            </div>
                            <div className="details-bottom">
                                <p> Platzierung: <span>{card.rank}</span></p>
                                <p> Score: <span>{card.score}</span> </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h3> Du hast bisher noch keine Anime in deiner Sammlung.. </h3>
            )}
            </div>
        </div>
    );
}

export default MeineListe