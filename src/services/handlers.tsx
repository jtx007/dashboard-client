const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
import type { MovieListResponse } from "@/types";

// query params include, language and page

export const movieService = {
  getNowPlayingMovies: async (): Promise<MovieListResponse> => {
    const res = await fetch(`${BASE_URL}/3/movie/now_playing?`, {
      headers: {
        Authorization: `${API_KEY}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Failed to fetch movies currently playing");
    }
    const data: MovieListResponse = await res.json();
    return data;
  },
};
