import './Navigation.css';
import { NavLink } from 'react-router-dom';
// import CartIcon from '../Cart/Icons/CartIcon';
import { useContext } from 'react';
import CartContext from '../Cart/cart-context';
import AuthContext from '../../store/auth-context';
const Navigation = (props) => {
	const cartContext = useContext(CartContext);
	const authContext = useContext(AuthContext);
	const noCartItems = cartContext.items.length;

	return (
		<nav className='nav'>
			<h1 className='nav__logoName'>CKart</h1>
			<ul className='nav__list'>
				<li className='nav__item'>
					<NavLink
						to='/home'
						className='nav__link'
						activeClassName='nav__link__active'>
						Home
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink
						to='/products'
						className='nav__link'
						activeClassName='nav__link__active'>
						Products
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink
						to='/login'
						className='nav__link'
						activeClassName='nav__link__active'>
						Login
					</NavLink>
				</li>
				{authContext.isAdmin && (
					<li className='nav__item'>
						<NavLink
							to='/addProduct'
							className='nav__link'
							activeClassName='nav__link__active'>
							Add Product
						</NavLink>
					</li>
				)}
				<li className='nav__item' ref={cartContext.cartBtn}>
					<NavLink
						to='/cart'
						className='nav__link'
						activeClassName='nav__link__active'>
						<span className='nav__cartBtn__content'>Cart</span>
						<span className='nav__cartBtn__itemNum'>
							{noCartItems}
						</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
