import React from 'react'
import DemoNavbar from 'components/Navbars/demoNavbar';
import HomeBody from './HomeBody';
import {USER, UserAuthenticated} from 'constants/index';


export default function Home(props) {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  
  return (
    <>
    
      <DemoNavbar authenticated = {props.authenticated} user = {JSON.parse(localStorage.getItem(USER))}/>
      
      <HomeBody authenticated = {props.authenticated} user = {JSON.parse(localStorage.getItem(USER))}/>
      <div className="main">
     
      </div>
    </>
  );
    }

