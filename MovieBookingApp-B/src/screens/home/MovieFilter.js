import React, { useReducer } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import genres from "../../common/genre";
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import artists from "../../common/artists";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createTheme } from '@material-ui/core/styles';

const initialState = {
  movieName : "",
  genre : [],
  artist : [],
  releaseDateStart : '',
  releaseDateEnd : '',
}
const CHANGE_NAME = "CHANGE_NAME";
const CHANGE_GENRE = "CHANGE_GENRE";
const CHANGE_ARTIST = "CHANGE_ARTIST";
const CHANGE_STARTDATE = "CHANGE_STARTDATE";
const CHANGE_ENDDATE = "CHANGE_ENDDATE";

const formReducer = (state=initialState, action)=>{
  switch(action.type){
    case CHANGE_NAME : return {...state, [action.name] : action.value};
    case CHANGE_GENRE : return {...state, [action.name] : action.value};
    case CHANGE_ARTIST : return {...state, [action.name] : action.value};
    case CHANGE_STARTDATE : return {...state, [action.name] : action.value};
    case CHANGE_ENDDATE : return {...state, [action.name] : action.value};
    default : return state;
  }
}
const actionCreator = (component, event)=>{
  const {name, value} = event.target;
  switch(component){
    case "name" : return {type : CHANGE_NAME, name, value,};
    case "genre" : return {type : CHANGE_GENRE, name, value,};
    case "artist" : return {type : CHANGE_ARTIST, name, value,};
    case "startDate" : return {type : CHANGE_STARTDATE, name, value,};
    case "endDate" : return {type : CHANGE_ENDDATE, name, value,};
    default : return {type : "DO_NOTHING", name, value,};
  }
}

function MovieFilter({func}){
  const [formContent, dispatchForm] = useReducer(formReducer,initialState);

  //Function to determine the display of the values selected
  const renderInside = (item) =>{
    return formContent[item].length > 1 ? formContent[item].join(", ") : formContent[item];
  }
  
  let theme = createTheme();
  let titleColor = theme.palette.primary.light;
  let componentMargin = theme.spacing(1);
  let componentStyle={
    minWidth: 240,
    maxWidth: 240,
    margin: componentMargin
  }
  return (
    <Card>
      <CardHeader style={{...componentStyle, color: titleColor}}title="FIND MOVIES BY: "/>
      <CardContent>
        <FormControl style={componentStyle}>
        <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
        <Input id="movie-name" name="movieName" value={formContent.movieName} onChange={(e)=>dispatchForm(actionCreator("name", e))} aria-describedby="enter-movie-name" />
        </FormControl>
        <br/>
        <FormControl style={componentStyle}>
          <InputLabel htmlFor="genres-list">Genres</InputLabel>
          <Select
            onChange={(e)=>dispatchForm(actionCreator("genre", e))}
            value={formContent.genre}
            inputProps={{
              name: "genre",
              id: "genres-list"
            }}
            multiple
            renderValue={()=>renderInside("genre")}
            autoWidth={true}
            >
              {genres.map((item, index)=>(
                <MenuItem
                  key={item.id}
                  label={item.name}
                  value={item.name}
                >{<Checkbox key={index} name={item.name} value={item.name} checked={formContent.genre.includes(item.name)} />}{item.name}
                </MenuItem>
              ))}
             </Select>
        </FormControl>
        <br />
        <FormControl style={componentStyle}>
          <InputLabel htmlFor="artists-list">Artists</InputLabel>
          <Select
            onChange={(e)=>dispatchForm(actionCreator("artist", e))}
            value={formContent.artist}
            inputProps={{
              name: "artist",
              id: "artists-list"
            }}
            multiple
            renderValue={()=>renderInside("artist")}
            autoWidth={true}
            >
              {artists.map((item, index)=>(
                <MenuItem
                  key={item.id}
                  label={item.first_name}
                  value={item.first_name + " " + item.last_name}
                >{<Checkbox key={index} name={item.first_name} value={item.first_name} checked={formContent.artist.includes(item.first_name + " " + item.last_name)} />}{item.first_name + " " + item.last_name}
                </MenuItem>
              ))}
             </Select>
        </FormControl>
        <br />
        <FormControl style={componentStyle}>
          <TextField
            label ="Release Date Start"
            InputLabelProps={{shrink: true}}
            type="date"
            name="releaseDateStart"
            onChange={(e)=>dispatchForm(actionCreator("startDate", e))}
            value={formContent.releaseDateStart}
            />
        </FormControl>
        <FormControl style={componentStyle}>
          <TextField
            label ="Release Date End"
            InputLabelProps={{shrink: true}}
            type="date"
            name="releaseDateEnd"
            onChange={(e)=>dispatchForm(actionCreator("endDate", e))}
            value={formContent.releaseDateEnd}
            />
        </FormControl>
        <br />
        <Button
          variant="contained"
          color="primary"
          style={componentStyle}
          onClick={()=>func(formContent)}
        >APPLY</Button>
      </CardContent>
    </Card>
  )
}

export default MovieFilter;