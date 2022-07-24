import React, { useState, Fragment, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieInputForm from "./components/AddMovies/MovieInputForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const noRetryHandler = () => {
  //   setNoRetry(true);
  //   // clearInterval(retry);
  // };

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await fetch(
        "https://create-react-movie-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!...retrying");
        // setInterval(() => fetchMoviesHandler, 5000);
      }

      let data = await response.json();
      console.log("in fetchMoviesHan", data);

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      console.log(loadedMovies);
      setLoading(false);
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
      // let retry;

      // if (!noRetry) {
      //   retry = setInterval(fetchMoviesHandler, 5000);

      // } else {
      //   clearInterval(retry);
      //   setLoading(false);
      // }
      // retry = setInterval(fetchMoviesHandler, 5000);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://create-react-movie-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = (
      <Fragment>
        <p>{error}</p>
        {/* <button onClick={noRetryHandler}>stop-retry</button> */}
      </Fragment>
    );
  }
  if (loading) {
    content = <p>Loading...</p>;
  }

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
