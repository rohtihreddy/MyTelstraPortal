import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN, UserAuthenticated, USER } from '../constants/index';
import PrivateRoute from '../common/PrivateRoute';
import PrivateRouteNew from 'common/PrivateRouteNew';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import Landing from 'Landing';
import ViewPlans from 'Broadband/viewPlans/viewPlans';
import AddressForm from 'Broadband/NewConnection/newConAddressForm';
import Checkout from 'Broadband/broadbandPayment/checkout';
import ViewCurrentPlans from 'Broadband/viewCurrentPlan/ViewCurrentPlan';
import UpgradePlans from 'Broadband/upgradePlans/UpgradePlans';
import MobileCheckOut from 'Mobile/mobilePayment/checkout';
import ViewMobilePlans from 'Mobile/viewPlans/viewPlans'
import ViewTransactionHistory from 'Mobile/viewTransactionHistory/viewTransactionHistoy';
import ViewActiveMobilePlans from 'Mobile/activePlans/viewActivePlans';
import ViewUsageHistory from 'Mobile/viewUsageHistory/viewUsageHistory';
import ViewPlansHistory from 'Broadband/viewPlansHistory/viewTransactionHistoy';
import ViewBillDetails from 'Broadband/billdetails/ViewBillDetails'
import ViewPlans2 from 'Broadband/viewPlans/viewplans2';
import KommunicateChat from 'chat';
import Shop from 'shop/temp/Shop';
import ShopCheckout from 'shop/shopPayment/checkout';
import Orders from 'shop/orders/Orders';
import ViewMobileDashboard from 'Mobile/Dashboard/view';
import ViewPlansChart from 'Mobile/plansChart/viewPlansChart';
import Loginsuccessful from 'Home/loading';
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    }
    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
    .then(response => {
      localStorage.setItem(UserAuthenticated, true);
      localStorage.setItem(USER, JSON.stringify(response))
      console.log(localStorage.getItem(UserAuthenticated));
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    

  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(UserAuthenticated);
    localStorage.removeItem(USER);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser(); 
  }


  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-body">
        <KommunicateChat/>
          <Switch>
            <Route exact path="/Broadband" component={(props) => <ViewPlans2 authenticated={this.state.authenticated} user = {this.state.currentUser} {...props}/>}></Route>
            <PrivateRouteNew exact path="/Broadband/newConnection" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <AddressForm authenticated={this.state.authenticated} user = {this.state.currentUser} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew exact path="/Broadband/viewPlans" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <ViewPlans authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

              <PrivateRouteNew exact path="/Broadband/upgradeplan" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <UpgradePlans authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

              <PrivateRouteNew exact path="/Broadband/currentplan" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <ViewCurrentPlans authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <Profile authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew path="/Broadband/Payment" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <Checkout newPlan = {this.props.newPlan} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew exact path="/Broadband/rechargehistory" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
            component={(props) => <ViewPlansHistory authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew exact path="/Broadband/billdetails" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
            component={(props) => <ViewBillDetails authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

          <PrivateRouteNew exact path="/shop" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
            component={(props) => <Shop authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

             <PrivateRouteNew exact path="/shop/payment" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
            component={(props) => <ShopCheckout authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew exact path="/shop/orders" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
            component={(props) => <Orders authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

            <Route exact path="/" component={Landing}></Route>           
            <PrivateRouteNew path="/home" authenticated={localStorage.getItem(UserAuthenticated)} currentUser={JSON.parse(localStorage.getItem(USER))}
              component={(props) => <Home authenticated={this.state.authenticated} user = {this.state.currentUser} {...props}/>}></PrivateRouteNew>
            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
            <Route exact path="/loginn/1"
              render={(props) => <Loginsuccessful authenticated={this.state.authenticated} {...props} />}></Route>
           

            <PrivateRouteNew exact path="/mobile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <ViewMobileDashboard newPlan = {this.props.newPlan} {...props}/>}></PrivateRouteNew>

            <Route exact path="/mobile/plans" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <ViewPlansChart authenticated={this.state.authenticated} {...props}/>}></Route>

            <PrivateRouteNew exact path="/mobile/recharge" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <ViewMobilePlans authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew exact path="/mobile/activeplans" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <ViewActiveMobilePlans authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew exact path="/mobile/rechargehistory" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <ViewTransactionHistory authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew exact path="/mobile/usagehistory" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <ViewUsageHistory authenticated={this.state.authenticated} {...props}/>}></PrivateRouteNew>

            <PrivateRouteNew exact path="/mobile/payment" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={(props) => <MobileCheckOut newPlan = {this.props.newPlan} {...props}/>}></PrivateRouteNew>


            

            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
