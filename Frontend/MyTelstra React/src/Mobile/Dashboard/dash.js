import React from "react";

import logo from 'Mobile/cross.gif'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Table from 'Mobile/Dashboard/Table';
import { UserAuthenticated, USER, NewBroadbandPlan } from 'constants/index';
import {FaTelegramPlane } from 'react-icons/fa';
import {FiPhoneCall} from 'react-icons/fi';
import {MdSignalCellularConnectedNoInternet4Bar} from 'react-icons/md';
import{AiOutlineUser} from 'react-icons/ai';
function Dashboard() {

  const [userdata, setState] = useState([]);
  var userDetails = JSON.parse(localStorage.getItem(USER));

  // useEffect(() => {
  //   // console.log(userDetails)
  //   if(userDetails === null)
  //   {axios
  //       .get("http://localhost:8083/balance/2021000006")
  //       .then(response => setState(response.data))
  //     }
  // }, [])

  // if(userdata.basePackActive){
  //   expirydate = userdata.activeplan[0].expirydate;
  //   console.log(expirydate)
  // }

  const getUsers = async () => {
    await axios.get("http://localhost:8083/balance/"+userDetails.id)
    .then(response=> setState(response.data))
    };

    useEffect(() => {
     getUsers();
    }, []);

  console.log(userdata.data)

  return (
    <>
      <Container justifyContent="center">
        <Row>
          <Col>
            <Card className="card-stats">
              <Card.Body>
                    <div className="numbers">
                      <p className="card-category" style={{fontWeight:"normal"}}>Hello !!</p> 
                      <Card.Title as="h4" style={{fontWeight:"normal"}}>{userDetails.name}</Card.Title>
                    </div>
              </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card className="card-stats">
              <Card.Body>
                    <div className="numbers">
                      <p className="card-category" style={{fontWeight:"normal"}}>Data Balance <MdSignalCellularConnectedNoInternet4Bar/></p> 
                      <Card.Title as="h4" style={{fontWeight:"normal"}}>{userdata.data}GB</Card.Title>
                    </div>
              </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card className="card-stats">
              <Card.Body>
                    <div className="numbers" >
                      <p className="card-category" style={{fontWeight:"normal"}}>Voice Balance <FiPhoneCall/></p>
                      <Card.Title as="h4" weight="bold" style={{fontWeight:"normal"}}>{userdata.voice}min</Card.Title>
                    </div>
              </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card className="card-stats">
                <Card.Body>
                      <div className="numbers">
                        <p className="card-category" style={{fontWeight:"normal"}}>SMS Balance <FaTelegramPlane/></p>
                        <Card.Title as="h4" style={{fontWeight:"normal"}} >{userdata.sms}</Card.Title>
                      </div>
                </Card.Body>
              </Card>
              </Col>
              {/* <Col>
              <Card className="card-stats">
                <Card.Body>
                      <div className="numbers">
                        <p className="card-category" style={{fontWeight:"normal"}}>Followers</p>
                        <Card.Title as="h4" style={{fontWeight:"normal"}}>+45K</Card.Title>
                      </div>
                </Card.Body>
              </Card>
              </Col> */}
            </Row> 
            <Row >
              {/* <img src={logo} alt="logo"/> */}
              {/* <p className="card-category" style={{fontWeight:"normal"}}>Followers</p> */}
              <Table/>
            </Row>
      </Container>
    </>
  );
}

export default Dashboard;
