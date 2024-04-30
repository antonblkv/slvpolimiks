import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import TableOrders from '../components/TableOrders';
import { fetchOrders } from '../http/orderApi';
import { fetchOneUser, updateUser } from '../http/userAPI';
import { Context } from '../index';
import '../styles/lk.css';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

const PersonalAccount = observer(() => {
	const { user } = useContext(Context);
	const { order } = useContext(Context);
	const currentUser = user.user;

	useEffect(() => {
		fetchOneUser().then(data => user.setUser(data));
	}, []);

	useEffect(() => {
		fetchOrders(currentUser.id).then(data => order.setOrders(data));
	}, [currentUser.id]);

	const logOut = () => {
		localStorage.removeItem('token');
		user.setUser({});
		user.setIsAuth(false);
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onBlur' });

	const onSubmit = data => {
		updateUser(data).then();
		reset();
	};


	return (
		<main className='lk-main'>
			<div className='lk-wrapper'>
				<div className='lk-title'>
					<h1 class='title'>Личный кабинет</h1>
				</div>

				<div className='lk-body'>
					<div className='user-data'>
						<h2 className='user-data-title'>Мои данные</h2>
						<Form className='form-container' onSubmit={handleSubmit(onSubmit)}>
							<Form.Control
								className='form-lk'
								placeholder={currentUser.name ? currentUser.name : 'Ваше имя'}
								{...register('name', {
									maxLength: { value: 20, message: 'Максимум 20 символов' },
									pattern: { value: /^[а-яА-Я]*$/, message: 'Только русские буквы' },
								})}
							/>
							<div className='form-error'>{errors?.name && <p>{errors?.name?.message}</p>}</div>

							<Form.Control
								className='form-lk'
								placeholder={currentUser.phone}
								as={InputMask}
								mask='+7 (***) ***-**-**'
								{...register('phone', {
									pattern: {
										value: /^\+\d{1,3}\s*\(\d{1,3}\)\s*\d{3}-\d{2}-\d{2}$/,
										message: 'Необходимо ввести номер полностью',
									},
								})}
							/>
							<div className='form-error'>{errors?.phone && <p>{errors?.phone?.message}</p>}</div>

							<button className='button-exit' onClick={() => logOut()}>
								Выйти
							</button>

							<Form.Control
								className='form-lk'
								placeholder={currentUser.email ? currentUser.email : 'Ваш Email'}
								{...register('email', {
									pattern: { value: /^[a-zA-Z@.]*$/, message: 'Только английские буквы' },
								})}
							/>
							<div className='form-error'>{errors?.email && <p>{errors?.email?.message}</p>}</div>

							<Form.Control
								className='form-lk'
								placeholder='Пароль'
								type='password'
								{...register('password', {
									maxLength: { value: 20, message: 'Максимум 20 символов' },
									minLength: { value: 6, message: 'Минимум 6 символов' },
								})}
							/>
							<div className='form-error'>{errors?.password && <p>{errors?.password?.message}</p>}</div>

							<Form.Control className='button-save' type='submit' value={'Сохранить'} />
						</Form>
					</div>

					<div className='my-orders'>
						<h2 className='user-data-title'>Мои заявки</h2>
						<TableOrders></TableOrders>
					</div>
				</div>
			</div>
		</main>
	);
});

export default PersonalAccount;
