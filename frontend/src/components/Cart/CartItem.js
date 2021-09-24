import ProductBox from '../Products/Product/ProductBox';
import Button from '../UI/Button/Button';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import { useContext } from 'react';
import CartContext from './cart-context';

export default function CartItem(props) {
	const {
		removeStatus: status,
		removeError: error,
		removeFromCart,
	} = useContext(CartContext);

	if (status === 'failed') {
		console.log(error);
	}
	const id_ = Math.random();
	return (
		<li key={props.id ? props.id : id_} className='cart__item' id={id_}>
			{status === 'pending' && <LoadingSpinner />}
			<ProductBox
				name={props.name}
				price={props.price}
				description={props.description}
				image={props.image}
				rating={props.rating}
			/>
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
