/*
* React imports
*/
import React from 'react';
import ReactDOM from 'react-dom';

/*
* Import components
*/
import App from './components/App';

/*
* Import custom packages
*/
import 'bootstrap';

/*
* Import custom bootstrap
*/
import './custom.scss';

/*
* Import service working for caching
*/
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<App />,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
