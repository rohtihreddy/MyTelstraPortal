import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Product from './Product'
import { cartProducts, setCartProducts } from 'constants/index';



export default function ProductList(props) {
    // const {products, cartProducts, setCartProducts} = props;
    const {products} = props;
    const productList = products.map(prod => (
        <Grid
            zeroMinWidth
            item
            lg={6}
             xl={6}
            key={prod.id}
            xs={12} sm={12} md={8}
            >
            <Product
                id={prod.pid}
                name={prod.name}
                details={prod.details}
                src={prod.image}
                price={prod.price}
                key={prod.pid}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                
            />
        </Grid>
        
    ))
    console.log(products);
    return (
        <Box
        width="75%"
        mx="auto"
            style={{ marginTop: "20px" }}>
            <Grid
                container
                spacing={3}
                alignItems="stretch">
                {productList}
            </Grid>
        </Box>
    )
}
