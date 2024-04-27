import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { Context } from '../index';
import '../styles/auth.css';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

const Auth = observer(() => {
	const { user } = useContext(Context);
	const location = useLocation();
	const history = useNavigate();
	const isLogin = location.pathname === LOGIN_ROUTE;

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onBlur' });

	const onSubmit = async data => {
		try {
			let dataUser;
			if (isLogin) {
				dataUser = await login(data.phone, data.password);
			} else {
				console.log(data.phone);
				console.log(data.password);
				dataUser = await registration(data.phone, data.password);
			}
			user.setUser(dataUser);
			user.setIsAuth(true);
			user.setIsAdmin(user.user.role === 'ADMIN');
			reset();
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
					<Form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
						<Form.Control
							className='auth-input'
							placeholder='Номер телефона'
							as={InputMask}
							mask='+7 (***) ***-**-**'
							{...register('phone', {
								required: 'Поле обязательно к заполнению',
								pattern: {
									value: /^\+\d{1,3}\s*\(\d{1,3}\)\s*\d{3}-\d{2}-\d{2}$/,
									message: 'Необходимо ввести номер полностью',
								},
							})}
						/>
						<div className='form-error'>{errors?.phone && <p>{errors?.phone?.message}</p>}</div>

						<Form.Control
							className='auth-input'
							placeholder='Пароль'
							type='password'
							{...register('password', {
								required: 'Поле обязательно к заполнению',
								maxLength: { value: 20, message: 'Максимум 20 символов' },
								minLength: { value: 6, message: 'Минимум 6 символов' },
							})}
						/>
						<div className='form-error'>{errors?.password && <p>{errors?.password?.message}</p>}</div>

						<Form.Control className='button-auth' type='submit' value={isLogin ? 'Войти' : 'Зарегистрироваться'} />
					</Form>
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
