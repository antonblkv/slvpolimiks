import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import '../styles/admin.css';
import CreateService from '../components/modals/CreateService';
import CreateType from '../components/modals/CreateType';
import { Context } from '../index';
import { fetchOneUser, updateUser } from '../http/userAPI';
import TableOrders from '../components/TableOrders';
import { fetchOrders } from '../http/orderApi';

const Admin = () => {
	const { user } = useContext(Context);
	const { order } = useContext(Context);
	const currentUser = user.user;
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

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
	};

	const update = () => {
		const formData = new FormData();
		formData.append('phone', phone);
		formData.append('password', password);
		updateUser(formData);
	};
	const [typeVisible, setTypeVisible] = useState(false);
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
						<button className='delete-button'>Удалить категорию</button>
					</div>
					<div className='admin-data'>
						<Form className='form-admin'>
							<Form.Control
								className='form-lk'
								placeholder={currentUser.phone}
								value={phone}
								onChange={e => setPhone(e.target.value)}
							/>

							<Form.Control
								className='form-lk'
								placeholder={currentUser.password}
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>

							<button className='button-save' onClick={update}>
								Сохранить
							</button>

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
		</main>
	);
};

export default Admin;
