import LoadingSpinner from '../../ui/loading_spinner/LoadingSpinner';
import React, { useReducer, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import Button from '../../ui/button/Button';
import ErrorModal from '../../ui/modal/ErrorModal/ErrorModal';
import { Prompt } from 'react-router-dom';
import './Product.css';
import Modal from '../../ui/modal/Modal';
import ProductContext from '../../../store/product-context';
import CartContext from '../../../store/cart-context';

const formErrorReducer = (state, action) => {
	if (action.type === 'PRODUCT_NAME_INPUT') {
		return {
			name: action.value,
			description: state.description,
			price: state.price,
			isValidName: action.value.length >= 3,
			isValidDescription: state.isValidDescription,
			isValidPrice: state.isValidPrice,
		};
	} else if (action.type === 'PRODUCT_DESC_INPUT') {
		return {
			name: state.name,
			description: action.value,
			price: state.value,
			isValidName: state.isValidName,
			isValidDescription: action.value.length > 20,
			isValidPrice: state.isValidPrice,
		};
	} else if (action.type === 'PRODUCT_PRICE_INPUT') {
		return {
			name: state.name,
			description: state.description,
			price: action.value,
			isValidName: state.isValidName,
			isValidDescription: state.isValidDescription,
			isValidPrice: action.value > 0,
		};
	} else if (action.type === 'CLEAR_INPUT') {
		return {
			name: '',
			description: '',
			price: 0,
			isValidName: true,
			isValidDescription: true,
			isValidPrice: true,
		};
	}

	return {
		name: '',
		description: '',
		price: 0,
		isValidName: null,
		isValidDescription: null,
		isValidPrice: null,
	};
};

function AddProductForm(props) {
	const [error, setError] = useState();
	const [isEntereing, setIsEntering] = useState(false);

	const [formState, dispatchFormInput] = useReducer(formErrorReducer, {
		name: '',
		description: '',
		price: 0,
		isValidName: null,
		isValidDescription: null,
		isValidPrice: null,
	});

	const formFousedHandler = () => {
		setIsEntering(true);
	};
	const finishLoading = () => {
		setIsEntering(false);
	};

	const submitForm = (data) => {
		console.log(data);
		dispatchFormInput({ type: 'CLEAR_INPUT' });
		props.onClickBackdrop();
	};
	const addProductHandler = (event) => {
		event.preventDefault();
		const productname = formState.name.trim();
		const description = formState.description.trim();
		const price = formState.price;
		if (!description || !productname.length === 0) {
			setError({
				title: 'Invalid input!',
				message: 'Please enter a valid name and description.',
			});
			return;
		}
		if (productname.length < 3) {
			setError({
				title: 'Invalid productname!',
				message: 'Please enter a valid productname.',
			});
			return;
		}
		if (description.length < 20) {
			setError({
				title: 'Invalid Description!',
				message: 'Description should be of atleast 20 letters.',
			});
			return;
		}

		if (price <= 0) {
			setError({
				title: 'Invalid price!',
				message: 'Please enter a valid price(>0).',
			});
			return;
		}
		submitForm({ name: productname, description, price });
	};

	const clearError = () => {
		setError(null);
	};
	const setProductnameHandler = (event) => {
		dispatchFormInput({
			type: 'PRODUCT_NAME_INPUT',
			value: event.target.value,
		});
	};

	const setDescriptionHandler = (event) => {
		dispatchFormInput({
			type: 'PRODUCT_DESC_INPUT',
			value: event.target.value,
		});
	};
	const setPriceHandler = (event) => {
		dispatchFormInput({
			type: 'PRODUCT_PRICE_INPUT',
			value: event.target.value,
		});
	};
	return (
		<Modal backdropHandler={props.onClickBackdrop}>
			<Prompt
				when={isEntereing}
				message={() =>
					'Are you sure you want to leave? All your entered data will be lost!'
				}
			/>
			{props.isLoading && (
				<div className='loading'>
					<LoadingSpinner />
				</div>
			)}
			{error ? (
				<ErrorModal error={error} onClick={clearError} />
			) : (
				<form
					onSubmit={addProductHandler}
					className='formBox'
					onFocus={formFousedHandler}>
					<label htmlFor='productname' className='formBox-label'>
						Product name
					</label>
					<input
						type='text'
						id='productname'
						className={`formBox-input ${
							formState.isValidName === false ? 'inValid' : ''
						}`}
						value={formState.name}
						autoComplete='off'
						onChange={setProductnameHandler}
					/>
					<label htmlFor='description' className='formBox-label'>
						Description
					</label>

					<textarea
						type='text'
						id='description'
						className={`formBox-input description ${
							formState.isValidDescription === false
								? 'inValid'
								: ''
						}`}
						value={formState.description}
						autoComplete='off'
						onChange={setDescriptionHandler}
					/>
					<label htmlFor='price' className='formBox-label'>
						Price (in ₹)
					</label>
					<input
						type='number'
						id='price'
						className={`formBox-input ${
							formState.isValidPrice === false ? 'inValid' : ''
						}`}
						value={formState.price}
						autoComplete='off'
						onChange={setPriceHandler}
					/>
					<div className='formBox-btnBox'>
						<Button
							className='formBox-button'
							onClick={finishLoading}>
							Add Product
						</Button>
					</div>
				</form>
			)}
		</Modal>
	);
}

const Product = (props) => {
	const [quantity, setQuantity] = useState(1);

	const incrementQuantity = () => {
		setQuantity((preQuantity) => {
			return ++preQuantity;
		});
	};
	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity((preQuantity) => {
				return --preQuantity;
			});
		} else {
			alert('You have reached min-limit!');
		}
	};

	const addToCart = () => {
		if (!quantity) {
			return;
		}

		props.addToCartHandler(quantity, props.id);
	};
	const addToWishList = () => {
		props.wishListHandler(props.id);
	};

	const handler = (event) => {
		event.preventDefault();
	};

	return (
		<div className='product' onClick={props.onClick}>
			<div className='product-imageBox'>
				<img
					src={props.image}
					alt={`${props.name}.png`}
					className='product-image'
				/>
			</div>
			<div className='product-productBox'>
				<h3 className='product-name'>{props.name}</h3>
				<p className='product-description'>{props.description}</p>
				<p className='product-price'>₹{props.price.toFixed(2)}</p>

				<div className='product-rating'>
					<p className='rating-num'>{props.rating.rate}</p>
					<p className='rating-count'>{props.rating.count}</p>
				</div>
			</div>
			<div className='product-formBox'>
				<form className='product-form' onSubmit={handler}>
					<div className='product-form-quantity'>
						<label htmlFor='quantity' className='product-quantity'>
							Quantity : {quantity}
						</label>
						<div className='product-quantityBtns'>
							<input
								type='button'
								value='+'
								className='product-quantityInputBtn'
								onClick={incrementQuantity}
								readOnly
							/>
							<input
								type='button'
								value='-'
								className='product-quantityInputBtn'
								onClick={decrementQuantity}
								readOnly
							/>
						</div>
					</div>
					<div className='product-form-buttons'>
						<Button
							className='product-cartBtn'
							id='cartBtn'
							onClick={addToCart}>
							Add to cart
						</Button>
						<Button
							className='product-wishlistBtn'
							id='wishlistBtn'
							onClick={addToWishList}>
							Add to wishlist
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default function Products() {
	const sortProducts = (products, ascending = true) => {
		return products.sort((prodA, prodB) => {
			if (ascending) {
				return prodA.id > prodB.id ? 1 : -1;
			} else {
				return prodA.id < prodB.id ? 1 : -1;
			}
		});
	};

	const productContext = useContext(ProductContext);
	const cartContext = useContext(CartContext);
	const [is_productform_active, set_product_form_active] = useState(false);

	const history = useHistory();
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);
	const sortType = parseInt(queryParams.get('sort_asc') || 1);

	const sortedProducts = sortProducts(productContext.products, sortType);

	const productClickHandler = (event) => {
		console.log('Product Clicked!');
	};
	const addToCartHandler = (quantity, id) => {
		console.log(quantity, id);
		cartContext.addItem(id, quantity);
	};
	const wishListHandler = (id) => {
		console.log('Whishlist Clicked!', id);
	};
	const sortHandler = () => {
		history.push({
			pathname: `${location.pathname}`,
			search: `?sort_asc=${sortType ? 0 : 1}`,
		});
	};

	const productList = sortedProducts.map((product) => (
		<li className='card products-list-item' key={product._id}>
			<Product
				id={product._id}
				name={product.name}
				price={product.price}
				description={product.description}
				image={product.image}
				rating={product.rating}
				onClick={productClickHandler}
				addToCartHandler={addToCartHandler}
				wishListHandler={wishListHandler}
			/>
		</li>
	));

	return (
		<section className='products'>
			{is_productform_active && (
				<AddProductForm
					onClickBackdrop={set_product_form_active.bind(null, false)}
				/>
			)}
			<div className='sortButton-box'>
				<Button onClick={sortHandler} className='sortButton'>
					Sort {sortType === 1 ? 'Descending' : 'Ascending'}
				</Button>
				<Button onClick={set_product_form_active.bind(null, true)}>
					Add
				</Button>
				<label>{cartContext.size}</label>
			</div>

			<ul className='products-list'>
				{productContext.loading && <LoadingSpinner />}
				{!productContext.loading &&
				productContext.products.length > 0 ? (
					productList
				) : (
					<p>No products found!</p>
				)}
			</ul>
		</section>
	);
}
