import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure(); 



function App (){
  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const setAuth = boolean =>{
    setIsAuthenticated(boolean);
  }

  const isAuth= async()=>{
    try{
      const response = await fetch("http://localhost:2000/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token }
      });

      const parseRes = await response.json();
      
      parseRes === true ? setIsAuthenticated(true):
      setIsAuthenticated(false);

    }catch(err){
      console.error(err.message);
    }
  }

  useEffect(()=>{
    isAuth();
  }, [])
    return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/login" render={props =>! isAuthenticated ? (
              <Login {...props} setAuth={setAuth}/>) : (
                 <Redirect to ="/home"/>)
                  }/>
              <Route exact path="/" render={props => ! isAuthenticated ? (
                <Signup {...props} setAuth={setAuth}/>) :( 
                <Redirect to="/login"/>)
              }/>
              <Route exact path="/home" render={props=> isAuthenticated ? (
                <LandingPage {...props} setAuth={setAuth}/>):(<
                 Redirect to="/login"/>)
                }/>
            </Switch>
          </div>
        </Router>
    );
}

export default App;
