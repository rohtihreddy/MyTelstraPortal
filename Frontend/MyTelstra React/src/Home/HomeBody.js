import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Box from '@material-ui/core/Box';
import Phone from "@material-ui/icons/PhoneAndroid";
import RouterIcon from '@material-ui/icons/Router';


import GridItem from "components/Grid/GridItem.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";


import { Container } from "reactstrap";
//import { Star } from "@material-ui/icons";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FcLandscape, FcNightLandscape } from "react-icons/fc";
import { GiSun } from "react-icons/gi";
import {USER} from 'constants/index'

function GetGreetings(){
  var hours = new Date().getHours();
  if(hours < 12){
    return  <h1 className="presentation-subtitle">Good Morning <FcLandscape /></h1>;
  }
  else if(hours < 18){
    return <h1 className="presentation-subtitle">Good Afternoon <GiSun /></h1>;
  }
  else{
    return <h1 className="presentation-subtitle">Good Night <FcNightLandscape /></h1>;
  }
}

const useStyles = makeStyles((theme) => ({

  root: {

    maxWidth: "auto",

  },

  cardContent: {

    minWidth: "350px"

  }

}));


export default function HomeBody(props){
    const classes = makeStyles();
    const [user, setState] = useState([]);
    const [usermobile, setUser] = useState([]);
    const [Plan, setPlan] = useState([]);
    var userDetails = JSON.parse(localStorage.getItem(USER));
    const styles = useStyles();
    const getUser = async () => {

      await axios.get("http://localhost:8088/userDetails/" + userDetails.id)
      .then(response=> setState(response.data))

      await axios
       .get("http://localhost:8083/balance/" + userDetails.id)
       .then(response => setUser(response.data))
       
      };

      useEffect(() => {
       getUser();
      }, []);
   
   

    useEffect(() => {
      axios
        .get("http://localhost:8088/viewPlanById/")
        .then(response => setPlan(response.data))
        console.log("broadband balance")
    },[]);

   
    return (
        <>
          <div
            className="page-header section-dark"
            style={{
              backgroundImage:
                "url(" + require("assets/img/antoine-barres.jpg").default + ")",
            }}
          >
            <div className="filter" />
            <div className="content-center">
              <Container>
                <div className="title-brand">
                  <GetGreetings />
                  <h2 className="presentation-title">{userDetails.name}</h2>
                  <div className="fog-low">
                    <img
                      alt="..."
                      src={require("assets/img/fog-low.png").default}
                    />
                  </div>
                  <div className="fog-low right">
                    <img
                      alt="..."
                      src={require("assets/img/fog-low.png").default}
                    />
                  </div>
                </div>
                <Box m={1} p={1}></Box>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                <GridItem xs={6} sm={12} md={12}>
                <Card>
                    <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                        <Phone />
                    </CardIcon>
                    <h3 className="text-center"><small>Data Balance</small></h3>
                    <h4 className="text-center">
                       <small >{usermobile.data} GB</small>
                    </h4>
                    </CardHeader>

                    <CardFooter stats>
                    <div className={classes.stats}>
                        {/* <a href="#pablo">
                        Upgrade
                        </a> */}
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={6} sm={12} md={12}>
                <Card>
                    <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                        <RouterIcon />
                    </CardIcon>
                    <h3 className="text-center"><small>Data Balance</small></h3>
                    <h4 className="text-center">
                       <small >{user.dataremaining} GB</small>
                    </h4>
                    </CardHeader>
                    <CardFooter stats>
                    <div className={classes.stats}>
                        
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
                </Grid>
              </Container>
            </div>
            <div
              className="moving-clouds"
              style={{
                backgroundImage:
                  "url(" + require("assets/img/clouds.png").default + ")",
              }}
            />
            
          </div>
        </>
    );
}