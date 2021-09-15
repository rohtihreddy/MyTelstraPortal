import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import RemoveIcon from "@material-ui/icons/Remove"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import Badge from "@material-ui/core/Badge"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './styles/CartStyles';
import useToggle from './hooks/useToggle';
import { cartProducts, setCartProducts, CART} from 'constants/index';
import { useHistory } from "react-router-dom";



function Cart(props) {
    const {classes} = props;
    // const {classes, cartProducts, setCartProducts} = props
    const [openDrawer, toggleOpenDrawer] = useToggle(false);
    const [openDialog, toggleOpenDialog] = useToggle(false);
    // const [tempCart, setTempCart] = useState(cartProducts);
    const [tempCart, setTempCart] = useState(cartProducts);
    useEffect(() => {
        var cart_products = JSON.parse(localStorage.getItem(CART));
        setTempCart(cart_products);
    }, []);

    let history = useHistory();
    useEffect(() => {
        setTempCart(cartProducts);
    },[cartProducts]);

    const handleCancel = () => {
        toggleOpenDialog()
        setCartProducts([])
        setTempCart([])
        localStorage.setItem(CART,JSON.stringify([]));
    }

    const checkout = (prod) => {
        history.push({
            pathname: '/Shop/Payment',
        });
    }

    const totalPrice = () => {
        let allPrices = []
        cartProducts.map(prod => (
            allPrices.push(prod.price * prod.quantity) 
        ))
        let totalPrice = allPrices.reduce((n, k) => (
            n + k
        ))
        return totalPrice
    }

    const deleteItem = (id, amount) => {
        const updatedCart = cartProducts.filter(prod => prod.id !== id);
        setCartProducts(updatedCart);
        setTempCart(updatedCart);
        localStorage.setItem(CART,JSON.stringify(updatedCart));
    }

    const cartItems = tempCart.map(prod => (
        <div
            key={prod.id}>
            <ListItem
                className={classes.ListItem}
            >
                <ListItemAvatar>
                    <Avatar
                        alt="Img"
                        src={prod.src} />
                </ListItemAvatar>
                <ListItemText
                    style={{ fontSize: "20px" }}
                    className={classes.ListText}
                    primary={prod.name}
                    secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Quantity : 
                          </Typography>
                          {` ${prod.quantity}`} <br></br>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Price : 
                          </Typography>
                            {` ${prod.price}`}.00
                        </React.Fragment>
                      }
                ></ListItemText>
                <Button
                    aria-label="reduce"
                    onClick={() => deleteItem(prod.id, prod.quantity)}
                >
                    <RemoveIcon
                        style={{ color: "red" }}
                        fontSize="small" />
                </Button>
            </ListItem>
            <Divider
                variant="fullWidth"
                component="li" />
        </div>
    ))

    return (
        <div>
            <IconButton
                aria-label="cart"
                variant="outlined"
                color="inherit"
                onClick={toggleOpenDrawer}
            >
                <Badge badgeContent={cartProducts.length} color="secondary">
                    <ShoppingCartIcon fontSize="medium" />
                </Badge>
                {/* <Badge badgeContent={badgeCount} color="secondary">
                    <ShoppingCartIcon fontSize="large" />
                </Badge> */}
            </IconButton>
            <Drawer
                variant='temporary'
                anchor='right'
                open={openDrawer}
                className={classes.Drawer}
                classes={{
                    paper: classes.DrawerPaper
                }}
            >
                <div >
                    <IconButton
                        onClick={toggleOpenDrawer}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <Divider />

                <Typography
                    component="h1"
                    variant="h4">Shopping Cart</Typography>

                <Divider />
                <List
                    className={classes.List}
                >
                    {cartItems.length > 0 ? cartItems : <Typography
                        variant="h5" style={{textAlign: "center"}}>No items in your shopping cart.</Typography>}
                </List>
                <div
                    className={classes.Bottom}
                >
                    <Typography
                        component="p"
                        variant="h5"
                    >
                        <span>Cart-Total : Rs.  </span>
                        {cartProducts.length && totalPrice()}
                     .00</Typography>
                    
                    <Button
                        variant="outlined"
                        size="medium"
                     onClick={checkout}
                    >Checkout</Button>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={toggleOpenDialog}
                    >Cancel</Button>

                    <Dialog
                        open={openDialog}
                        onClose={toggleOpenDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to cancel shopping?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                By clicking on cancel, all items from cart will be removed.
          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={toggleOpenDialog} color="primary">
                                Go Back
          </Button>
                            <Button onClick={handleCancel} color="primary" autoFocus>
                                Cancel
          </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Drawer>
        </div>
    )
}

export default withStyles(styles)(Cart)
