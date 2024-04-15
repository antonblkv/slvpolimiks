import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Context } from '../index';
import '../styles/lk.css';
import { useLocation, useNavigate } from 'react-router-dom';

const PersonalAccount = () => {
	const { user } = useContext(Context);

	const logOut = () => {
		localStorage.removeItem('token');
		user.setUser({});
		user.setIsAuth(false);
	};

	return (
		<main className='lk-main'>
			<div className='lk-wrapper'>
				<div className='lk-body'>
					<div className='lk-title'>
						<h1 class='title'>Личный кабинет</h1>
					</div>

					<div className='lk-body'>
						<div className='user-data'>
							<h2 className='user-data-title'>Мои данные</h2>
							<Form className='form-container'>
								<Form.Control className='form-lk' />

								<Form.Control className='form-lk' placeholder='Введите название устройства' />

								<button className='button-exit' onClick={()=> logOut()}>Выйти</button>

								<Form.Control className='form-lk' placeholder='Введите название устройства' />

								<Form.Control className='form-lk' placeholder='Введите название устройства' />

								<button className='button-save'>Сохранить</button>
								

							</Form>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PersonalAccount;
