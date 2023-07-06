import './Cart.css';
import { useContext, useState } from 'react';
import LoadingSpinner from '../../ui/loading_spinner/LoadingSpinner';
import CartContext from '../../../store/cart-context';
import Button from '../../ui/button/Button';
import Modal from '../../ui/modal/Modal';

function CartItem(props) {
	const {
		removeStatus: status,
		removeError: error,
		removeFromCart,
	} = useContext(CartContext);

	if (status === 'failed') {
		console.log(error);
	}
	return (
		<li key={props.id} className='cart__item' id={props.id}>
			{status === 'pending' && <LoadingSpinner />}
			<div className='card'>
				<h1 className='title'>{props.name}</h1>
				<span className='price'>{props.price}</span>
				<p className='description'>{props.description}</p>
				<img src={props.image} alt='Ig' className='image' />

				<span className='rating'>{props.rating}</span>
			</div>
			<div className='cart__item__description'>
				<p className='cart__item__quantity'>Qty. {props.quantity}</p>
				<div className='cart__item__remove'>
					<Button
						className='cart__item__removeBtn'
						onClick={removeFromCart.bind(null, props.id)}>
						Remove
					</Button>
				</div>
			</div>
		</li>
	);
}

function CartList(props) {
	const notifyCartChanged = () => {
		props.onCartChange();
	};

	const cartItems = (products) => {
		return products.map((product) => {
			return (
				<CartItem
					id={product._id}
					name={product.name}
					price={product.price}
					description={product.description}
					image={product.image}
					rating={product.rating}
					quantity={product.quantity}
					onCartChange={notifyCartChanged}
				/>
			);
		});
	};
	return <ul className='cart__items'>{cartItems(props.items)}</ul>;
}

function CartPricing(params) {
	return (
		<div className='cart__pricing'>
			<div className='priceBox'>
				<h3 className='priceBox__title'>Total Amount</h3>
				<p className='priceBox__amount'>₹{params.price}</p>
			</div>
			<div className='btnBox'>
				<Button
					className='cart__orderBtn'
					onClick={params.buyItemHandler}>
					Order
				</Button>
			</div>
		</div>
	);
}

function CheckOut(props) {
	const checkOutHandler = (event) => {
		event.preventDefault();
	};
	return (
		<Modal backdropHandler={props.onClickBackdop}>
			<form className='checkout__form' onSubmit={checkOutHandler}>
				<div className='formField'>
					<label htmlFor='address' className='form__label'>
						Address
					</label>
					<textarea
						name='address'
						id='address'
						cols='30'
						rows='10'
						className='form__input'></textarea>
				</div>
				<div className='formField'>
					<label htmlFor='street' className='form__label'>
						Street
					</label>
					<input id='street' className='form__input' />
				</div>
				<div className='formField'>
					<label htmlFor='city' className='form__label'>
						City
					</label>
					<input id='city' className='form__input' />
				</div>
				<div className='formField'>
					<label htmlFor='postCode' className='form__label'>
						Postal Code
					</label>
					<input id='postCode' className='form__input' />
				</div>
				<Button type='submit'>Confirm</Button>
				<Button onClick={props.onClickBackdop}>Cancel</Button>
			</form>
		</Modal>
	);
}

const Cart = (props) => {
	const [isCheckOut, setIsCheckOut] = useState(false);
	const { status, error, items } = useContext(CartContext);

	const cartChangeHandler = () => {};
	const buyProduct = () => {
		setIsCheckOut(true);
	};

	const calcTotalAmount = (data) => {
		return data.reduce((preVal, curItem) => {
			return preVal + curItem.price * curItem.quantity;
		}, 0);
	};

	if (status === 'pending') {
		return (
			<div className='centeredDiv'>
				<LoadingSpinner />
			</div>
		);
	}
	if (status === 'failed') {
		return (
			<div className='centeredDiv'>
				<p>{error}</p>
			</div>
		);
	}
	if (status === 'sucess') {
		if (!items || items.length === 0)
			return (
				<div className='centeredDiv'>
					<h3 className='cart__empty'>Cart is empty</h3>
				</div>
			);
		else {
			const products = items.map((element) => {
				return { ...element.data, quantity: element.quantity };
			});

			return (
				<>
					<h1>This is cart</h1>
					{/* {isCheckOut && <CheckOut onClickBackdop={backdropHandler} />} */}
					<div className='cart'>
						<h1>Shopping Cart</h1>
						<CartList
							items={products}
							onCartChange={cartChangeHandler}
						/>
						<CartPricing
							buyItemHandler={buyProduct}
							price={calcTotalAmount(products)}
						/>
					</div>
				</>
			);
		}
	}
	return <h1>This is cart!</h1>;
};

export default Cart;
