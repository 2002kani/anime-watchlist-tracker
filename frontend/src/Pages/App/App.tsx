import "./App.css"
import NavbarButtons from "../../Components/NavbarButtons/NavbarButtons"
import useSWR from "swr"
import { useState, useRef } from "react";

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

type CardStatus = {
[mal_id: number]: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [savedCard, setSavedCard] = useState<CardStatus>({});
  const [likedCard, setLikedCard] = useState<CardStatus>({});

  const { isLoading, error, data } = useSWR<JikanResponse>
        (debouncedQuery ? `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&limit=12` : null, fetcher);

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

  const handleLikeClick = (mal_id: number) => {
    setLikedCard((prev) => ({
      ...prev, [mal_id]: !prev[mal_id],
    }));
  }

  const handleSaveClick = (mal_id: number) => {
    setSavedCard((prev) => ({
      ...prev, [mal_id]: !prev[mal_id],
    }));
  }
  

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
                  <button id="fav-button" onClick={() => handleLikeClick(card.mal_id)}>
                    { likedCard[card.mal_id] ? (<i className='bx bxs-heart' ></i>) : (<i className='bx bx-heart' ></i>) }
                  </button>
                  <button id="save-button" onClick={() => handleSaveClick(card.mal_id)}>
                    { savedCard[card.mal_id] ? (<i className='bx bxs-bookmark'></i>) : (<i className='bx bx-bookmark'></i>) }
                  </button>
                </div>
                <img src={card.images?.webp?.image_url} alt={card.title} />
              </div>
              <div className="card-info">
                <p className="card-title">{card.title}</p>
                {/*<p>{card.episodes}</p>*/}
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
