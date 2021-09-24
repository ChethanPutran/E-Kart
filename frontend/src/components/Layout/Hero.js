import './Hero.css';
import ProductsSummary from '../Products/ProductsSummary';
import { Link } from 'react-router-dom';

const Hero = (props) => {
	return (
		<>
			<div className='hero'>
				<ProductsSummary />
				<div className='hero__btnBox txtCenter'>
					<Link className='btn hero__btn' to='/products'>
						Buy Products
					</Link>
					<Link className='btn hero__btn' to='/addProduct'>
						Add Product
					</Link>
				</div>
			</div>
		</>
	);
};

export default Hero;
