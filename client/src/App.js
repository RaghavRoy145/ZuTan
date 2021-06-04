import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import client from './utils/client';
import Alert from './utils/alert';


import Loading from './components/Layout/Loading';
import Login from './pages/Login';
import CreateDatabase from './pages/CreateDatabase';


import {updateLoading, loginSuccesful} from './actions/auth';



const App = (props) => {

	useEffect(() => {
		let user = localStorage.getItem('zutanUser');
		if(!user) return updateLoading(false);
		user = JSON.parse(user);		
		const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': user.token,
            },
        };
		client.post('/user/authenticateUser', {}, config)
		.then(res => {
			loginSuccesful(res.data);
		})
		.catch(err => {
			updateLoading(false);
		})
	}, []);

	if(props.loading) return <Loading/>

	let landingPage = <Route exact path='/' component={Login} />;	
	if(props.loggedIn) landingPage = <Route exact path='/' component={CreateDatabase} />;
	return (
		<Router>
			<Switch>
				{landingPage}
			</Switch>
			<Alert></Alert>
		</Router>
	)	
};

const mapStateToProps = (state) => ({
	loggedIn: state.auth.loggedIn,
	loading: state.auth.loading,	
});

export default connect(mapStateToProps)(App);