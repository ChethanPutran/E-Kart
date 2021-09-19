import Card from '../UI/Card/Card';
import Product from './Product';
import './Products.css';

const ProductsList = (props) => {
	const productList = props.products.map((product) => (
		<li className='card productsList__item' key={product._id}>
			<Product
				id={product._id}
				name={product.name}
				price={product.price}
				description={product.description}
				image={product.image}
				rating={product.rating}
			/>
		</li>
	));

	return (
		<section className='products'>
			<Card className='products__card'>
				<ul className='productsList'>{productList}</ul>
			</Card>
		</section>
	);
};

export default ProductsList;
