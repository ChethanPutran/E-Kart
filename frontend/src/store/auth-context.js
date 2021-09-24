import React, { useState } from 'react';

const AuthContext = React.createContext({
	isLoggedIn: false,
	isAdmin: true,
	onLogout: () => {},
	onLogin: (username, password) => {},
	cartChanged: () => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};
	const loginHandler = () => {
		localStorage.setItem('isLoggedIn', 'true');
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				isAdmin: true,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
