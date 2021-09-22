import Typography from "@material-ui/core/Typography";
import React from "react";
import YouTube from "react-youtube";
import moviesData from "../../common/moviesData";
import "./Details.css";

// Displays movie info and trailer
function MovieTrailer(props) {
  let topMargin = {marginTop: 16};
  // function to convert date onject to string format
  const dateConverter=dateEntry=>{
    let myDate = new Date(dateEntry);
    return myDate.toDateString();
  }
  const ready = (event) => {
    event.target.pauseVideo();
  }
  return(
    <>
      <Typography
        variant="h6"
        component="h2"
        color="primary"
      >
        {moviesData[props.movieId].title.toLocaleUpperCase()}
      </Typography>
      <Typography>
        <strong>Genre: </strong>
        {moviesData[props.movieId].genres.join(", ")} 
      </Typography>
      <Typography>
        <strong>Duration: </strong>
        {moviesData[props.movieId].duration + " min"} 
      </Typography>
      <Typography>
        <strong>Release Date: </strong>
        {dateConverter(moviesData[props.movieId].release_date)} 
      </Typography>
      <Typography>
        <strong>Rating: </strong>
        {moviesData[props.movieId].critics_rating} 
      </Typography>
      <Typography style={topMargin}>
        <strong>Plot: </strong>
        <a href={moviesData[props.movieId].wiki_url}>[Wiki Link]</a>
        {moviesData[props.movieId].storyline} 
      </Typography>
      <Typography style={topMargin}>
        <strong>Trailer: </strong>
      </Typography>
      <YouTube className="trailer"
        videoId={moviesData[props.movieId].trailer_url.split("?v=")[1]}
        onReady={ready}
        id="sY1S34973zA"
      />
    </>
  )
}
export default MovieTrailer;