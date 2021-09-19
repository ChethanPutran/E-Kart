import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import './Products.css';
import { useReducer, useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import './ErrorModal.css';
import Modal from '../UI/Modal/Modal';

const formErrorReducer = (state, action) => {
	if (action.type === 'PRODUCT_NAME_INPUT') {
		return {
			name: action.value,
			description: state.description,
			price: state.price,
			isValidName: action.value.length > 4,
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

const ErrorModal = (props) => {
	return (
		<Modal onClick={props.onClick}>
			<div className='errorModal'>
				<header className='errorModal__header'>
					<h3 className='errorModal__title'>{props.error.title}</h3>
				</header>
				<div className='errorModal__content'>
					<p className='errorModal__message'>{props.error.message}</p>
				</div>
				<footer className='errorModal__footer'>
					<Button
						className='errorModal__button'
						onClick={props.onClick}>
						Ok
					</Button>
				</footer>
			</div>
		</Modal>
	);
};

const AddProduct = (props) => {
	const [error, setError] = useState();

	const [formState, dispatchFormInput] = useReducer(formErrorReducer, {
		name: '',
		description: '',
		price: 0,
		isValidName: null,
		isValidDescription: null,
		isValidPrice: null,
	});

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
		if (productname.length < 4) {
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

		if (price < 0) {
			setError({
				title: 'Invalid price!',
				message: 'Please enter a valid price(>0).',
			});
			return;
		}

		props.addProduct({ name: productname, description, price });
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

	const context = useContext(AuthContext);
	return (
		<>
			{!context.isLoggedIn ? (
				error ? (
					<ErrorModal error={error} onClick={clearError} />
				) : (
					<form onSubmit={addProductHandler} className='formBox'>
						<label htmlFor='productname' className='formBox__label'>
							Product name
						</label>
						<input
							type='text'
							id='productname'
							className={`formBox__input ${
								formState.isValidName === false ? 'inValid' : ''
							}`}
							value={formState.name}
							autoComplete='off'
							onChange={setProductnameHandler}
						/>
						<label htmlFor='description' className='formBox__label'>
							Description
						</label>
						<input
							type='text'
							id='description'
							className={`formBox__input ${
								formState.isValidDescription === false
									? 'inValid'
									: ''
							}`}
							value={formState.description}
							autoComplete='off'
							onChange={setDescriptionHandler}
						/>
						<label htmlFor='price' className='formBox__label'>
							Price (in ₹)
						</label>
						<input
							type='number'
							id='price'
							className={`formBox__input ${
								formState.isValidPrice === false
									? 'inValid'
									: ''
							}`}
							value={formState.price}
							autoComplete='off'
							onChange={setPriceHandler}
						/>
						<div className='formBox__btnBox'>
							<Button className='formBox__button'>
								Add Product
							</Button>
							<Button
								className='formBox__button'
								onClick={props.closeAddProductModal}>
								Close
							</Button>
						</div>
					</form>
				)
			) : (
				<Card className='posCenter'>
					<h1 className='txtCenter'>Only Admin can add products</h1>
				</Card>
			)}
		</>
	);
};

export default AddProduct;
