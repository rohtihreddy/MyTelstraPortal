import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Style } from '@material-ui/icons';
import {Link} from 'react-router-dom';


export default function ShopMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        {props.menuName}
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        //MenuListProps={{ onMouseLeave: handleClose }}
        onClick={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem><Link style={{ color:'black', fontWeight: 'normal' ,textDecoration: 'none' }} to = {{pathname: '/shop', authenticated: props.authenticated, user: props.user}}>Products</Link></MenuItem>
        <MenuItem><Link style={{ color:'black', fontWeight: 'normal' ,textDecoration: 'none' }} to = {{pathname: '/shop/orders', authenticated: props.authenticated, user: props.user}}>My Orders</Link></MenuItem>
        </Menu>
    </div>
  );
}