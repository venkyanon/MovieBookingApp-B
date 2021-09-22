import React from "react";
import { ImageList } from '@material-ui/core';
import moviesData from  "../../common/moviesData";
import { ImageListItem } from '@material-ui/core';
import { ImageListItemBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
  },
  title: {
    color: "#fff",
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const SingleLineImageList = function () {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList}  cols={6} rowHeight={180}>
            {moviesData.map((item)=>(
              <ImageListItem key={item.id}>
                <img src={item.poster_url} alt={item.title} />
                <ImageListItemBar 
                  title={item.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </ImageListItem>
            ))}
      </ImageList>
    </div>
  );
}

export default SingleLineImageList;