import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import './Users.css';
import { useState } from 'react';

const AddUser = (props) => {
	let [username, setUsername] = useState('');
	let [age, setAge] = useState(0);
	const addUserHandler = (event) => {
		event.preventDefault();
		username = username.trim();

		if (!age > 0 || !username.trim().length === 0) {
			return;
		}
		if (+age < 1) {
			return;
		}
		if (username.length < 1) {
			return;
		}
		props.addUser(username, age);
		setUsername('');
		setAge(0);
	};
	const setUsernameHandler = (event) => {
		setUsername(event.target.value);
	};
	const setAgeHandler = (event) => {
		setAge(event.target.value);
	};

	return (
		<Card className='formBox'>
			<form onSubmit={addUserHandler}>
				<label htmlFor='username' className='formBox__label'>
					Username
				</label>
				<input
					type='text'
					id='username'
					className='formBox__input'
					value={username}
					autoComplete='off'
					onChange={setUsernameHandler}
				/>
				<label htmlFor='age' className='formBox__label'>
					Age
				</label>
				<input
					type='number'
					id='age'
					className='formBox__input'
					value={age}
					autoComplete='off'
					onChange={setAgeHandler}
				/>
				<Button className='formBox__button'>Add User</Button>
			</form>
		</Card>
	);
};

export default AddUser;
