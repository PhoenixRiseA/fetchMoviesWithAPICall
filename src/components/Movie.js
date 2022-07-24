import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  async function deleteMovieHandler() {
    console.log("In delete Handler", props.id);
    const response = await fetch(
      `https://create-react-movie-default-rtdb.firebaseio.com/movies/${props.id}.json`,
      {
        method: "DELETE",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deleteMovieHandler}>del</button>
    </li>
  );
};

export default Movie;
