import React from "react";
import MaterialTable, { MTableBody, MTableBodyRow } from "material-table";
import { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { data } from "jquery";
import {Link} from 'react-router-dom';
import { UserAuthenticated, USER, NewBroadbandPlan } from 'constants/index';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";


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
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
}));

//₹

export default function Tablee(props){
    const classes = useStyles();
    const [resp, setResp] = useState(false);
    const[order,setOrder]=useState([]);
    const[address,setAddress]=useState("");
    var obj={
      "hi": "hello"
    };
    
    var userDetails = JSON.parse(localStorage.getItem(USER));
    useEffect(() => {
      console.log("inside");
        axios
            .get('http://localhost:8085/GetProductsFromCart/'+userDetails.id)
            .then(response => {console.log(response.data) ;
              setOrder(response.data)
            });
         axios.get('http://localhost:8085/GetAddressFromCart/'+userDetails.id)
         .then(response => {console.log(response.data) ;
          setAddress(response.data)
        });
        
    }, [])

    console.log(order);
    console.log(address);

 

    return(
        <Paper>
      <Typography variant="h4" color="inherit" align="center">
        Your Orders
      </Typography>

      <hr />

      <Table>
        <TableHead>
          <TableRow>
            
              <TableCell align="center">Product ID</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Shipping Address</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {
            
            Object.entries(order).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell align="center">{key}</TableCell>
                <TableCell align="center">{value}</TableCell>
                <TableCell align="center">{address}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
    );
}