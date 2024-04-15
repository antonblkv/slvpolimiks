import React, { useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Context } from '../index';
import '../styles/lk.css';
import { observer } from 'mobx-react-lite';
import { fetchOneUser } from '../http/userAPI';

const PersonalAccount = observer(() => {
	const { user } = useContext(Context);
	const currentUser = user.oneUser;
	
	useEffect(() => {
		fetchOneUser().then(data => user.setUser(data));
	}, [])

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
								<Form.Control className='form-lk' placeholder={currentUser.name} />

								<Form.Control className='form-lk' placeholder={currentUser.phone} />

								<button className='button-exit' onClick={() => logOut()}>
									Выйти
								</button>

								<Form.Control className='form-lk' placeholder={currentUser.email} />

								<Form.Control className='form-lk' placeholder={currentUser.password} />

								<button className='button-save'>Сохранить</button>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
});

export default PersonalAccount;
