import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FadeMenu from 'Mobile/Menu';
import Cardgrid from 'Mobile/viewPlans/planCards';
import IndexNavbar from 'Mobile/navbar';
import Dashboard from 'Mobile/Dashboard/dash';



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
    // borderTop: `1px solid ${theme.palette.divider}`,
    // marginTop: theme.spacing(3),
    // paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function ViewMobileDashboard() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <IndexNavbar />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        {/* <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Mobile
        </Typography> */}
      </Container >
      {/* End hero unit */}
      <Dashboard />
      {/* Footer */}
      <Container component="footer" className={classes.footer}>
          <div>**Note : Add-on plans do not have any validity. Add-on pack expire on the same date as that of your Base plan</div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
    </React.Fragment>
  );
}