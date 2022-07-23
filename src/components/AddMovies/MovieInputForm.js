import React, { useState } from "react";
import classes from "./MovieInputForm.module.css";

const MovieInputForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredOpeningText, setEnteredOpeningText] = useState("");
  const [enteredReleaseDate, setEnteredReleasedDate] = useState("");

  const titleHandler = (event) => {
    setEnteredTitle(event.target.value);
    console.log(enteredTitle);
  };
  const openingTextHandler = (event) => {
    setEnteredOpeningText(event.target.value);
  };
  const releaseDateHandler = (event) => {
    setEnteredReleasedDate(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const movieData = {
      title: enteredTitle,
      openingText: enteredOpeningText,
      releaseDate: enteredReleaseDate,
    };
    // props.onAdd(movieData);
    console.log(movieData);
    setEnteredTitle("");
    setEnteredOpeningText("");
    setEnteredReleasedDate("");
  };
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="title">Title</label>
      <br />
      <input
        type="text"
        className={classes["title"]}
        value={enteredTitle}
        onChange={titleHandler}
      ></input>
      <br />
      <label htmlFor="Opening text">Opening text</label>
      <br />
      <input
        type="text"
        value={enteredOpeningText}
        onChange={openingTextHandler}
        className={classes["contentBox"]}
      ></input>
      <br />
      <label htmlFor="Release date">Release Date</label>
      <br />
      <input
        type={"date"}
        value={enteredReleaseDate}
        onChange={releaseDateHandler}
      ></input>
      <br />
      <button className={classes.button} type={props.type}>
        Add Movie
      </button>
    </form>
  );
};
export default MovieInputForm;
