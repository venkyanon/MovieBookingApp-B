import React, { useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import MovieList from "./MovieList";
import MovieFilter from "./MovieFilter";
import SingleLineImageList from "./SingleLineImageList";

function Home(){
  const [artist, setArtist] = useState([]);
  const [genre, setGenre] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [releaseDateStart, setReleaseDateStart] = useState("");
  const [releaseDateEnd, setReleaseDateEnd] = useState("");

  // setting the state corresponding to filters set up in the MovieFilter component
  const copyState=(otherState)=>{
    setArtist([...otherState.artist]);
    setGenre([...otherState.genre]);
    setMovieName(otherState.movieName);
    setReleaseDateStart(otherState.releaseDateStart);
    setReleaseDateEnd(otherState.releaseDateEnd);
  }
  return(
    <div id="home-main">
      <Header showLogin={true} showBookShow={false} />
      <span id="upcoming-mov">Upcoming Movies</span>
      <SingleLineImageList />
      <div className="flex-container">
        <div className="left">
          <MovieList parameters={{artist: [...artist], genre: [...genre], movieName, releaseDateStart, releaseDateEnd}} />
        </div>
        <div className="right">
          <MovieFilter func={copyState} />
        </div>
      </div>
    </div>
  )
}

export default Home;