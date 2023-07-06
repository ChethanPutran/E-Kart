import AuthContext from '../../store/auth-context';
import { useContext } from 'react/cjs/react.development';
import './Login.css';


export default function Login(params) {
	const auth_context = useContext(AuthContext);

	const loginFormHandler = (event) => {
		event.preventDefault();
		const email_ = event.target.email.value;
		const pass_ = event.target.password.value;

		if (!email_ || !pass_) {
			return alert("Field/s can't be empty!");
		}
		auth_context.on_login();
	};

	const validateForm = (event) => {};

	return (
		<form className='login__form' onSubmit={loginFormHandler}>
			<div className='form__field'>
				<label htmlFor='email' className='form__label'>
					Email
				</label>
				<input
					type='text'
					className='form__input'
					name='email'
					onChange={validateForm}
				/>
			</div>
			<div className='form__field'>
				<label htmlFor='password' className='form__label'>
					Password
				</label>
				<input
					type='password'
					className='form__input'
					name='password'
					onChange={validateForm}
				/>
			</div>
			<div className='form__field'>
				<input type='submit' className='form__input' value={'Login'} />
			</div>
		</form>
	);
}
