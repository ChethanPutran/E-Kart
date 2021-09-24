import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import { useContext, useReducer, useState } from 'react';
import AuthContext from '../../../store/auth-context';
import ErrorModal from './ErrorModal/ErrorModal';
import { Prompt } from 'react-router-dom';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import './AddProductForm.css';

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

export default function AddProductForm(props) {
	const context = useContext(AuthContext);
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
	return (
		<>
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
			{context.isAdmin ? (
				error ? (
					<ErrorModal error={error} onClick={clearError} />
				) : (
					<form
						onSubmit={addProductHandler}
						className='formBox'
						onFocus={formFousedHandler}>
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

						<textarea
							type='text'
							id='description'
							className={`formBox__input description ${
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
							<Button
								className='formBox__button'
								onClick={finishLoading}>
								Add Product
							</Button>
						</div>
					</form>
				)
			) : (
				<Card className='posCenter'>
					<h2 className='txtCenter'>Only Admin can add products</h2>
				</Card>
			)}
		</>
	);
}
