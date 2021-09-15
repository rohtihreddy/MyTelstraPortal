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
import { NewBroadbandPlan } from 'constants/index';
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
    useEffect(() => {
        axios
            .get("http://localhost:8088/viewPlans")
            .then(response => setState(response.data))
    }, [])



    // console.log(plans);
    return(
        <div>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                {plans.map((plan) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={plan.plan} xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader
                        title={plan.plan}
                        subheader={plan.subheader}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        action={plan.plan === 'TELSTRA 1999' ? <StarIcon /> : null}
                        className={classes.cardHeader}
                        />
                        <CardContent>
                            <div className={classes.cardPricing}>
                                <Typography component="h2" variant="h3" color="textPrimary">
                                {plan.price}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                Rs.
                                </Typography>
                            </div>
                            <ul>
                                
                                <div className={classes.cardPricing}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Total of 
                                    </Typography>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {"  " + plan.data}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    GB of Data
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing}>
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
                                <div className={classes.cardPricing}>
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
                ))}
                </Grid>
            </Container>
        </div>
    );
}