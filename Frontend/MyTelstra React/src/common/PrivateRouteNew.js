import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
import {UserAuthenticated} from 'constants/index'
  
  
const PrivateRouteNew = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(UserAuthenticated) ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
);

export default PrivateRouteNew;