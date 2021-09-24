import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import React from 'react';

const Navigation = (props) => {
	const authContext = useContext(AuthContext);
	const [size, setSize] = useState(0);
	useState(() => {
		const { size } = props;
		setSize(size);
	}, [size]);
	console.log('Nav running');

	return (
		<nav className='nav' ref={props.cartBtn}>
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
				<li className='nav__item'>
					<NavLink
						to='/cart'
						className='nav__link'
						activeClassName='nav__link__active'>
						<span className='nav__cartBtn__content'>Cart</span>
						<span className='nav__cartBtn__itemNum'>
							{props.size ? props.size : 0}
						</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
