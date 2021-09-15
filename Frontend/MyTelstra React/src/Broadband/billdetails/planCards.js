import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {USER} from 'constants/index'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    '.menu': {
        display: 'inline-block'
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
      float: 'left'
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing1: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    cardPricing2: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
}));

//₹

export default function Cardgrid(){
    const classes = useStyles();
    const [user, setDetails] = useState({});
    let history = useHistory();
    const [plan, setState] = useState({});
    var userDetails = JSON.parse(localStorage.getItem(USER));
    

  const getBill = async () => {
   await axios.get("http://localhost:8088/currentBill/"+ userDetails.id)
   .then(response=> setDetails(response.data))
    
   };
   useEffect(() => {
    getBill();
   }, []);

   useEffect(() => {
      
    const url = "http://localhost:8088/broadbandPlan/" + user.plan_id;
    axios
      .get(url)
      .then(response => setState(response.data));
  }, [user]);
   
  
   const sendPlanDetails = (plan) => {
    history.push({
    pathname: '/Broadband/Payment',
    newPlan: plan
  });
}

    
    return(
        <div>
            <Container maxWidth="md" component="main" alignItems="center">
                    <Grid xs={12} sm={12} md={8} >
                    <Card  >
                        <CardHeader
                        title="Bill Details"
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        className={classes.cardHeader}
                        />
                        <CardContent >
                        <ul>
                                <div className={classes.cardPricing2}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Bill Number
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + user.bill_number} 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing2}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Bill Date
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + user.bill_date} 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing2}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                     Due Date
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + user.due_date} 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing2}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Plan Name
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + user.plan_name} 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing2}>
                                <Typography variant="subtitle2" color="textSecondary">
                                     Due Amount
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + user.due_amount} 
                                    </Typography>
                                </div>
        
                                <div>
                                  <Button variant="outlined" color="primary" onClick = {() => sendPlanDetails(plan)}>
                                    Pay Bill
                                  </Button>
                                </div>
                            </ul>
                        </CardContent>
                    </Card>
                    </Grid>
            </Container>
        </div>
    );
}