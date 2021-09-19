import { useContext } from 'react';
import ProductForm from './ProductFrom';
import CartContext from '../Cart/cart-context';
export const ProductBox = (props) => {
	return (
		<div className='product__productBox'>
			<h3 className='product__name'>{props.name}</h3>
			<p className='product__description'>{props.description}</p>
			<p className='product__price'>₹{props.price.toFixed(2)}</p>

			<div className='product__rating'>
				<p className='rating__num'>{props.rating.rate}</p>
				<p className='rating__count'>{props.rating.count}</p>
			</div>
		</div>
	);
};
const Product = (props) => {
	const context = useContext(CartContext);
	console.log(props.id);
	const wishListHandler = () => context.addToWishList(props.id);
	const cartHandler = (quantity) => context.addToCart(props.id, quantity);
	return (
		<div className='product'>
			<div className='product__imageBox'>
				<img
					src={props.image}
					alt={`${props.name}.png`}
					className='product__image'
				/>
			</div>
			<div className='product__contentBox'>
				<ProductBox
					name={props.name}
					price={props.price}
					description={props.description}
					image={props.image}
					rating={props.rating}
				/>

				<div className='product__formBox'>
					<ProductForm
						cartHandler={cartHandler}
						wishListHandler={wishListHandler}
					/>
				</div>
			</div>
		</div>
	);
};

export default Product;
