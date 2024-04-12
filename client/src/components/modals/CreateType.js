import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { createType } from '../../http/serviceAPI';
import close from '../../images/close.svg';

const CreateType = ({ show, onHide }) => {
	const [value, setValue] = useState('');

	const addType = () => {
		createType({ name: value }).then(data => {
			setValue('');
			onHide();
		});
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<div className='modal-header'>
				<div className='modal-title'>Добавить категорию</div>
				<img className='modal-x' src={close} alt='Закрыть' onClick={onHide} />
			</div>
			<div className='modal-body'>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={'Введите название категории'}
						className='form'
					/>
				</Form>
				<button className='modal-button' onClick={addType}>
					Добавить
				</button>
			</div>
		</Modal>
	);
};

export default CreateType;
