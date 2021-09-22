import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import "./Header.css"
import logo from "../../assets/logo.svg";
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import BookShow from "../../screens/bookshow/BookShow"
import Modal from "../modals/modal"
import { Alert } from '@material-ui/lab';

// The header consisting of the logo and required buttons
function Header({showLogin, showBookShow}){
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const query = useLocation().search;
  const [alertOn, setAlertOn] = useState(false);

  // function to set the text of the "login" button
  const setText=()=>login? "LOG OUT" : "LOGIN";

  // function to handle clicks on the "login" button
  const handleLogin=()=>{
    let localStorageValue = localStorage.getItem("login");
    if(localStorageValue){
      localStorage.removeItem("login");
      setLogin(false)
      setModalOpen(false);
    }else{
      setModalOpen(true);
    }
  }

  // function to handle closing of the modal
  const close=()=>{
    setModalOpen(false);
  }

  // function to check if user is logged in
  const checkLogin=()=>{
    localStorage.setItem("login", true);
    setLogin(true);
    setModalOpen(false);
    console.log("Congrats, you logged in ");
  }

  // function to allow user to book shows only if the user is logged in 
  const handleBookShow=()=>{
    login ? history.push(`/bookshow${query}`) : setAlertOn(true);
  }
  return(
    <div className="header">
      <img id="logo-img" src={logo} alt= "logo" />
      {/* Alert to be displayed when user tries to book shows without logging in  */}
      {alertOn && <Alert id="alert" onClose={()=>setAlertOn(false)} severity="warning">You should log in to book shows</Alert>}
      <div className="btn-group">
        {showBookShow && (
          <Button
            id="bookshow-btn"
            className="btn"
            color="primary"
            variant="contained"
            onClick={handleBookShow}
            query={query}
          ><Typography>BOOK SHOW</Typography>
          </Button>
        )}
        {showLogin && (
          <Button
            className="btn login-btn"
            color="default"
            variant="contained"
            onClick={handleLogin}
          ><Typography>{setText()}</Typography>
          </Button>
        )}
      </div>
      {/* Modal for login and regster tabs */}
      {modalOpen && <Modal shouldOpen={modalOpen} checkLogin={checkLogin} close={close} />}
    </div>
  )
}

export default Header;