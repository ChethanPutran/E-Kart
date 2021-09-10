import { useState } from 'react';
import AddUser from '../components/Users/AddUser';
import UsersList from '../components/Users/UsersList';

const initialUsers = [
	{ id: '45fshgjhbia6tfa4u', username: 'Rock', age: 23 },
	{ id: '3232shgjh232tfa4u', username: 'Joker', age: 21 },
	{ id: '4232shgjhbia6tfa4u', username: 'Motu', age: 24 },
	{ id: '45fs2332ia6tfa4u', username: 'Sheetal', age: 27 },
];

export default function App() {
	const [users, setUsers] = useState(initialUsers);
	const addUser = (username, age) => {
		//Updating users
		setUsers((previousUsers) => {
			return [
				...previousUsers,
				{ id: Math.random(), username, age: +age },
			];
		});
	};
	return (
		<div>
			<AddUser addUser={addUser} />
			<UsersList users={users} />
		</div>
	);
}
