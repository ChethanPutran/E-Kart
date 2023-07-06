import React, { useState, useEffect } from 'react';
import request from '../utils/requests';

//Creating context
const ProductContext = React.createContext({
	products: [],
	loading: false,
	error: null,
	getProducts: () => {},
	updateProduct: () => {},
	deleteProduct: () => {},
});

//Creating provider
export const ProductContextProvider = (props) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	//Fetching the products for the first time
	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async () => {
		setLoading(true);
		try {
			const data = await request('GET', '/products');
			setProducts(data);
		} catch (err) {
			setError(err);
		}
		setLoading(false);
	};

	const updateProduct = async (data) => {
		setLoading(true);
		try {
			await request('UPDATE', '/product', data);
			await getProducts();
		} catch (err) {
			setError(err);
		}
		setLoading(false);
	};
	const deleteProduct = async (id) => {
		setLoading(true);
		try {
			await request('DELETE', '/product', id);
			await getProducts();
		} catch (err) {
			setError(err);
		}
		setLoading(false);
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				loading,
				error,
				getProducts,
				updateProduct,
				deleteProduct,
			}}>
			{props.children}
		</ProductContext.Provider>
	);
};

export default ProductContext;
