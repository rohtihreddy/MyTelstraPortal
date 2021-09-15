import React from 'react'
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

const isUserLoggedIn = true;

const dynamicElements = {
    profileTile: <Button
        className="default"
        color="info"
        href="/Login"
        target="_blank"
        >
        Login
        </Button>,
    body: {
    }
};

export default function getLoginStatus(){
    //write your logic to get login status
    setDynamicElements();
    return isUserLoggedIn;
}

function setDynamicElements(){
    if(isUserLoggedIn){
        dynamicElements.profileTile = <NavLink
        href="/profile"
        target="_blank"
        >
        <i className="nc-icon nc-circle-10" />
        </NavLink>;
    }
    else{
        dynamicElements.profileTile = <Button
        className="default"
        color="info"
        href="/Login"
        target="_blank"
      >
        Login
      </Button>;

    }
}

export {dynamicElements, getLoginStatus};