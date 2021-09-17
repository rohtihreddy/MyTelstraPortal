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
import FadeMenu from 'Broadband/Menu';
import Tablee from 'shop/orders/Table';
import IndexNavbar from 'Broadband/navbar';
import Indexnavbar from 'Broadband/navbar';

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
  
  const useStyle = makeStyles((theme) => ({
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
      padding: theme.spacing(10, 0, 6),
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
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    },
  }));
  
  export default function Orders(match) {
    const classes = useStyle();
    return (
      <React.Fragment>
        <CssBaseline />
        <Indexnavbar />
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography variant="h3" align="center" color="textSecondary" component="p">
            Order History
          </Typography>
        </Container>
        {/* End hero unit */}
        <Tablee message={match.match.params.id}/>
        {/* Footer */}
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </React.Fragment>
    );
  }