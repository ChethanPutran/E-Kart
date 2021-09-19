import React from 'react';
import { useReducer, useRef, useState } from 'react';

const initialCartState = { cartItems: [] };
const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		console.log('Adding to cart...');
		const item = state.cartItems.filter(
			(item) => item._id === action.id
		)[0];
		if (item) {
			const items = state.cartItems.filter(
				(item) => item._id !== action.id
			);
			const updatedItem = {
				...item,
				quantity: item.quantity + action.quantity,
			};

			return {
				cartItems: [...items, updatedItem],
			};
		} else {
			return {
				cartItems: [
					...state.cartItems,
					{
						...action.products.filter(
							(item) => item._id === action.id
						)[0],
						quantity: action.quantity,
					},
				],
			};
		}
	} else if (action.type === 'ADD_WISHLIST') {
		console.log('Adding to wishlist...');

		return {
			cartItems: [
				...state.cartItems,
				{
					...action.products.filter((item) => item._id === action.id),
				},
			],
		};
	} else if (action.type === 'REMOVE') {
		console.log('Removing item from cart...');

		console.log(state.cartItems.filter((item) => item._id !== action.id));
		return {
			cartItems: [
				...state.cartItems.filter((item) => item._id !== action.id),
			],
		};
	}

	return initialCartState;
};

const CartContext = React.createContext({
	items: [],
	addToCart: (id, quantity) => {},
	removeItem: (id) => {},
	addToWishList: (id) => {},
	openCart: (id) => {},
	closeCart: (id) => {},
	isCartOpen: null,
	cartBtn: null,
});

export const CartContextProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		initialCartState
	);

	const addToCartHandler = (id, quantity) => {
		console.log(id, quantity);
		dispatchCartAction({
			type: 'ADD',
			id,
			quantity,
			products: props.products,
		});
		cartBtn.current.scrollIntoView({ behavior: 'smooth' });
	};
	const addToWishListHandler = (id) => {
		dispatchCartAction({
			type: 'ADD_WISHLIST',
			id,
			products: props.products,
		});
	};

	const removeCartItemHandler = (id) => {
		dispatchCartAction({
			type: 'REMOVE',
			id,
		});
	};

	const cartBtn = useRef(null);
	return (
		<CartContext.Provider
			value={{
				items: cartState.cartItems,
				removeItem: removeCartItemHandler,
				addToCart: addToCartHandler,
				addToWishList: addToWishListHandler,
				cartBtn,
			}}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartContext;

//Using useState hook
// const [wishlistItems, setWishlistItems] = useState([]);
// const [cartItems, setCartItems] = useState([]);

// const addToCart = (id, quantity) => {
// 	let newItems = [];
// 	console.log('Adding to cart...');
// 	const item = cartItems.filter((item) => item.id === id)[0];

// 	if (item) {
// 		const items = cartItems.filter((item) => item.id !== id);
// 		item.quantity = item.quantity + quantity;
// 		newItems = [...items, item];
// 	} else {
// 		newItems = [
// 			...cartItems,
// 			{
// 				...props.products.filter((item) => item.id === id)[0],
// 				quantity,
// 			},
// 		];
// 	}
// 	setCartItems(newItems);
// };
// const removeCartItem = (id) => {
// 	console.log('Removing item from cart...');
// 	setCartItems((preItems) => {
// 		return [...preItems.filter((item) => item.id !== id)];
// 	});
// };
// const addToWishList = (id) => {
// 	console.log('Adding to wishlist...');

// 	setWishlistItems((preItems) => {
// 		return [
// 			...preItems,
// 			{
// 				...props.products.filter((item) => item.id === id),
// 			},
// 		];
// 	});
// };
