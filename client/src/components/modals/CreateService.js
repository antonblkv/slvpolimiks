import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { createService, fetchTypes } from '../../http/serviceAPI';
import { Context } from '../../index';
import '../../styles/createService.css';
import close from '../../images/close.svg';

const CreateService = observer(({ show, onHide }) => {
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
				<div className='modal-title'>Добавить услугу</div>
				<img className='modal-x' src={close} alt='Закрыть' onClick={onHide} />
			</div>
			<div className='modal-body'>
				<Form>
					<Dropdown>
						<Dropdown.Toggle>{service.selectedType.name || 'Выберите категорию'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{service.types.map(type => (
								<Dropdown.Item onClick={() => service.setSelectedType(type)} key={type.id}>
									{type.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className='form form-name'
						placeholder='Введите название устройства'
					/>

					<Form.Control
						as='textarea'
						value={description}
						onChange={e => setDescription(e.target.value)}
						className='form form-description'
						placeholder='Описание'
					/>

					<Form.Control
						value={price}
						onChange={e => setPrice(Number(e.target.value))}
						className='form form-price'
						placeholder='Введите стоимость устройства'
					/>
					<Form.Control className='form form-img' type='file' onChange={selectFile} />
				</Form>
				<button className='modal-button' onClick={addService}>
					Добавить
				</button>
			</div>
		</Modal>
	);
});

export default CreateService;
