import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => {

  	return (
    <Provider store={store}>
      	<Router>
        	<Fragment>
          		<Switch>
            
          		</Switch>
        	</Fragment>
      	</Router>
    </Provider>
  	);
};

export default App;