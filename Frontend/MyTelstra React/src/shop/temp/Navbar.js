import React from 'react'
import Cart from './Cart'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavbarStyles'

function Navbar(props) {
    const {classes, cartProducts, setCartProducts, increaseQuantity} = props
    return (
        <div 
        className={classes.Navbar}
        >
                <AppBar
                    position="static"
                    color="transparent"
                    className="AppBar">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            style={{ marginRight: "auto" }}
                            variant="h5">
                            Pet Shop Store
                        </Typography>
                            <Cart
                                cartProducts={cartProducts}
                                setCartProducts={setCartProducts}
                                increaseQuantity={increaseQuantity}
                            />
                    </Toolbar>
                </AppBar>
            </div>
    )
}

export default withStyles(styles)(Navbar)