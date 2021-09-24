import React from 'react';
import { useRef } from 'react';
import HttpService from '../Services/http-services';
import useHttp from '../hooks/use-http';
import { useEffect } from 'react';
import { useCallback } from 'react/cjs/react.development';

export const CartContext = React.createContext({
	items: [],
	cartBtn: null,
	addToCart: () => {},
	removeFromCart: () => {},
	status: null,
	addStatus: null,
	removeStatus: null,
	error: null,
	addError: null,
	removeError: null,
});

export const CartContextProvider = (props) => {
	const cartBtn = useRef(null);

	const httpService = new HttpService();
	const { sendRequest, status, error, data } = useHttp(
		httpService.getCart,
		true
	);
	const {
		sendRequest: addToCart,
		status: addStatus,
		error: addError,
	} = useHttp(httpService.addProductToCart);
	const {
		sendRequest: removeFromCart,
		status: removeStatus,
		error: removeError,
	} = useHttp(httpService.removeProductFromCart);

	useEffect(() => {
		sendRequest();
	}, [sendRequest, addStatus, removeStatus]);

	const addToCartHandler = ({ id, quantity }) => {
		addToCart({ id, quantity });
	};
	const removeFromCartHandler = useCallback(
		(id) => {
			removeFromCart(id);
		},
		[removeFromCart]
	);

	return (
		<CartContext.Provider
			value={{
				items: data,
				cartBtn: cartBtn,
				addToCart: addToCartHandler,
				removeFromCart: removeFromCartHandler,
				status: status,
				addStatus: addStatus,
				removeStatus: removeStatus,
				error: error,
				addError: addError,
				removeError: removeError,
			}}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartContext;
