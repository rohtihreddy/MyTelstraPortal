import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FadeMenu from './Menu.js'
import logo from 'Broadband/media/logo.png';
import Cart from 'shop/temp/Cart'
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import { Link } from 'react-router-dom';
import MobileMenu from 'Mobile/MobileMenu.js';
import { UserAuthenticated, cartProducts, setCartProducts } from 'constants/index.js';
import ShopMenu from 'shop/ShopMenu.js';


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
    logo: {
      maxHeight: 35,
      maxWidth: 40
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

export default function Indexnavbar(props){
    const classes = useStyles();
    // console.log(props.authenticated + "Navbar");
  // console.log(props.user + "Navbar");
    return(
        <Container>
            <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                  <a href="/home">
                    <img src = {logo} className={classes.logo} alt = "Company logo" >
                    </img>
                    </a>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    </Typography>
                    <MobileMenu menuName = "Mobile" className = {classes.link}/>
                    <FadeMenu menuName = "Broadband" className = {classes.link} authenticated = {props.authenticated} user = {props.user}/>
                    <ShopMenu menuName = "Shop" className = {classes.link}/>
                    <Cart

                      cartProducts={cartProducts}

                      setCartProducts={setCartProducts}

                    />
                    
                {localStorage.getItem(UserAuthenticated) ? (<Link
            title="Profile" to = {{pathname: '/profile', authenticated: props.authenticated}}>
        <i className="nc-icon nc-circle-10" />
        </Link>):(<div></div>) }
                
                </Toolbar>
            </AppBar>
        </Container>
    );
}