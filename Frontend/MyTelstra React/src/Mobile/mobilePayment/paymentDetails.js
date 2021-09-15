import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useState, useEffect } from 'react';

export default function PaymentForm(props) {
  const [paymentInfo, setState] = useState({
});

const setPaymentDetails = (event) => {
  setState({
      ...paymentInfo,
      [event.target.name]: event.target.value
  });
  console.log(paymentInfo);
  props.parentHandlePaymentDetails(paymentInfo);
}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" name="nameOnCard" label="Name on card" fullWidth autoComplete="cc-name" onChange={setPaymentDetails} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            onChange={setPaymentDetails}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" name="expiry" label="Expiry date" fullWidth autoComplete="cc-exp" onChange={setPaymentDetails} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            onChange={setPaymentDetails}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}