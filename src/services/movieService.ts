import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const options = {
    params: {
      query: query,
    },
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_TMDB_TOKEN,
    },
  };
  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    options,
  );
  return response.data.results;
};

export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  const options = {
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_TMDB_TOKEN,
    },
  };
  const response = await axios.get<Movie>(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    options,
  );
  return response.data;
};
