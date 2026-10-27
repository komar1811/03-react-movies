import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (formData: FormData) => {
    const query = formData.get("query") as string;
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);
      const fetchedMovies = await fetchMovies(query);
      setMovies(fetchedMovies);
      if (fetchedMovies.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {!isError ? (
        <MovieGrid onSelect={setSelectedMovie} movies={movies} />
      ) : (
        <ErrorMessage />
      )}
      {selectedMovie && (
        <MovieModal
          onClose={() => {
            setSelectedMovie(null);
          }}
          movie={selectedMovie}
        />
      )}
      <Toaster />
    </div>
  );
}

export default App;
