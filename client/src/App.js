import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import Header from './components/Header';
import { check } from './http/userAPI';
import { Context } from './index';

const App = observer(() => {
	if (localStorage.getItem('token') !== null) {
		const { user } = useContext(Context);
		const [loading, setLoading] = useState(true);
		useEffect(() => {
			check()
				.then(data => {
					user.setIsAuth(true);
					user.setUser(data);
					user.setIsAdmin(user.user.role === 'ADMIN');
				})
				.finally(() => setLoading(false));
		});
		if (loading) {
			return <Spinner animation={'grow'} />;
		}
	}

	return (
		<BrowserRouter>
			<Header />
			<AppRouter />
			<Footer />
		</BrowserRouter>
	);
});

export default App;
