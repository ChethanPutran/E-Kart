import './App.css';
import Navigation from '../components/navigation/Navigation';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/login/Login';
import Home from '../components/pages/home/Home';
import Product from '../components/pages/products/Product';
import Cart from '../components/pages/cart/Cart';
import { CartContextProvider } from '../store/cart-context';
import { ProductContextProvider } from '../store/product-context';

export default function App() {
	return (
		<div className='app'>
			<ProductContextProvider>
				<CartContextProvider>
					<Navigation />
				</CartContextProvider>
			</ProductContextProvider>

			<Switch>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/products'>
					<ProductContextProvider>
						<CartContextProvider>
							<Product />
						</CartContextProvider>
					</ProductContextProvider>
				</Route>

				<Route path='/cart'>
					<ProductContextProvider>
						<CartContextProvider>
							<Cart />
						</CartContextProvider>
					</ProductContextProvider>
				</Route>

				<Route path='/home'>
					<Home />
				</Route>

				<Route path='/'>
					<Redirect to={'/home'} />
				</Route>
			</Switch>
		</div>
	);
}
