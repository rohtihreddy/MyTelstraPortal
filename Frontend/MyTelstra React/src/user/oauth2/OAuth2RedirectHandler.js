import React, { Component } from 'react';
import { ACCESS_TOKEN, UserAuthenticated, USER } from '../../constants';
import { Redirect } from 'react-router-dom';
import { getCurrentUser, login } from '../../util/APIUtils';


class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            localStorage.setItem(UserAuthenticated, true);
            getCurrentUser().then(response => localStorage.setItem(USER, JSON.stringify(response)));
            return <Redirect to={{
                pathname: "/home",
                state: { from: this.props.location }
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default OAuth2RedirectHandler;