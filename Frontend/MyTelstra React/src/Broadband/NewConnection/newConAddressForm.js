import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Indexnavbar from 'Broadband/navbar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { useHistory } from "react-router-dom";


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          TelStore
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

export default function AddressForm(props) {
    const inputRef = React.useRef(null)
    const classes = useStyles();
    const [available, setAvailable] = useState(true);
    const [resp, setResponse] = useState();
    const [validate, validatePin] = useState(false);
    const [send, setSendRequest] = useState(false);
    const [address, setState] = useState({
        address1: "",
        address2: "",
        city: "",
        firstName: "",
        lastName: "",
        state: "",
        zip: "",
        address: ""
    });
    let history = useHistory();

    // function postaddress(){
     
    //   if(validate){
    //     axios.post("http://localhost:8088/address", {
    //       street: address.address,
    //                 city: address.city,
    //                 state: address.state,
    //                 pincode: address.zip
    //     }).then(function(response){setResponse(response.data); console.log(resp)});
    //   }}

      const validateAdd = async () => {
        await axios.post("http://localhost:8088/address",{
          street: address.address,
          city: address.city,
          state: address.state,
          pincode: address.zip
        })
       .then(response=> setResponse(response.data))
        console.log(resp)
       };
      //  useEffect(() => {
      //   validateAdd();
      //  }, []);
    

    const setAddress = (event) => {
        setState({
            ...address,
            [event.target.name]: event.target.value
        });

        console.log(address);
    }

    const handleValidate = () => {
      validateAdd();
      console.log(resp);
      if(resp==true){
        history.push({
        pathname:"/Broadband/viewPlans"
      });
      }
      else if(resp==false){
        Alert.error("Network not available at this address");
      }
    }
  return (
    <React.Fragment>
      <Indexnavbar authenticated = {props.authenticated} user = {props.user} />
      <Box m={1} p={1}></Box>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h3" variant="h5" align="center">
            New Connection Address
          </Typography>
          <React.Fragment>
            <React.Fragment>
           
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="shipping address"
                    onChange={setAddress}
                    
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    onChange={setAddress}

                />
                </Grid>
                <Grid item xs={12} >
                <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    onChange={setAddress}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField id="state" name="state" label="State/Province/Region" onChange={setAddress}  fullWidth />
                </Grid>
                
            </Grid>
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleValidate}
                  >Proceed
                  </Button>
                </div>
              </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}