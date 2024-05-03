import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import TableOrders from '../components/TableOrders';
import CreateService from '../components/modals/CreateService';
import CreateType from '../components/modals/CreateType';
import DeleteType from '../components/modals/DeleteType';
import { fetchOrders } from '../http/orderApi';
import { fetchOneUser, updateUser } from '../http/userAPI';
import { Context } from '../index';
import '../styles/admin.css';

const Admin = observer(() => {
	const { user } = useContext(Context);
	const { order } = useContext(Context);
	const currentUser = user.user;

	useEffect(() => {
		fetchOneUser().then(data => user.setUser(data));
	}, []);

	useEffect(() => {
		fetchOrders(null).then(data => order.setOrders(data));
	}, []);

	const logOut = () => {
		localStorage.removeItem('token');
		user.setUser({});
		user.setIsAuth(false);
		user.setIsAdmin(false);
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

	const [typeVisible, setTypeVisible] = useState(false);
	const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
	const [serviceVisible, setServiceVisible] = useState(false);

	return (
		<main className='admin-main'>
			<div className='admin-wrapper'>
				<div className='admin-title'>
					<h1 class='title'>Панель администратора</h1>
				</div>

				<div className='admin-body'>
					<h2 className='user-data-title'>Редактирование</h2>
					<div className='admin-buttons'>
						<button className='create-button' onClick={() => setServiceVisible(true)}>
							Добавить услугу
						</button>
						<button className='create-button' onClick={() => setTypeVisible(true)}>
							Добавить категорию
						</button>
						<button className='delete-button' onClick={() => setDeleteTypeVisible(true)}>
							Удалить категорию
						</button>
					</div>
					<div className='admin-data'>
						<Form className='form-admin' onSubmit={handleSubmit(onSubmit)}>
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

							<button className='button-exit' onClick={() => logOut()}>
								Выйти
							</button>
						</Form>
					</div>

					<div className='my-orders'>
						<h2 className='user-data-title'>Заявки</h2>
						<TableOrders></TableOrders>
					</div>
				</div>
			</div>
			<CreateService show={serviceVisible} onHide={() => setServiceVisible(false)} />
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<DeleteType show={deleteTypeVisible} onHide={() => setDeleteTypeVisible(false)} />
		</main>
	);
});

export default Admin;
