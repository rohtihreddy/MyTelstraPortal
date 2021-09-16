import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core';
import styles from './styles/ItemStyles';
import useToggle from './hooks/useToggle';
import { cartProducts, setCartProducts, CART } from 'constants/index';

function Product(props) {
    // const { src, name, details, id, price, classes, cartProducts, setCartProducts} = props;
    const { src, name, details, id, price, classes} = props;

    const [amount, setAmount] = useState(1)
    const [openSnack, toggleOpenSnack] = useToggle(false)

    function addToCart() {
        updateCart();
        toggleOpenSnack();
        setAmount(1);
        console.log(cartProducts);
    }

    function addAmount() {
        setAmount(amount === 100 ? 100 : (amount + 1));
    }
    function reduceAmount() {
        setAmount(amount === 1 ? 1 : (amount - 1));
    }

    function updateCart() {
        if (cartProducts.some(prod => prod.id === id)) {
            const updatedCart = cartProducts.map(prod =>
                (prod.id === id ? { ...prod, quantity: prod.quantity + amount } : prod))
            setCartProducts(updatedCart)
            localStorage.setItem(CART,JSON.stringify(updatedCart));
        } else {
            setCartProducts([...cartProducts, { id: id, quantity: amount, price: price, src: src, name: name}]);
            localStorage.setItem(CART,JSON.stringify([...cartProducts, { id: id, quantity: amount, price: price, src: src, name: name}]));
        }
    }

    
    console.log(src);
    
    return (
        <div>
            <Card
                raised = "true"
                className={styles.root}
            >
                <CardActionArea>
                    <CardMedia
                    component="image"
                       image={src}
                        title={details}
                        className={classes.CardImg}
                        height="100"
                    />
                    <CardContent
                        className={classes.CardContent}
                    >
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2">
                            {name}
                        </Typography>
                        <Typography
                            color="textSecondary" component="p">
                           <span> {details} </span>
                        </Typography>
                        <Typography
                            color="textSecondary" variant="" component="p" >
                            <span>Price:</span>
                               <span>RS. {price}.00</span>
                        </Typography>
                        
                    </CardContent>
                </CardActionArea>
                <CardActions
                     className={classes.CardButtons}
                >
                    <Button
                        aria-label="reduce"
                        onClick={reduceAmount}
                    >
                        <RemoveIcon fontSize="small" />
                    </Button>
                    <Typography
                        component="span"
                    >
                        {amount}
                    </Typography>
                    <Button
                        onClick={addAmount}
                        aria-label="increase"
                    >
                        <AddIcon fontSize="small" />
                    </Button>
                    <Button
                        onClick={addToCart}
                        size="large"
                        color="primary" variant="outlined"
                        className="btn-default"
                        id="addToCart"
                    >
                        Add To Cart
                        </Button>
                </CardActions>
            </Card>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                open={openSnack}
                autoHideDuration={3000}
                message={<span id="message-id" >Added To Cart!</span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                action={[
                    <IconButton onClick={toggleOpenSnack} color="inherit" key="close" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                ]}
                onClose={toggleOpenSnack}
            />
        </div>
    )
}

export default withStyles(styles)(Product)
