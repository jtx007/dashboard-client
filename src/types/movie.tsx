export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Date {
  maximum: string;
  minimum: string;
}

export interface MovieListResponse {
  date: Date;
  page: number | 0;
  results: Movie[];
  total_pages: number | 0;
  total_results: 0;
}
