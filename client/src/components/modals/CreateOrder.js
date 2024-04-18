import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { createService, fetchTypes } from '../../http/serviceAPI';
import close from '../../images/close.svg';
import { Context } from '../../index';
import '../../styles/createService.css';

const CreateOrder = observer(({ show, onHide }) => {
	const { service } = useContext(Context);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState();
	const [file, setFile] = useState(null);

	useEffect(() => {
		fetchTypes().then(data => service.setTypes(data));
	}, [service]);

	const selectFile = e => {
		setFile(e.target.files[0]);
	};

	const addService = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('price', `${price}`);
		formData.append('img', file);
		formData.append('typeId', service.selectedType.id);
		createService(formData).then(data => onHide());
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
						value={name}
						onChange={e => setName(e.target.value)}
						className='form form-name'
						placeholder='Номер телефона'
					/>

					<Form.Control
						as='textarea'
						value={description}
						onChange={e => setDescription(e.target.value)}
						className='form form-description'
						placeholder='Комментарий'
					/>

					<div class='checkbox'>
						<input type='checkbox' id='checkbox' className='modal-checkbox' />
						<label className='modal-checkbox-label'>Даю согласие на обработку персональных данных</label>
					</div>

					<button className='modal-button'>Перезвоните мне</button>
				</Form>
			</div>
		</Modal>
	);
});

export default CreateOrder;
