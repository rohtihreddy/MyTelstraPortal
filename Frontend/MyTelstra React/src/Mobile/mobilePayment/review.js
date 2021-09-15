import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const plans = props.products;
  var total = 0;

  console.log(props.paymentInfo);

  const calculateTotal = () => {
    for (let i = 0; i < plans.length; i++) {  
      total += plans[i].price;
    }
    return total;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {plans.map((product) => (
          <ListItem className={classes.listItem} key={product.id}>
            <ListItemText primary={product.plan} secondary={"Data: " + product.data + " GB, Voice : " + product.voice+" Min, SMS : "+product.sms} />
            <Typography variant="body2">₹ {product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
          ₹ {calculateTotal()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.addressInfo.firstName + " " + props.addressInfo.lastName}</Typography>
          <Typography gutterBottom>{props.addressInfo.address1 + " " + props.addressInfo.address2}</Typography>
          <Typography gutterBottom>{props.addressInfo.city + ", " + props.addressInfo.state + " - " + props.addressInfo.zip}</Typography>
        </Grid> */}
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment key={props.paymentInfo.nameOnCard}>
                <Grid item xs={12}>
                  <Typography gutterBottom>{props.paymentInfo.nameOnCard}</Typography>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <Typography gutterBottom>{"Card Number: " + props.paymentInfo.cardNumber}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>{"Expiry: " + props.paymentInfo.expiry}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}