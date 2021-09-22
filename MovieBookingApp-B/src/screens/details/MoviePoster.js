import React from 'react';
import moviesData from "../../common/moviesData";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from '@material-ui/core/ImageListItem';
import "./Details.css";

// Dispays the movie poster
function MoviePoster(props) {
  return(
    <ImageList rowHeight={450} cols={1}>
      <ImageListItem key="Demo id">
        <img src={moviesData[props.movieId].poster_url} alt={`${moviesData[props.movieId].title} poster`} />
      </ImageListItem>
    </ImageList>
  )
}

export default MoviePoster;