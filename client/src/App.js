import { useState } from 'react';
import Chat from 'components/Chat';
import LoginForm from 'components/LoginForm';
import NavBar from 'components/NavBar';
import { getUser, logout } from 'utils/auth';

const App = () => {
	const [user, setUser] = useState(getUser);

	const handleLogout = () => {
		logout();
		setUser(null);
	};

	return (
		<>
			<header>
				<NavBar user={user} onLogout={handleLogout} />
			</header>
			<main>
				{!!user && <Chat user={user} />}
				{!user && <LoginForm onLogin={setUser} />}
			</main>
		</>
	);
};

export default App;
