import React from "react";
import MaterialTable, { MTableBody, MTableBodyRow } from "material-table";
import { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { data } from "jquery";
import {Link} from 'react-router-dom';
import { UserAuthenticated, USER, NewBroadbandPlan } from 'constants/index';

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

export default function Table(props){
    const classes = useStyles();
    const [plans, setState] = useState([]);
    var userDetails = JSON.parse(localStorage.getItem(USER));
    useEffect(() => {
        axios
            .get('http://localhost:8083/viewPlans')
            .then(response => setState(response.data))
    }, [])
    console.log(plans);
    return(
        <div>
            <Container maxWidth="xl" component="main">
                  <MaterialTable title=""
                      // onRowClick = {(event,rowData) => alert(rowData.planID)}
                      data = {plans}
                      columns = {[
                        {title:'Plan Type', field:'plantype'},
                        {title:'Plan Name', field:'plan'},
                        {title:'Price (Rs)', field:'price'},
                        {title:'Validity (Days)', field:'duration',
                        render: rowData => {                                            
                          return(
                              rowData.duration == "0" ? <div>Untill Base pack Expires</div>:
                               <span>{rowData.duration}</span>
                          )}
                        },
                        {title:'Data (GB)', field:'data',
                        render: rowData => {                                            
                          return(
                              rowData.data == "0" ? <div style={{color : 'red', fontWeight:'bold'}}>Nill</div>:
                               <span>{rowData.data}</span>
                          )}
                        },
                        {title:'Voice (min)', field:'voice',
                        render: rowData => {                                            
                          return(
                              rowData.voice == "0" ? <div style={{color : 'red', fontWeight:'bold'}}>Nill</div>:
                               <span>{rowData.voice}</span>
                          )}
                        },
                        {title:'SMS', field:'sms',
                        render: rowData => {                                            
                          return(
                              rowData.sms == "0" ? <div style={{color : 'red', fontWeight:'bold'}}>Nill</div>:
                               <span>{rowData.sms}</span>
                          )}
                        },
                      ]}
                      options = {{
                        exportButton:true,
                        pageSizeOptions:[5,10,15,20,25],
                        headerStyle:{fontWeight:'bold'}
                      }}
                  />
            </Container>
        </div>
    );
}