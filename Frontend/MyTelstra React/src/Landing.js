import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from "login/LogIn";
import SignUp from "login/SignUp";


// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoNavbar from "components/Navbars/demoNavbar";

function Landing() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <DemoNavbar authenticated = {false}/>
      <LandingPageHeader />
    </>
  );
}

export default Landing;
