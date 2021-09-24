import ProductForm from './ProductFrom';
import ProductBox from './ProductBox';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import React, { useContext } from 'react';
import CartContext from '../../Cart/cart-context';

const Product = (props) => {
	const {
		addError: error,
		addStatus: status,
		addToCart,
	} = useContext(CartContext);

	const wishListHandler = () => {};

	const addToCartHandler = (quantity) => {
		addToCart({ id: props.id, quantity });
	};
	return (
		<div className='product'>
			{error && <p className='snackbar'>{error}</p>}
			{status === 'pending' && (
				<div className='centeredDiv'>
					<LoadingSpinner />
				</div>
			)}
			{!(status === 'pending') && (
				<>
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
								onAddItemToCart={addToCartHandler}
								wishListHandler={wishListHandler}
							/>
						</div>
						)
					</div>
				</>
			)}
		</div>
	);
};

export default React.memo(Product);
