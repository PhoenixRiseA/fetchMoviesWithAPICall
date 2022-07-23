import React, { useState, Fragment, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieInputForm from "./components/AddMovies/MovieInputForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noRetry, setNoRetry] = useState(false);

  const noRetryHandler = () => {
    setNoRetry(true);
    // clearInterval(retry);
  };

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong!...retrying");
        // setInterval(() => fetchMoviesHandler, 5000);
      }

      let data = await response.json();

      let transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setLoading(false);
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      let retry;

      if (!noRetry) {
        retry = setInterval(fetchMoviesHandler, 5000);
      } else {
        clearInterval(retry);
      }
      retry = setInterval(fetchMoviesHandler, 5000);
    }
    setLoading(false);
  }, [noRetry]);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = (
      <Fragment>
        <p>{error}</p>
        <button onClick={noRetryHandler}>stop-retry</button>
      </Fragment>
    );
  }
  if (loading) {
    content = <p>Loading...</p>;
  }

  const addMovieHandler = (event) => {
    // setMovies((prevMovies) => {
    //   return [movie, ...prevMovies];
    // });
    // event.preventDefault();
    console.log(event.target.value);
  };
  return (
    <React.Fragment>
      <MovieInputForm onAdd={addMovieHandler} type={"submit"} />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
