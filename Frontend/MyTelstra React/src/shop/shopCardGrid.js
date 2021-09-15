import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ImgMediaCard from './shopCard';

//₹

export default function Cardgrid(props){
    const [items, setState] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8083/" + props.tab)
            .then(response => setState(response.data))
    }, [props])


     console.log(items);
    return(
        <div>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-start">
                {items.map((item) => (
                    <Grid item key={item.name} xs={12} sm={12} md={props.tab === "view_mobiles" ? 6 : 12}>
                        <ImgMediaCard item = {item}/>
                    </Grid>
                ))}
                </Grid>
            </Container>
        </div>
    );
}