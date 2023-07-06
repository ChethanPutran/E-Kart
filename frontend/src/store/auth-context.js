import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Creating context
const AuthContext = React.createContext({
	is_authenticated: false,
	on_logout: () => {},
	on_login: () => {},
	user: null,
});

const TOKEN = '123';
const USER = { name: 'Rock', email: 'rock@gmail.com', id: 1234 };

//Creating provider
export const AuthContextProvider = (props) => {
	const [is_authenticated, set_login_status] = useState(false);
	const [user, set_user] = useState(null);

	const history = useHistory();

	//Handler for login event
	const loginHandler = () => {
		console.log('Checking for authentication...');
		localStorage.setItem('c_kart_token', TOKEN);
		set_login_status(true);
		set_user(USER);
		history.push('/');
	};

	//Checking for authentication only once when app starts
	useEffect(() => {
		const token = localStorage.getItem('c_kart_token');
		if (token === TOKEN) {
			set_login_status(true);
			set_user(USER);
		}
	}, []);

	//Handler for logout event
	const logoutHandler = () => {
		localStorage.removeItem('c_kart_token');
		set_login_status(false);
		history.push('/');
	};

	return (
		<AuthContext.Provider
			value={{
				is_authenticated,
				user,
				on_logout: logoutHandler,
				on_login: loginHandler,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
