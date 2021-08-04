import '../css/App.css';

import Login from "./Login"
import Register from "./Register"
import Search from "./Search"
import Factors from "./Factors"
import Nav from "./Nav"
import Home from "./Home"
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {FetchDataFactors } from "./Components/FetchData"

function App() {
  //Initialialise hooks for authentication
  const [auth, setAuth] = useState(localStorage.getItem('isAuthenticated'));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Set URL
  const url = "http://131.181.190.87:3000/user/login";

  //Login procedure
  const login = () => {
    const params = { "email": email, "password": password };
    //Init  HTTP request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    };
    //Fetch
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          //Authorised
          localStorage.isAuthenticated = false;
          localStorage.token = null;
          alert(res.message)
          setAuth(false);
        }
        else {
          //UnAuthorised
          localStorage.token = res.token;
          localStorage.isAuthenticated = true;
          setAuth(true);
        }
      }).then(() => {
        //Direct to  factors page on login
        if (localStorage.getItem('isAuthenticated') === 'true') {
          window.location.href = '/Factors';
        }
      }).catch((error) => {
        alert('Error:', error);
      });
      //Reset form
    setPassword("")
    setEmail("")
    setAuth(localStorage.getItem('isAuthenticated'));
  }

  //When the application starts, check if the user is already logged in
  useEffect(() => {
    const url = "http://131.181.190.87:3000/factors";
    const token = localStorage.getItem('token');
    if (token === undefined || token === null) {
      setAuth(false);
    } else {
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      FetchDataFactors(url + "/2020", headers)
        .then((data) => {
          if (data.error) {
            setAuth(false);
          } else {
            setAuth(true);
          }
        }
        ).catch((error) => {
          alert('Error:', error);
          setAuth(false);
        });
    }
  }, []);

  const loginProps = {
    login: login,
    email: email,
    setEmail: setEmail,
    password: password,
    setPassword: setPassword
  };

  //Returns a react router to navigate the application.
  return (
    <Router>
      <div className="App">
        <Nav auth={auth} setAuth={setAuth} />
        <Route path="/" exact component={Home} />
        <Route path="/Home" exact component={Home} />
        <Route path="/Search" component={Search} />
        <Route path="/Factors" component={Factors} />
        <Route path="/Register" component={Register} />
        <Route path="/Login">
          <Login {...loginProps} />
        </Route>
      </div>
    </Router>
  );
}




export default App;
