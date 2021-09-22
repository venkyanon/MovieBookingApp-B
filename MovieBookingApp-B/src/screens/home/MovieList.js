import React from "react";
import { ImageList } from '@material-ui/core';
import moviesData from  "../../common/moviesData";
import { ImageListItem } from '@material-ui/core';
import { ImageListItemBar } from '@material-ui/core';
import { Link } from "react-router-dom";


function MovieList({parameters: {artist, genre, movieName, releaseDateStart, releaseDateEnd}}){

  // converting date object to string format
  const dateConverter=dateEntry=>{
    let myDate = new Date(dateEntry);
    return myDate.toDateString();
  }

  // converting date from string to its numeric value for the purposes of comparison
  const getDateTime=date=>{
    let newDate = new Date(date);
    return newDate.getTime();
  }
  let filteredMovies = [...moviesData];
  // filtering by movie title
  if(movieName.length > 0){
    filteredMovies = filteredMovies.filter((item)=>item.title.toLowerCase().includes(movieName.toLowerCase()));
  }
  // filtering by genres
  if(genre.length > 0){
    filteredMovies = filteredMovies.filter((item)=>item.genres.some((element)=>genre.includes(element)));
  }
  // filtering by artists
  if(artist.length > 0){
    filteredMovies = filteredMovies.filter((item)=>item.artists.some(element=>artist.includes(element.first_name + " " + element.last_name)))
  }
  // filtering by release date post the date selected
  if(releaseDateStart.length > 0){
    filteredMovies = filteredMovies.filter((item)=>getDateTime(item.release_date) >= getDateTime(releaseDateStart));
  }
  // filtering by release date prior to date selected
  if(releaseDateEnd.length > 0){
    filteredMovies = filteredMovies.filter((item)=>getDateTime(item.release_date) <= getDateTime(releaseDateEnd));
  }
  return (
    <ImageList rowHeight={350} cols={4} gap={10}>
      {filteredMovies.map((item, index)=>(
        <ImageListItem key={item.id}>
          <Link to={`/detail?id=${index}`}>
          <img className="img-link" src={item.poster_url} alt={item.title} />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>{"Release Date:  " + dateConverter(item.release_date)}</span>}
          />
          </Link>
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default MovieList;