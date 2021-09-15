import React, { useState } from 'react'
import { cartProducts, setCartProducts } from 'constants/index';
import IndexNavbar from 'Broadband/navbar';
import TabPanel from 'shop/temp/tabs';

export default function Shop() {
    // const [cartProducts, setCartProducts] = useState([]);
    return (
        <div>
            <IndexNavbar 
            />
            <TabPanel 
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
            />    
        </div>
    )
}
