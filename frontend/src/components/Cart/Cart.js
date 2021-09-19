import { ProductBox } from '../Products/Product';
import Button from '../UI/Button/Button';
import './Cart.css';
import CartContext from '../Cart/cart-context';
import { useContext } from 'react';

const Cart = (props) => {
	const cartContext = useContext(CartContext);
	const products = cartContext.items;

	const calcTotalAmount = () => {
		return products.reduce((preVal, curItem) => {
			return preVal + curItem.price * curItem.quantity;
		}, 0);
	};

	const cartItems = cartContext.items.map((item) => (
		<li key={item._id} className='cart__item'>
			<ProductBox
				name={item.name}
				price={item.price}
				description={item.description}
				image={item.image}
				rating={item.rating}
			/>
			<div className='cart__item__description'>
				<p className='cart__item__quantity'>Qty. {item.quantity}</p>
				<div className='cart__item__remove'>
					<Button
						className='cart__item__removeBtn'
						onClick={cartContext.removeItem.bind(null, item._id)}>
						Remove
					</Button>
				</div>
			</div>
		</li>
	));

	return (
		<div className='cart'>
			<ul className='cart__items'>
				{cartItems.length > 0 ? (
					cartItems
				) : (
					<h3 className='cart__empty'>Cart is empty</h3>
				)}
			</ul>
			<div className='cart__pricing'>
				<div className='priceBox'>
					<h3 className='priceBox__title'>Total Amount</h3>
					<p className='priceBox__amount'>₹{calcTotalAmount()}</p>
				</div>
				<div className='btnBox'>
					<Button
						className='cart__orderBtn'
						onClick={props.buyProduct}>
						Order
					</Button>
				</div>
				{console.log('Inside cart')}
			</div>
		</div>
	);
};

export default Cart;
