import React, { useState } from 'react';

//Creating context
const CartContext = React.createContext({
	cart: [],
	size: 0,
	addItem: (id, qty) => {},
	removeItem: (id) => {},
});

//Creating provider
export const CartContextProvider = (props) => {
	const [cart, setCart] = useState([]);
	const [size, setSize] = useState(0);

	//Handler for adding item to cart
	const addItem = (id, qty) => {
		console.log('Adding item to cart...');

		const items = cart.filter((item) => item.id === id);

		if (items.length > 0) {
			setCart((items) => {
				items.forEach((item) => {
					if (item.id === id) {
						item.quantity = qty;
					}
				});
				return items;
			});
		} else {
			setCart((items) => {
				items.push({ id, quantity: qty });

				return items;
			});
		}
		setSize(cart.length);
	};

	const removeItem = (id) => {
		console.log('Removing item from cart...');

		setCart((items) => {
			return items.filter((item) => item.id !== id);
		});
		setSize(cart.length);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				size,
				addItem,
				removeItem,
			}}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartContext;
