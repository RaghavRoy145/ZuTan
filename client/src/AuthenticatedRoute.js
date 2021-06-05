import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthenticatedRoute = ({loggedIn, component: Component, auth, ...rest}) => {
    return (        
        <Route
            {...rest}   
            render={props => (
                ((loggedIn && auth) || !auth) ? <Component {...props} /> : <Redirect to="/" />
            )} 
        />
    );
};

const mapStateToProps = function(state){
    return({
        loggedIn: state.auth.loggedIn
    })
}
export default connect(mapStateToProps)(AuthenticatedRoute);