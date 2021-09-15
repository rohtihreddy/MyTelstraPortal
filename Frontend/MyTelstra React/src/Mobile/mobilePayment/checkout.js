import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from 'Mobile/mobilePayment/address';
import PaymentForm from 'Mobile/mobilePayment/paymentDetails';
import Review from 'Mobile/mobilePayment/review';
import Navbar from 'Mobile/navbar'
import { UserAuthenticated, USER, NewBroadbandPlan } from 'constants/index';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import tick from 'Mobile/tick.gif'
import cross from 'Mobile/cross.gif'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        MyTelstra
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

var rechargeResponse = "";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

// const steps = ['Shipping address', 'Payment details', 'Review your order'];
const steps = ['Payment details', 'Review your order'];

export default function MobileCheckout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const [address, setState] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const products = [location.newPlan];
  const [send, setS] = useState(false);
  const [message,setMessage] = useState("");

  function valid_credit_card(value) {
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;
    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");
    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
          nDigit = parseInt(cDigit, 10);
      if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
      nCheck += nDigit;
      bEven = !bEven;
    }
    return (nCheck % 10) == 0;
  }

  function recharge(){
    console.log("In Recharge")
    console.log(valid_credit_card(paymentInfo.cardNumber))

    if(valid_credit_card(paymentInfo.cardNumber) ){
      var userDetails = JSON.parse(localStorage.getItem(USER));
      console.log("Hello");
      axios.put("http://localhost:8083/recharge",{
        userid: userDetails.id,
        planid: products[0].id
      }).then(function(response){rechargeResponse = response.data; setMessage(response.data) ;console.log(rechargeResponse)});
    }

    else{
      setMessage("Recharege Failed : Invalid Card Details")
    }
  }
  

  // useEffect(() => {
  //   if(send){
  //     var userDetails = JSON.parse(localStorage.getItem(USER));
  //     console.log("Hello");
  //     axios.put("http://localhost:8083/recharge",{
  //       userid: userDetails.id,
  //       planid: products[0].id
  //     }).then(function(response){rechargeResponse = response.data; console.log(rechargeResponse)});
  //   }
  // }, [send, products]);
  
  console.log("products")
  console.log(location.newPlan)
  console.log(products)
  useEffect(() =>{
    if(typeof(products[0]) === "undefined" ){
      window.location.replace('/mobile/recharge')
    }
  })


  const getStepContent = (step) => {
    switch (step) {
      // case 0:
      //   return <AddressForm parentHandleAddress = {handleAddress}/>;
      case 0:
        return <PaymentForm parentHandlePaymentDetails = {handlePaymentDetails}/>;
      case 1:
        return <Review addressInfo = {address} paymentInfo = {paymentInfo} products = {products}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleAddress = (addressChild) => {
    setState(addressChild);
    console.log(address);
  }

  const handlePaymentDetails = (paymentChild) => {
    setPaymentInfo(paymentChild);
    console.log(paymentInfo);
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);   
    console.log(activeStep + " " + steps.length); 
    if(activeStep === steps.length - 1){
      recharge();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  console.log(location.newPlan);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Navbar authenticated = {localStorage.getItem(UserAuthenticated)} user = {localStorage.getItem(USER)} />
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  <div align="center" >
                  {message=="Recharge Successful" ?
                  <img src={tick} alt="Success" width="50" height="50" />
                  :
                    <img src={cross} alt="Success" width="50" height="50" />
                  } 
                  </div>
                  <div align="center">
                  {message} !!!
                  </div>
                  <meta http-equiv="refresh" content="5;url=/mobile" />
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}