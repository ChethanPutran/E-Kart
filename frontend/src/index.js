import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from '../../frontend/src/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
	<BrowserRouter>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

reportWebVitals();
