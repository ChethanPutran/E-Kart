import { useState } from 'react';
import Button from '../../UI/Button/Button';

const ProductForm = (props) => {
	const [quantity, setQuantity] = useState(1);

	const incrementQuantity = () => {
		setQuantity((preQuantity) => {
			return ++preQuantity;
		});
	};
	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity((preQuantity) => {
				return --preQuantity;
			});
		} else {
			alert('You have reached min-limit!');
		}
	};

	const quantityHandler = (event) => {
		event.preventDefault();
		if (!quantity) {
			return;
		}
		if (event.nativeEvent.submitter.id === 'cartBtn') {
			props.onAddItemToCart(quantity);
		} else if (event.nativeEvent.submitter.id === 'wishlistBtn') {
			props.wishListHandler();
		}
		setQuantity(1);
	};
	return (
		<form className='product__form' onSubmit={quantityHandler}>
			<div className='product__form__quantity'>
				<label htmlFor='quantity' className='product__quantity'>
					Quantity : {quantity}
				</label>
				<div className='product__quantityBtns'>
					<input
						type='button'
						value='+'
						className='product__quantityInputBtn'
						onClick={incrementQuantity}
						readOnly
					/>
					<input
						type='button'
						value='-'
						className='product__quantityInputBtn'
						onClick={decrementQuantity}
						readOnly
					/>
				</div>
			</div>
			<div className='product__form__buttons'>
				<Button className='product__cartBtn' type='submit' id='cartBtn'>
					Add to cart
				</Button>
				<Button
					className='product__wishlistBtn'
					type='submit'
					id='wishlistBtn'>
					Add to wishlist
				</Button>
			</div>
		</form>
	);
};

export default ProductForm;
