import Card from '../../UI/Card/Card';
import Product from './Product';
import { useHistory, useLocation } from 'react-router';
import Button from '../../UI/Button/Button';
import React from 'react';
import { CartContextProvider } from '../../Cart/cart-context';

const sortProducts = (products, type) => {
	return products.sort((prodA, prodB) => {
		if (type) {
			return prodA.id > prodB.id ? 1 : -1;
		} else {
			return prodA.id < prodB.id ? 1 : -1;
		}
	});
};
const ProductsList = (props) => {
	const history = useHistory();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const sortType = +queryParams.get('sort') || 0;
	const sortedProducts = sortProducts(props.products, sortType);

	const productList = sortedProducts.map((product) => (
		<li className='card productsList__item' key={product._id}>
			<CartContextProvider>
				<Product
					id={product._id}
					name={product.name}
					price={product.price}
					description={product.description}
					image={product.image}
					rating={product.rating}
				/>
			</CartContextProvider>
		</li>
	));
	const sortHandler = () => {
		history.push({
			pathname: `${location.pathname}`,
			search: `?sort=${+!sortType}`,
		});
	};
	return (
		<section className='products'>
			<Card className='products__card'>
				<div className='sortButton__box'>
					<Button onClick={sortHandler} className='sortButton'>
						Sort {sortType === 1 ? 'Descending' : 'Ascending'}
					</Button>
				</div>
				<ul className='productsList'>{productList}</ul>
			</Card>
		</section>
	);
};

export default ProductsList;
