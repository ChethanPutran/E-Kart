import Modal from '../Modal/Modal';
import Button from '../button/Button';
import './ErrorModal.css';

export default function ErrorModal(props) {
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
}
