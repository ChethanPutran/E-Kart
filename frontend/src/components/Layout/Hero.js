import './Hero.css';
import ProductsSummary from '../Products/ProductsSummary';
import { NavLink } from 'react-router-dom';

const Hero = (props) => {
	return (
		<>
			<div className='hero'>
				<ProductsSummary />
				<div className='hero__btnBox'>
					<NavLink className='btn hero__btn' to='/products'>
						Buy Products
					</NavLink>
					<NavLink className='btn hero__btn' to='/addProduct'>
						Add Product
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default Hero;