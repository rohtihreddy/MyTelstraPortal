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
import moment from 'moment';
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
      spacing : 3
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
    const [details, setDetails] = useState({});
    var userDetails = JSON.parse(localStorage.getItem(USER));
    useEffect(() => {
        axios
            .get("http://localhost:8083/currentPlan/"+userDetails.id)
            .then(response => setState(response.data))
    }, [])

    console.log(plans.className);

    return(
        <div>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                {plans.map((plan) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={plan.planName} xs={12} sm={plan.plan === 'TELSTRA 149' ? 8 : 6} md={4}>
                    <Card>
                        <CardHeader
                        title={plan.planInfo.plan}
                        subheader={"Recharged On " + plan.dateOfRecharge}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        className={classes.cardHeader}
                        />
                        <CardContent>
                            <div className={classes.cardPricing}>
                                <Typography  component="h6" variant="h8" color="textPrimary">
                                Plan Expires On
                                </Typography>
                            </div>
                            <div className={classes.cardPricing}>
                                <Typography  component="h5" variant="h5" color="textPrimary">
                                    {moment(plan.dateOfExpiry, "DD/MM/YYYY").format('MMMM DD, YYYY')}
                                </Typography>
                            </div>
                            <ul>
                                <div className={classes.cardPricing}>
                                    <Typography component="h7" variant="h6" color="textPrimary">
                                    Plan Benefits are 
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing}>
                                    <Typography component="h7" variant="h6" color="textPrimary">
                                    {plan.planInfo.data}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                     GB of Data
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {plan.planInfo.voice}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                     Minutes of Voice Calls
                                    </Typography>
                                </div>
                                <div className={classes.cardPricing}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {plan.planInfo.sms}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                     SMS
                                    </Typography>
                                </div>
                                {plan.planInfo.duration === 0 ?
                                <div className={classes.cardPricing}>
                                <Typography color="textSecondary">
                                valid untill your base plan expires
                                </Typography>
                                </div>
                                :
                                <div className={classes.cardPricing}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                    Plan Validity :
                                    </Typography>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                    {plan.planInfo.duration}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                     Days
                                    </Typography>
                                </div>}
                                <div className={classes.cardPricing}>
                                <Typography  component="h6" variant="h8" color="textPrimary">
                                {plan.planInfo.plantype}
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