import CartList from './CartList';
import './Cart.css';
import { useContext, useState } from 'react';
import { Fragment } from 'react/cjs/react.development';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import Button from '../UI/Button/Button';
import CheckOut from '../CheckOut/CheckOut';
import CartContext from './cart-context';

const Cart = (props) => {
	const [isCheckOut, setIsCheckOut] = useState(false);
	const { status, error, items } = useContext(CartContext);

	const buyProduct = () => {
		setIsCheckOut(true);
	};
	const backdropHandler = () => {
		setIsCheckOut(false);
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
	if (status === 'sucess' && (!items || items.length === 0)) {
		return (
			<div className='centeredDiv'>
				<h3 className='cart__empty'>Cart is empty</h3>
			</div>
		);
	}
	if (status === 'sucess' && items && items.length > 0) {
		const products = items.map((element) => {
			return { ...element.data, quantity: element.quantity };
		});

		return (
			<>
				{isCheckOut && <CheckOut onClickBackdop={backdropHandler} />}
				<div className='cart'>
					<CartList items={products} />
					<div className='cart__pricing'>
						<div className='priceBox'>
							<h3 className='priceBox__title'>Total Amount</h3>
							<p className='priceBox__amount'>
								₹{calcTotalAmount(products)}
							</p>
						</div>
						<div className='btnBox'>
							<Button
								className='cart__orderBtn'
								onClick={buyProduct}>
								Order
							</Button>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export default Cart;
