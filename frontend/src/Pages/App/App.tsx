import "./App.css"
import NavbarButtons from "../../Components/NavbarButtons/NavbarButtons"
import useSWR from "swr"
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { fetcher } from "../../utilities/fetcher";

interface AnimeResult {
  mal_id: number;
  title: string;
  images: {
    jpg?: {
      image_url?: string;
      small_image_url?: string;
      large_image_url?: string;
    };
    webp?: {
      image_url?: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  episodes: number;
  rank: number;
  score: number;
  synopsis: string;
}

interface JikanResponse {
  data: AnimeResult[];
  pagination: {
    has_next_page: boolean;
    last_visible_page: number;
  };
}

type savedCards = {
  mal_id: number;
  title: string;
  image_url: string;
  rank: number;
  score: number;
  synopsis: string;
}

function App() {

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [savedCard, setSavedCard] = useState<savedCards[]>([]);
  const [likedCard, setLikedCard] = useState<savedCards[]>([]);

  const { isLoading, error, data } = useSWR<JikanResponse>
        (debouncedQuery ? `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&limit=12` : null, fetcher);

  useEffect(() => {
    fetchSavedCards();
  }, []);

  const fetchSavedCards = async () => {
    try {
        const response = await axios.get("http://localhost:5002/cards");
        setSavedCard(response.data.map((card: { mal_id: any; title: any; img_url: any; rank: any; score: any; synopsis: any; }) => ({
            mal_id: card.mal_id,
            title: card.title,
            image_url: card.img_url,
            rank: card.rank,
            score: card.score,
            synopsis: card.synopsis
        })));
    } catch(error) {
        console.log("Fehler beim Laden der gespeicherten Karten: ", error);
    }
}

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setIsTyping(true);
    setQuery(query);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      setIsTyping(false);
    }, 500);
  };

  const truncateDescription = (text: string | null | undefined, limit: number) => {
    const safeText = text ?? "";
    const words = safeText.split(" ");

    if(words.length <= limit){
      return safeText;
    }

    return words.slice(0, limit).join(" ") + "...";
  }

  const handleSaveClick = async (card: AnimeResult) => {
    const { mal_id, title, images, rank, score, synopsis } = card;
    const image_url = images.webp?.image_url || "";

    try {
      const response = await axios.post("http://localhost:5002/savedCards", {
        mal_id: mal_id,
        title: title,
        img_url: image_url,
        rank: rank,
        score: score,
        synopsis: synopsis,
      });

      setSavedCard((prev) => [...prev, { mal_id, title, image_url, rank, score, synopsis }]);
    console.log('Karte gespeichert:', response.data);
  } catch (error) {
    console.error('Fehler beim Speichern der Karte:', error);
  }
};

  const handleUnsaveClick = async (mal_id: number) => {
    try {
      const response = await axios.delete(`http://localhost:5002/savedCards/${mal_id}`);
      console.log("Löschantwort: ", response.data);

      setSavedCard((prev) => prev.filter((card) => card.mal_id !== mal_id));
      console.log('Karte gelöscht');
  } catch (error) {
    console.error('Fehler beim Löschen der Karte:', error);
  }
};


  return ( 
    <div className="app">
      <div className="navbar-buttons-container">
        <NavbarButtons/>
      </div>

      <div className="suche-container">
        <div className="suchleiste">
          <input 
          type="text" 
          placeholder="Anime suchen.." 
          className="inputleiste"
          value={query}
          onChange={handleSearch} />
        </div>
      </div>

      <div className="such-ergebnisse">
        { isTyping && <div className="such-anzeige"> Sucht... </div> }
        { error && <div className="fehler-anzeige"> Fehler beim Laden der Seite! </div> }
        { isLoading && <div className="lade-anzeige"> Lade Ergebnisse... </div>}

        { data && data.data.length === 0 && !isTyping && !isLoading && (
          <div className="keineErgebnisse-anzeige"> Es wurden keine Ergebnisse gefunden :-/ </div>
        )}

        { data && data.data.length > 0 && (
          data.data.map((card) => (
            <div className="anime-card" key={card.mal_id}>
              <div className="card-banner">
                <div className="card-options">
                  <button id="fav-button" onClick={() => 
                  savedCard.some((savedCard) => savedCard.mal_id === card.mal_id) ?
                    handleUnsaveClick(card.mal_id) : handleSaveClick(card)}>
                    { likedCard[card.mal_id] ? (
                      <i className='bx bxs-heart' ></i>
                    ) : (
                      <i className='bx bx-heart' ></i>
                    )}
                  </button>

                  <button id="save-button" onClick={() => 
                    savedCard.some((savedCard) => savedCard.mal_id === card.mal_id) ?
                    handleUnsaveClick(card.mal_id) : handleSaveClick(card)}>
                    {savedCard.some((c) => c.mal_id === card.mal_id) ? (
                      <i className='bx bxs-bookmark'></i>
                    ) : (
                      <i className='bx bx-bookmark'></i>
                    )}
                  </button>
                </div>

                <img src={card.images?.webp?.image_url} alt={card.title} />
              </div>

              <div className="card-info">
                <p className="card-title">{card.title}</p>
                <div className="card-scores">
                  { card.score ? <p>Score: <span className="score-span">{card.score}</span></p> : <p>Score: <span className="score-span">--</span></p>}
                  {card.rank ? <p>Platzierung: <span className="rank-span">#{card.rank}</span></p> : <p>Platzierung: <span className="rank-span"> --</span></p>}
                </div>
              </div>

              <div className="card-description">
                { card.synopsis ? <p>{ truncateDescription(card.synopsis, 22) }</p> : <p> Fehler beim Laden der Beschreibung! Es ist Keine Beschreibung vorhanden.</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
