import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Context } from '../index';
import '../styles/lk.css';

const PersonalAccount = () => {
	const { user } = useContext(Context);

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
							<Form>
								<div className='first-row'>
									<Form.Control className='form-lk'/>

									<Form.Control className='form-lk' placeholder='Введите название устройства' />
								</div>

								<div className='second-row'>
									<Form.Control className='form-lk' placeholder='Введите название устройства' />

									<Form.Control className='form-lk' placeholder='Введите название устройства' />

									<button className='button-lk'>Сохранить</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PersonalAccount;
