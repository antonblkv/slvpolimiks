import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import close from '../../images/close.svg';
import { Context } from '../../index';
import '../../styles/createService.css';
import { createOrder } from '../../http/orderApi';

const CreateOrder = observer(({ show, onHide }) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [comment, setComment] = useState('');

	const addOrder = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('phone', phone);
		formData.append('comment', comment);
		createOrder(formData).then(data => onHide());
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<div className='modal-header'>
				<div className='modal-title'>
					Свяжемся с Вами
					<br /> в ближайшее время!
				</div>
				<img className='modal-x' src={close} alt='Закрыть' onClick={onHide} />
			</div>
			<div className='modal-body'>
				<div className='modal-subtitle'>Заполните форму для получения консультации</div>
				<Form>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className='form form-name'
						placeholder='Имя'
					/>

					<Form.Control
						value={phone}
						onChange={e => setPhone(e.target.value)}
						className='form form-name'
						placeholder='Номер телефона'
					/>

					<Form.Control
						as='textarea'
						value={comment}
						onChange={e => setComment(e.target.value)}
						className='form form-description'
						placeholder='Комментарий'
					/>

					<div class='checkbox'>
						<input type='checkbox' id='checkbox' className='modal-checkbox' />
						<label className='modal-checkbox-label'>Даю согласие на обработку персональных данных</label>
					</div>

					<button className='modal-button' onClick={addOrder}>Перезвоните мне</button>
				</Form>
			</div>
		</Modal>
	);
});

export default CreateOrder;
