import React from "react";
import "./NotFound.css";

const NotFound = () =>{
  return (
    <div className="error-container">
      <h1 id="error">ERROR 404</h1>
      <p id="emoji">&#128564;</p>
      <h4 id="comment">This page is currently on vacation</h4>
    </div>
  )
}

export default NotFound;