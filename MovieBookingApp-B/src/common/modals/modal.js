import { AppBar, Tabs, Tab, Box, Typography, FormControl, TextField, Button } from "@material-ui/core";
import React, { useState, useReducer } from "react";
import ReactModal from "react-modal";
import "./modal.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(()=>({
  root :{
    marginTop : "10%",
  }
}))

const modalStyle = {
  content :{
    height : "max-content",
    width : "max-content",
    margin : "auto",
  }
}

// function to dislay the selected tab content inside the modal
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div" >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const initialState ={
  username : "",
  password : "",
  tabValue : 0,
  firstName : "",
  lastName : "",
  email : "",
  regPassword : "",
  number : "",
  validate : false,
}

const CHANGE_LOGIN_USERNAME = "CHANGE_LOGIN_USERNAME";
const CHANGE_LOGIN_PASSWORD = "CHANGE_LOGIN_PASSWORD";
const CHANGE_TAB_VALUE = "CHANGE_TAB_VALUE";
const CHANGE_FIRST_NAME = "CHANGE_FIRST_NAME";
const CHANGE_LAST_NAME = "CHANGE_LAST_NAME";
const CHANGE_EMAIL = "CHANGE_EMAIL"
const CHANGE_REG_PASSWORD = "CHANGE_REG_PASSWORD";
const CHANGE_NUMBER = "CHANGE_NUMBER";
const USERNAME = "USERNAME";
const PASSWORD = "PASSWORD";
const EMAIL = "EMAIL";
const REGPASSWORD = "REGPASSWORD";
const NUMBER = "NUMBER";
const FIRSTNAME = "FIRSTNAME";
const LASTNAME = "LASTNAME";
const VALIDATE = "VALIDATE";

const formReducer=(state, action)=>{
  switch(action.type){
    case CHANGE_LOGIN_USERNAME : return {...state, username : action.username};
    case CHANGE_LOGIN_PASSWORD : return {...state, password : action.password};
    case CHANGE_TAB_VALUE : return {...state, tabValue : action.tabValue};
    case CHANGE_FIRST_NAME : return {...state, firstName : action.firstName};
    case CHANGE_LAST_NAME : return {...state, lastName : action.lastName};
    case CHANGE_EMAIL : return {...state, email : action.email};
    case CHANGE_REG_PASSWORD : return {...state, regPassword : action.regPassword};
    case CHANGE_NUMBER : return {...state, number : action.number};
    case VALIDATE : return {...state, validate : true}
    default : return state;
  }
}

const formActionCreator =(event, component) =>{
  const {name, value} = event.target;
  switch(component){
    case USERNAME : return {type : CHANGE_LOGIN_USERNAME, username : value};
    case PASSWORD : return {type : CHANGE_LOGIN_PASSWORD, password : value};
    case FIRSTNAME : return {type : CHANGE_FIRST_NAME, firstName : value};
    case LASTNAME : return {type : CHANGE_LAST_NAME, lastName : value};
    case EMAIL : return {type : CHANGE_EMAIL, email : value};
    case REGPASSWORD : return {type : CHANGE_REG_PASSWORD, regPassword : value};
    case NUMBER : return {type : CHANGE_NUMBER, number : value};
    case VALIDATE : return {type : VALIDATE};
    default : return {type : "DO NOTHING", ...initialState};
  }
}

const valueActionCreator = (tabValue)=>{
  return {type : CHANGE_TAB_VALUE, tabValue,}
}

// displays the modal
function Modal({shouldOpen, checkLogin, close}) {
  const [open, setOpen] = useState(shouldOpen);
  const [registered, setRegistered] = useState(false);

  // function to handle toggling of tabs
  const handleChange=(event, newValue)=>{
    dispatch(valueActionCreator(newValue))
  }

  const [formContent, dispatch] = useReducer(formReducer, initialState);
  const classes = useStyles();
  const helperTextContent = {
    login:{
      Username : "",
      Password : "",
    },
    register:{
      Email : "",
      "First Name" : "",
      "Last Name" : "",
      "Contact Number" : "",
    },
  }
  // function to validate the user entries
  const handleError = (value, tab, type) =>{
    if(formContent.validate){
      if(!value){
        helperTextContent[tab][type] = `${type} required`;
        return true;
      }else{
        switch(type){
          case "Email" : {
            let regex = /.+@.+\..+/;
            if(!regex.test(value) && helperTextContent[tab].hasOwnProperty(type)){
              helperTextContent[tab][type] = "Invalid Email Address";
              return true;
            }
          }; break;
          case "Contact Number" : {
            let regex = /^\d{10}$/;
            if(!regex.test(value) && helperTextContent[tab].hasOwnProperty(type)){
              helperTextContent[tab][type] = "Please enter a valid contact number";
              return true;
            }
          }; break;
          case "First Name" : 
          case "Last Name" : {
            let regex = /[A-Za-z]+/;
            if(!regex.test(value) && helperTextContent[tab].hasOwnProperty(type)){
              helperTextContent[tab][type] = "Invalid entry";
              return true;
            }
          }; break;
        }
      }
      helperTextContent[tab][type] = "";
      return false;
    }
    return false;
  }
  
  // function to be executed when user click the login/register button
  const handleBtnClick=(e)=>{
    dispatch(formActionCreator(e, VALIDATE))
  }

  // functino to be executed when the user submites the form
  const handleSubmit = (e) =>{
    e.preventDefault();
    const {outerText} = e.target.lastChild;
    if(formContent.validate){
      let tab = outerText.toLowerCase();
      if(Object.values(helperTextContent[tab]).reduce((sum, item)=>sum + item)=== "" ){
        if(tab === "register"){
          setRegistered(true);
        }else{
          checkLogin();
          alert("Succesfully logged in");
        }
      }else{
        setRegistered(false);
      }
    }
  }

  // function to handle closing of the modal
  const handleClose=()=>{
    setOpen(false);
    close();
  }

  return (
    <ReactModal isOpen={open} style={modalStyle} onRequestClose={()=>handleClose()} ariaHideApp={false} >
      <AppBar position="static" color="transparent">
        <Tabs value={formContent.tabValue} onChange={handleChange} aria-label="login/register tab" centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </AppBar>
      <TabPanel  value={formContent.tabValue} index={0} >
        <form className="form-elements" onSubmit={handleSubmit}>  
          <FormControl>
              <TextField
                label="Username"
                value={formContent.username}
                onChange={(e)=>dispatch(formActionCreator(e, USERNAME))}
                error={handleError(formContent.username,"login", "Username")}
                helperText={helperTextContent.login.Username}
                type="text"
              />
          </FormControl>
          <FormControl>
              <TextField
                label="Password"
                value={formContent.password}
                onChange={(e)=>dispatch(formActionCreator(e, PASSWORD))}
                error={handleError(formContent.password,"login", "Password")}
                helperText={helperTextContent.login.Password}
                type="password"
              />
          </FormControl>
          <Button type="submit" className={classes.root} variant="contained" color="primary" onClick={handleBtnClick}>Login</Button>
        </form>
      </TabPanel>
      <TabPanel value={formContent.tabValue} index={1} >
        <form onSubmit={handleSubmit} >
          <FormControl>
            <TextField
              label="First Name"
              type="text"
              value={formContent.firstName}
              onChange={(e)=>dispatch(formActionCreator(e, FIRSTNAME))}
              error={handleError(formContent.firstName,"register", "First Name" )}
              helperText={helperTextContent.register["First Name"]}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Last Name"
              type="text"
              value={formContent.lastName}
              onChange={(e)=>dispatch(formActionCreator(e, LASTNAME))}
              error={handleError(formContent.lastName,"register", "Last Name")}
              helperText={helperTextContent.register["Last Name"]}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Email"
              type="email"
              value={formContent.email}
              onChange={(e)=>dispatch(formActionCreator(e, EMAIL))}
              error={handleError(formContent.email,"register", "Email")}
              helperText={helperTextContent.register.Email}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Password"
              type="password"
              value={formContent.regPassword}
              onChange={(e)=>dispatch(formActionCreator(e, REGPASSWORD))}
              error={handleError(formContent.regPassword,"register", "Password")}
              helperText={helperTextContent.register.Password}
            />
          </FormControl>
          <FormControl>
            <TextField 
              label="Contact No"
              value={formContent.number}
              onChange={(e)=>dispatch(formActionCreator(e, NUMBER))}
              error={handleError(formContent.number,"register", "Contact Number")}
              helperText={helperTextContent.register["Contact Number"]}
            />
          </FormControl>
          {registered && <Typography className="success">Registration successful. Please Login</Typography>}
          <Button type="submit" className={classes.root} variant="contained" color="primary" onClick={handleBtnClick}>Register</Button>
        </form>
      </TabPanel>
    </ReactModal>
  )
}

export default Modal;