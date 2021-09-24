export default function ProductBox(props) {
	return (
		<div className='product__productBox'>
			<h3 className='product__name'>{props.name}</h3>
			<p className='product__description'>{props.description}</p>
			<p className='product__price'>₹{props.price.toFixed(2)}</p>

			<div className='product__rating'>
				<p className='rating__num'>{props.rating.rate}</p>
				<p className='rating__count'>{props.rating.count}</p>
			</div>
		</div>
	);
}
