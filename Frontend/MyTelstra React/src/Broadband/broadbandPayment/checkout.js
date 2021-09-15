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
import AddressForm from 'Broadband/broadbandPayment/address';
import PaymentForm from 'Broadband/broadbandPayment/paymentDetails';
import Review from 'Broadband/broadbandPayment/review';
import Navbar from 'Broadband/navbar'
import { UserAuthenticated, USER, NewBroadbandPlan } from 'constants/index';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import cross from 'Broadband/media/cross.gif';
import tick from  'Broadband/media/tick.gif';


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

//const steps = ['Shipping address', 'Payment details', 'Review your order'];
const steps = ['Payment details', 'Review your order'];

export default function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const [status, setStatus] = useState({});
  const[address,setState]=useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const products = [location.newPlan];
  const [send, setSend] = useState(false);
  const [post, setPost] = useState({});
  const [rechargeResponse, setResponse] = useState("");
const [temp,setTemp]=useState(true);
let history = useHistory();

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
  console.log(send)
  if(valid_credit_card(paymentInfo.cardNumber) ){
    console.log("card validated")
    var userDetails = JSON.parse(localStorage.getItem(USER));
    console.log("Hello");
    console.log(userDetails);
    axios.put("http://localhost:8088/recharge",{
      userid: userDetails.id,
      planid: products[0].id
    }).then(function(response){setResponse(response.data); console.log(rechargeResponse)});
  }
  else{
    console.log("card not validated")
    setResponse("Recharge Failed...Check card details");
    console.log(rechargeResponse);
  }
}  
  useEffect(() => {
    if(send){
      console.log(send);
      console.log("in post method")
      axios.post("http://localhost:8086/payment",{
        creditCardNo: paymentInfo.cardNumber,
        cv: paymentInfo.cvv,
        expDate: paymentInfo.expiry
      }).then(response => {console.log(response);
      setStatus(response.data);
      });
    }
  }, [send]);

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
      setSend(true);
      recharge();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleHome = () => {
    history.push({
      pathname: '/home'
  });
}
useEffect(() =>{

  if(typeof(products[0]) === "undefined" ){
    window.location.replace('/Broadband/viewPlans')
  }

})
 

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
                  {rechargeResponse=="Recharge Successfull" ?
                  <img src={tick} alt="Success" width="50" height="50" />
                  :
                    <img src={cross} alt="Success" width="50" height="50" />
                  } 
                  </div>
                  <div align="center">
                  {rechargeResponse}
                  </div>
                  <div align="center">
                    Redirecting...
                    </div>
                  <meta http-equiv="refresh" content="5;url=/Broadband/currentplan" />
                </Typography>
                <Typography variant="subtitle1">
                 
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