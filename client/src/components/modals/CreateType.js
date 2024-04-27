import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { createType } from '../../http/serviceAPI';
import close from '../../images/close.svg';

const CreateType = ({ show, onHide }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onBlur' });

	const onSubmit = data => {
		createType(data).then(data => onHide());
		reset();
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<div className='modal-header'>
				<div className='modal-title'>Добавить категорию</div>
				<img className='modal-x' src={close} alt='Закрыть' onClick={onHide} />
			</div>
			<div className='modal-body'>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Control
						{...register('name', {
							required: 'Поле обязательно к заполнению',
							maxLength: { value: 20, message: 'Максимум 40 символов' },
							pattern: { value: /^[а-яА-Я\s]*$/, message: 'Только русские буквы' },
						})}
						placeholder={'Введите название категории'}
						className='form'
					/>
					<div className='form-error'>{errors?.name && <p>{errors?.name?.message}</p>}</div>
					<Form.Control className='modal-button' type='submit' value={'Добавить'} />
				</Form>
			</div>
		</Modal>
	);
};

export default CreateType;
