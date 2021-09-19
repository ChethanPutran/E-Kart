import { useCallback, useEffect, useRef, useState } from 'react';
import AddProduct from '../components/Products/AddProduct';
import Hero from '../components/Layout/Hero';
import Cart from '../components/Cart/Cart';
import './App.css';
import { AuthContextProvider } from '../store/auth-context';
import { CartContextProvider } from '../components/Cart/cart-context';
import ProductFinder from '../components/Products/ProducrFinder';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import HttpService from '../components/Services/http-services';
import { Route } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import ProductDetails from '../components/Products/ProductDetails';
import AuthContext from '../store/auth-context';
export default function App() {
	const [products, setProducts] = useState([]);
	const [event, setEvent] = useState({
		isLoading: false,
		message: '',
	});

	const getProducts = useCallback(async () => {
		setEvent(() => {
			return {
				isLoading: true,
				message: 'Loading...',
			};
		});
		setError(null);
		try {
			const httpService = new HttpService();
			const data = await httpService.getProducts();

			setProducts(data);
		} catch (err) {
			console.log(err);
			setError(err.message);
		}
		setEvent(false);
	}, []);

	//Fetching the product at the bigining
	useEffect(() => {
		getProducts();
	}, [getProducts]);

	const addProduct = async (product) => {
		console.log(product);
		//Updating products
		setEvent(() => {
			return {
				isLoading: true,
				message: 'Creating product...',
			};
		});
		try {
			const httpService = new HttpService();
			const data = await httpService.postProduct(product);
			console.log(data);
			setProducts((previousProducts) => {
				return [...previousProducts, { data }];
			});
		} catch (err) {
			console.log(err);
			setError(err.message);
		}
		setEvent(() => {
			return {
				isLoading: false,
				message: '',
			};
		});
	};

	const buyProduct = () => {
		console.log('Buying product...');
	};
	const [error, setError] = useState(null);
	const warningRef = useRef(null);

	return (
		<div className='app'>
			<AuthContextProvider items={products}>
				<ErrorBoundary>
					<CartContextProvider products={products}>
						<Navigation />

						<Route path='/cart'>
							<Cart buyProduct={buyProduct} />
						</Route>
					</CartContextProvider>
					<Route path='/home'>
						<Hero />
						{error && (
							<p className='snackbar'>
								Something went wrong. {error}
							</p>
						)}
					</Route>

					<AuthContext.Consumer>
						{(context) => {
							return (
								context.isAdmin && (
									<Route path='/addProduct'>
										<AddProduct addProduct={addProduct} />
									</Route>
								)
							);
						}}
					</AuthContext.Consumer>
					<Route path='/products/:id' strict={true}>
						<ProductDetails />
					</Route>

					<Route path='/products'>
						{!event.isLoading ? (
							products.length > 0 ? (
								<ProductFinder products={products} />
							) : (
								<p className='app__warning' ref={warningRef}>
									No products found!!!
								</p>
							)
						) : (
							<p className='snackbar'>{event.message}</p>
						)}
					</Route>
				</ErrorBoundary>
			</AuthContextProvider>
		</div>
	);
}
