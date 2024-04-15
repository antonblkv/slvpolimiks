import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { Context } from '../index';
import '../styles/auth.css';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = observer(() => {
	const { user } = useContext(Context);
	const location = useLocation();
	const history = useNavigate();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

	const click = async () => {
		try {
			let data;
			if (isLogin) {
				data = await login(phone, password);
			} else {
				data = await registration(phone, password);
			}
			user.setUser(user);
			user.setIsAuth(true);
			history(MAIN_ROUTE);
		} catch (e) {
			alert(e.response.data.message);
		}
	};

	return (
		<main className='auth-main'>
			<div className='auth-wrapper'>
				<div className='auth-body'>
					<div className='auth-title'>
						<h1 className='title'>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
					</div>
					<Form className='auth-form'>
						<Form.Control
							className='auth-input'
							placeholder='Номер телефона'
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
						<Form.Control
							className='auth-input'
							placeholder='Пароль'
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</Form>
					<button className='button-auth' onClick={click}>
						{isLogin ? 'Войти' : 'Регистрация'}
					</button>
					{isLogin ? (
						<div className='auth-form-footer'>
							<p>Нет аккаунта?</p>
							<a onClick={() => history(REGISTRATION_ROUTE)}>Зарегистрируйся!</a>
						</div>
					) : (
						<div className='auth-form-footer'>
							<p>Есть аккаунт?</p>
							<a onClick={() => history(LOGIN_ROUTE)}>Войдите!</a>
						</div>
					)}
				</div>
			</div>
		</main>
	);
});

export default Auth;
