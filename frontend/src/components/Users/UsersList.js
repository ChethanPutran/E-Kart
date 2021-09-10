import Card from '../UI/Card/Card';
import './Users.css';

const UsersList = (props) => {
	return (
		<Card>
			<ul className='usersList'>
				{props.users.map((user) => (
					<li className='usersList__item' key={user.id}>
						<h3 className='userList__name'>{user.username}</h3>
						<p className='userList__age'>{user.age}</p>
					</li>
				))}
			</ul>
		</Card>
	);
};

export default UsersList;
