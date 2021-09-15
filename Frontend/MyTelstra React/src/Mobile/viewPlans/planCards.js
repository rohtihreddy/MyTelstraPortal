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
import { useHistory } from "react-router-dom";
import { UserAuthenticated, USER, NewBroadbandPlan } from 'constants/index';

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
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
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
    const [plans, setState] = useState([]);
    let history = useHistory();
    var userDetails = JSON.parse(localStorage.getItem(USER));
    useEffect(() => {
        axios
            .get(localStorage.getItem(UserAuthenticated)?"http://localhost:8083/viewPlans/"+userDetails.id : "http://localhost:8083/viewPlans")
            .then(response => setState(response.data))
    }, [])
    const sendPlanDetails = (plan) => {
        history.push({
        pathname: '/mobile/payment',
        newPlan: plan
      });
    }
    console.log(plans);
    return(
        <div>
            <Container maxWidth="md" component="main">
                <Grid container  spacing={5} alignItems="flex-end">
                {plans.map((plan) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={plan.plan} xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader
                        title={plan.plan}
                        subheader={plan.plantype}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center'}}
                        action={plan.duration == '84' ? <StarIcon /> : null}
                        className={classes.cardHeader}
                        />
                        <CardContent>
                            <div className={classes.cardPricing}>
                                <Typography component="h2" variant="h3" color="textPrimary">
                                {plan.price}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                ₹
                                </Typography>
                            </div>
                            <ul>
                                {/* {plans.description.map((line) => (
                                <Typography component="li" variant="subtitle1" align="center" key={line}>
                                    {line}
                                </Typography>
                                ))} */}
                                {plan.data === 0 ? <div/>:
                                <div className={classes.cardPricing}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {" " + plan.data+" "}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    GB of Data
                                    </Typography>
                                </div>}
                                {plan.voice === 0 ? <div/> :
                                <div className={classes.cardPricing}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {" " + plan.voice+" "}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Minutes of Voice Calls
                                    </Typography>
                                </div>}
                                {plan.sms === 0? <div/> :
                                <div className={classes.cardPricing}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {plan.sms}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    {" "}
                                    SMS
                                    </Typography>
                                </div>}
                                {plan.duration === 0 ? 
                                <div className={classes.cardPricing}>
                                <Typography  color="textSecondary">
                                valid untill your base plan expires
                                </Typography>
                                </div>
                                 : 
                                <div className={classes.cardPricing}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Enjoy untill 
                                    </Typography>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {plan.duration}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                     Days
                                    </Typography>
                                </div>}
                            </ul>
                        </CardContent>
                        <CardActions>
                        {localStorage.getItem(UserAuthenticated)?
                        <Button fullWidth variant="outlined" color="primary" onClick = {() => sendPlanDetails(plan)}>
                          {
                            plan.plantype === "Add-On" ? "Get Add-On":"Get Base Plan"
                          }
                        </Button>
                        :
                        <div/>}
                        </CardActions>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Container>
        </div>
    );
}