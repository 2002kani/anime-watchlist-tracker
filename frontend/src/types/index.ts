
export type savedCards = {
    mal_id: number;
    title: string;
    image_url: string;
    rank: number;
    score: number;
    synopsis: string;
}

export interface AnimeResult {
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

export interface JikanResponse {
    data: AnimeResult[];
    pagination: {
      has_next_page: boolean;
      last_visible_page: number;
    };
}

export interface SavedCardContextType {
  savedCard: savedCards[];
  setSavedCard: React.Dispatch<React.SetStateAction<savedCards[]>>;
}