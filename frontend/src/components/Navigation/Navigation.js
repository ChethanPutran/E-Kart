import './Navigation.css';
import { NavLink } from 'react-router-dom';
import React from 'react';
import AuthContext from '../../store/auth-context';
import CartContext from '../../store/cart-context';
import { useContext } from 'react/cjs/react.development';

const Navigation = (props) => {
	const authContext = useContext(AuthContext);
	const cartContext = useContext(CartContext);

	const logoutHandler = () => {
		authContext.on_logout();
	};
	return (
		<nav className='nav'>
			<h1 className='nav-logoName'>E-Kart</h1>
			<ul className='nav-list'>
				<li className='nav-item'>
					<NavLink
						to='/home'
						className='nav-link'
						activeClassName='nav-link-active'>
						Home
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='/products'
						className='nav-link'
						activeClassName='nav-link-active'>
						Products
					</NavLink>
				</li>

				{!authContext.is_authenticated && (
					<li className='nav-item'>
						<NavLink
							to='/login'
							className='nav-link'
							activeClassName='nav-link-active'>
							Login
						</NavLink>
					</li>
				)}
				{authContext.is_authenticated && (
					<>
						<li className='nav-item'>
							<NavLink
								to='/cart'
								className='nav-link'
								activeClassName='nav-link-active'>
								Cart
								{console.log(cartContext.size)}
								{cartContext.size > 0 && (
									<span className='nav-link--cartsize'>
										{cartContext.size}
									</span>
								)}
							</NavLink>
						</li>
						<li
							className='nav-item nav-link'
							onClick={logoutHandler}>
							Logout
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
