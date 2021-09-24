import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
export default function CheckOut(props) {
	const checkOutHandler = (event) => {
		event.preventDefault();
	};
	return (
		<Modal backdropHandler={props.onClickBackdop}>
			<form className='checkout__form' onSubmit={checkOutHandler}>
				<div className='formField'>
					<label htmlFor='address' className='form__label'>
						Address
					</label>
					<textarea
						name='address'
						id='address'
						cols='30'
						rows='10'
						className='form__input'></textarea>
				</div>
				<div className='formField'>
					<label htmlFor='street' className='form__label'>
						Street
					</label>
					<input id='street' className='form__input' />
				</div>
				<div className='formField'>
					<label htmlFor='city' className='form__label'>
						City
					</label>
					<input id='city' className='form__input' />
				</div>
				<div className='formField'>
					<label htmlFor='postCode' className='form__label'>
						Postal Code
					</label>
					<input id='postCode' className='form__input' />
				</div>
				<Button type='submit'>Confirm</Button>
				<Button onClick={props.onClickBackdop}>Cancel</Button>
			</form>
		</Modal>
	);
}
