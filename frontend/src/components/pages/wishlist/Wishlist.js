import { ProductBox } from '../Products/Product';
import Card from '../../UI/Card/Card';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';

const Wishlist = (props) => {
	const products = [
		{
			id: 'shhs',
			productName: 'Milkibar',
			price: 45,
			description: 'KSja dajvvb vjads avhk',
		},
		{
			id: 'sh21hs',
			productName: 'Chocobar',
			price: 45,
			description: 'KSja dajvvb vjads avhk',
		},
		{
			id: 'sh12hs',
			productName: 'Diarymilk',
			price: 45,
			description: 'KSja dajvvb vjads avhk',
		},
	];

	const wishlistItems = products.map((item) => (
		<li key={item.id}>
			<div className='wishlist__item'>
				<ProductBox
					name={item.productName}
					price={item.price}
					description={item.description}
				/>
			</div>
		</li>
	));

	return (
		<Modal backdropHandler={props.closeWishlist}>
			<Card>
				<div className='wishlist'>
					<div className='wishlist__items'>
						<ul>{wishlistItems}</ul>
					</div>
					<Button onClick={props.closeWishlist}>Close</Button>
				</div>
			</Card>
		</Modal>
	);
};

export default Wishlist;
