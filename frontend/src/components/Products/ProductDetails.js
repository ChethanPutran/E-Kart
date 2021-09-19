import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useParams } from 'react-router';
const ProductDetails = (props) => {
	const params = useParams();
	const id = params.id;
	console.log(id);
	const authContext = useContext(AuthContext);
	const product = authContext.items.filter((item) => item._id === id)[0];
	return product ? (
		<div className='product__details'>
			<div className='product__productBox'>
				<h3 className='product__name'>{product.name}</h3>
				<p className='product__description'>{product.description}</p>
				<p className='product__price'>₹{product.price}</p>

				<div className='product__rating'>
					<p className='rating__num'>{product.rating.rate}</p>
					<p className='rating__count'>{product.rating.count}</p>
				</div>
			</div>
		</div>
	) : (
		<p>Invalid product Id!!!</p>
	);
};

export default ProductDetails;
