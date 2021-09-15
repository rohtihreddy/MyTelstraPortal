import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Style } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import { UserAuthenticated, USER, NewBroadbandPlan } from 'constants/index'

export default function MobileMenu(props) {
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
        {/* <MenuItem component='a' href='/mobile/plans'>View Plans</MenuItem>
        <MenuItem component='a' href='/mobile/activeplans'>Active Plans</MenuItem>
        <MenuItem onClick={handleClose}>Check Current Balance</MenuItem>
        <MenuItem component='a' href='/mobile/rechargehistory'>Payment History</MenuItem> */}
        <MenuItem><Link style={{ color:'black', fontWeight: 'normal' ,textDecoration: 'none' }} to = {{pathname: '/mobile', authenticated: props.authenticated, user: props.user}}>Dashboard</Link></MenuItem>
        <MenuItem><Link style={{ color:'black', fontWeight: 'normal' ,textDecoration: 'none' }} to = {{pathname: '/mobile/recharge', authenticated: props.authenticated, user: props.user}}>Recharge</Link></MenuItem>
        <MenuItem><Link style={{ color:'black', fontWeight: 'normal' ,textDecoration: 'none' }} to = {{pathname: '/mobile/activeplans', authenticated: props.authenticated, user: props.user}}>Active Plans</Link></MenuItem>
        <MenuItem><Link style={{ color:'black', fontWeight: 'normal' ,textDecoration: 'none' }} to = {{pathname: '/mobile/rechargehistory', authenticated: props.authenticated, user: props.user}}>Recharge History</Link></MenuItem>
        <MenuItem><Link style={{ color:'black', fontWeight: 'normal' ,textDecoration: 'none' }} to = {{pathname: '/mobile/usagehistory', authenticated: props.authenticated, user: props.user}}>Usage History</Link></MenuItem>
        <MenuItem><Link style={{ color:'black', fontWeight: 'normal' ,textDecoration: 'none' }} to = {{pathname: '/mobile/plans', authenticated: props.authenticated, user: props.user}}>Plans and Pricing</Link></MenuItem>
        </Menu> 
    </div>
  );
}