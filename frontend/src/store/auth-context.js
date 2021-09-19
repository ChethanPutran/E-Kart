import React, { useState } from 'react';

const AuthContext = React.createContext({
	isLoggedIn: false,
	isAdmin: false,
	onLogout: () => {},
	onLogin: (username, password) => {},
	items: [],
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
				items: props.items,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
