import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
// import USER from 'constants/index'
  
  
// const PrivateRouteNew = ({ component: Component, authenticated, ...rest }) => (
//     <Route
//       {...rest}
//       render={props =>
//         localStorage.getItem(USER.authenticated) ? (
//           <Component {...rest} {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
// );

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
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
  
export default PrivateRoute;