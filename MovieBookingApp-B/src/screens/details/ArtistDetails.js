import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import moviesData from "../../common/moviesData";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";

// Displays rating bar and artists details
function ArtistDetails(props) {
  const [starColor, setStarColor] = useState(["black", "black", "black", "black", "black"])
  // function to enable rating
  const setColor = (index) =>{
    let newArr = ["black", "black", "black", "black", "black"];
    let i = index;
    while(i >= 0){
      newArr[i] = "yellow";
      i--;
    }
    setStarColor([...newArr]);
  }
  return(
    <>
      <Typography>
        <strong>Rate this movie:</strong>
      </Typography>
      <StarBorderIcon className="rate-star" style={{color: starColor[0]}} onClick={()=>setColor(0)}/>
      <StarBorderIcon className="rate-star" style={{color: starColor[1]}} onClick={()=>setColor(1)}/>
      <StarBorderIcon className="rate-star" style={{color: starColor[2]}} onClick={()=>setColor(2)}/>
      <StarBorderIcon className="rate-star" style={{color: starColor[3]}} onClick={()=>setColor(3)}/>
      <StarBorderIcon className="rate-star" style={{color: starColor[4]}} onClick={()=>setColor(4)}/>
      <Typography
        style={{margin: "16px 0 16px 0"}}  
      ><strong>Artists: </strong>
      </Typography>
      <ImageList cols={2} gap={5}>
        {moviesData[props.movieId].artists.map((item)=>(
          <ImageListItem key={item.id}>
            <img src={item.profile_url} alt={item.first_name + " " + item.last_name} />
            <ImageListItemBar
              title={item.first_name + " " + item.last_name}
            />
      </ImageListItem>
      ))}
    </ImageList>
    </>
  )
}

export default ArtistDetails;