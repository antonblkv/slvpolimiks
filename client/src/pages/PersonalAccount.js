import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Context } from '../index';
import '../styles/lk.css';
import { observer } from 'mobx-react-lite';
import { fetchOneUser, updateUser } from '../http/userAPI';

const PersonalAccount = observer(() => {
	const { user } = useContext(Context);
	const currentUser = user.oneUser;
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		fetchOneUser().then(data => user.setUser(data));
	}, []);

	const logOut = () => {
		localStorage.removeItem('token');
		user.setUser({});
		user.setIsAuth(false);
	};

	const update = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('phone', phone);
		formData.append('email', email);
		formData.append('password', password);
		updateUser(formData);
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
								<Form.Control
									className='form-lk'
									placeholder={currentUser.name}
									value={name}
									onChange={e => setName(e.target.value)}
								/>

								<Form.Control
									className='form-lk'
									placeholder={currentUser.phone}
									value={phone}
									onChange={e => setPhone(e.target.value)}
								/>

								<button className='button-exit' onClick={() => logOut()}>
									Выйти
								</button>

								<Form.Control
									className='form-lk'
									placeholder={currentUser.email}
									value={email}
									onChange={e => setEmail(e.target.value)}
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
							</Form>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
});

export default PersonalAccount;
