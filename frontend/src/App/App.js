import AddProduct from '../components/Products/AddProduct/AddProduct';
import Hero from '../components/Layout/Hero';
import Cart from '../components/Cart/Cart';
import './App.css';
import { AuthContextProvider } from '../store/auth-context';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import ProductDetails from '../components/Products/Product/ProductDetails';
import NotFound from '../components/NotFound/NotFound';
import Products from '../components/Products/Products';
import CartContext, {
	CartContextProvider,
} from '../components/Cart/cart-context';

export default function App() {
	const buyProduct = () => {
		console.log('Buying product...');
	};

	return (
		<div className='app'>
			<AuthContextProvider>
				<ErrorBoundary>
					<CartContextProvider>
						<CartContext.Consumer>
							{(context) => (
								<Navigation
									size={context.items && context.items.length}
									cartBtn={context.cartBtn}
								/>
							)}
						</CartContext.Consumer>
					</CartContextProvider>

					<Switch>
						<Route path='/' exact>
							<Redirect to='/home/' />
						</Route>
						<Route path='/home'>
							<Hero />
						</Route>
						<Route path='/addProduct'>
							<AddProduct />
						</Route>
						<Route path='/products/:id'>
							<ProductDetails />
						</Route>
						<Route path='/products' exact>
							<Products />
						</Route>
						<Route path='/cart' exact>
							<CartContextProvider>
								<Cart buyProduct={buyProduct} />
							</CartContextProvider>
						</Route>
						<Route path='*'>
							<NotFound />
						</Route>
					</Switch>
				</ErrorBoundary>
			</AuthContextProvider>
		</div>
	);
}
