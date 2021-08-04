import { NavLink } from 'react-router-dom';
import { Nav as BootNav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Logout from "./Logout"
import React, {useEffect, useState } from "react";
import '../css/nav.css';
function Nav(props) {
  const [auth, setAuth] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (props.auth) {
      setAuth(true); setDisabled(false);
    }
  }, [props.auth]);

  useEffect(() => {
    if (auth===false) {
      props.setAuth(false); setDisabled(true); setAuth(false)
    }
  }, [auth]);

  //Returns Navbar
  return (
    <nav className="nav" >
      <BootNav variant="pills" defaultActiveKey="/home">
        <BootNav.Item>
          <BootNav.Link as={NavLink} className="navBtn" to="/Home">Home</BootNav.Link >
        </BootNav.Item>
        <BootNav.Item>
          <BootNav.Link as={NavLink} className="navBtn" to="/Search">Search</BootNav.Link >
        </BootNav.Item>
        <BootNav.Item>
          <BootNav.Link as={NavLink} disabled={disabled} className="navBtn" to="/Factors">Factors </BootNav.Link >
        </BootNav.Item>
        <BootNav.Item>
          {(props.auth) ? null : <BootNav.Link as={NavLink} className="navBtn" to="/Register">Register</BootNav.Link >}
        </BootNav.Item>
      </BootNav>

      {(props.auth) ?
        <Logout setAuth={setAuth} auth={props.auth} setDisabled={setDisabled} />
        :
        <Button className="loginBtn" as={NavLink} to="/Login" variant="primary">Login</Button>
      }





    </nav>
  )
}

export default Nav;