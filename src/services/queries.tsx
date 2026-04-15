import { movieService } from "./handlers";

export const getNowPlayingMoviesQuery = () => {
  return {
    queryKey: ["get-Now-Playing-Movies"],
    queryFn: () => movieService.getNowPlayingMovies(),
  };
};
