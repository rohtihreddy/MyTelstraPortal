import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from 'shop/temp/ProductList';
import { cartProducts, setCartProducts } from 'constants/index';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  bar: {
      top: "67px",
      position: "absolute"
  },
  tabpanel: {
      top: "100px",
      position: "absolute"
  }
}));

export default function FullWidthTabs(props) {
  //const {cartProducts, setCartProducts} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = useState([]);
  function reduceQuantity(id, amount) {
      const updatedProducts = products.map(i =>
          i.id === id ? { ...i, quantity: i.quantity - amount } : i
      )
      setProducts(updatedProducts)
    }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [mobiles, setMobiles] = useState([]);
  const [broadbands, setBroadbands] = useState([]);
  const [appliances, setAppliances] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8085/view_mobiles")
            .then(response => setMobiles(response.data));
        axios
            .get("http://localhost:8085/view_broadband")
            .then(response => setBroadbands(response.data));
        axios
            .get("http://localhost:8085/view_appliances")
            .then(response => setAppliances(response.data));
        axios
            .get("http://localhost:8085/view_items")
            .then(response => setProducts(response.data));
    }, [])

  return (
    <div className={classes.root}>
      <AppBar color="default" className={classes.bar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Mobiles" {...a11yProps(0)} />
          <Tab label="Broadbands" {...a11yProps(1)} />
          <Tab label="Appliances" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.tabpanel}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <ProductList
                products={mobiles}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                name = "mobiles"
                // badge = {badge}
                // badgeSetter = {badgeSetter}
        />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <ProductList
                products={broadbands}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                name = "broadbands"
                // badge = {badge}
                // badgeSetter = {badgeSetter}
        />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <ProductList
                products={appliances}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                reduceQuantity={reduceQuantity}
                name = "appliances"
                // badge = {badge}
                // badgeSetter = {badgeSetter}
        />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}