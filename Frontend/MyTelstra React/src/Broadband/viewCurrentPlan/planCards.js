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
    const [plan, setState] = useState({});
    const [details, setDetails] = useState({});
    var userDetails = JSON.parse(localStorage.getItem(USER));

    const getPlan = async () => {
       await axios.get("http://localhost:8088/currentPlan/"+ userDetails.id)
      .then(response=> setDetails(response.data))
       
      };
      useEffect(() => {
       getPlan();
      }, []);
  
    const getPlanDetails = async () => {
      await axios.get("http://localhost:8088/broadbandPlan/"+ details.planId)
     .then(response=> setState(response.data))
      
     };
     useEffect(() => {
      getPlanDetails();
     }, [details]);
   
    return(
        <div>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-start">
                    <Grid item key={plan.planId} xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader
                        title={plan.plan}
                        subheader={plan.subheader}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        className={classes.cardHeader}
                        />
                        <CardContent>
                            <div className={classes.cardPricing1}>
                                <Typography component="h2" variant="h3" color="textPrimary">
                                {plan.price}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                Rs.
                                </Typography>
                            </div>
                            <ul>
                                <div className={classes.cardPricing1}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Total of  
                                    </Typography>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {" " + plan.data}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    GB of Data
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing1}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Upto  
                                    </Typography>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {" "}{plan.speed}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Mbps of Speed
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing1}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Enjoy Data for
                                    </Typography>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {" " + plan.validity + " "}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                     Days
                                    </Typography>
                                </div>
                            </ul>
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item key={plan.planId} xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader
                        title="Recharge Details"
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        className={classes.cardHeader}
                        />
                        <CardContent>
                            <ul>
                                <div className={classes.cardPricing2}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Plan ID
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + details.planId} 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing2}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Date of recharge
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + details.dateOfRecharge} 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing2}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Vaid Till
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + details.dateOfExpiry} 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing2}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Payment Mode
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + details.paymentMode} 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing2}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Bill no.
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + details.billNo} 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing2}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Ref. no.
                                    </Typography>
                                    <Typography variant="subtitle2" color="textPrimary">
                                    :{"   " + details.referenceId} 
                                    </Typography>
                                </div>
                            </ul>
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}