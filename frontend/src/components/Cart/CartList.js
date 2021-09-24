import CartItem from './CartItem';

export default function CartList(props) {
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
