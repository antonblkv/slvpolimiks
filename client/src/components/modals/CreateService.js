import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { createService, fetchTypes } from '../../http/serviceAPI';
import close from '../../images/close.svg';
import { Context } from '../../index';
import '../../styles/createService.css';

const CreateService = observer(({ show, onHide }) => {
	const { service } = useContext(Context);

	useEffect(() => {
		fetchTypes().then(data => service.setTypes(data));
	}, [service]);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onBlur' });

	const onSubmit = data => {
		const formData = new FormData();
		for (const key in data) {
			if (key === 'img') {
				formData.append(key, data[key][0]);
			} else {
				formData.append(key, data[key]);
			}
		}
		createService(formData).then(data => onHide());
		reset();
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<div className='modal-header'>
				<div className='modal-title'>Добавить услугу</div>
				<img className='modal-x' src={close} alt='Закрыть' onClick={onHide} />
			</div>
			<div className='modal-body'>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<select name='select-types' className='form-select' {...register('typeId')}>
						<option className='option-type' hidden>
							Выберите категорию
						</option>
						{service.types.map(type => (
							<option className='option-type' key={type.id} value={type.id}>
								{type.name}
							</option>
						))}
					</select>

					<Form.Control
						{...register('name', {
							required: 'Поле обязательно к заполнению',
							maxLength: { value: 40, message: 'Максимум 40 символов' },
							pattern: { value: /^[а-яА-Я\s]*$/, message: 'Только русские буквы' },
						})}
						className='form form-name'
						placeholder='Введите название услуги'
					/>
					<div className='form-error'>{errors?.name && <p>{errors?.name?.message}</p>}</div>

					<Form.Control
						as='textarea'
						{...register('description', {
							required: 'Поле обязательно к заполнению',
							maxLength: { value: 247, message: 'Максимум 247 символов' },
						})}
						className='form form-description'
						placeholder='Описание'
					/>
					<div className='form-error'>{errors?.description && <p>{errors?.description?.message}</p>}</div>

					<Form.Control
						type='number'
						{...register('price', {
							required: 'Поле обязательно к заполнению',
							minLength: { value: 4, message: 'Минимум 4 символа' },
							maxLength: { value: 9, message: 'Максимум 9 символов' },
						})}
						className='form form-price'
						placeholder='Введите стоимость услуги'
					/>
					<div className='form-error'>{errors?.price && <p>{errors?.price?.message}</p>}</div>

					<Form.Control className='form form-img' type='file' {...register('img')} />
					<Form.Control className='modal-button' type='submit' value={'Добавить'} />
				</Form>
			</div>
		</Modal>
	);
});

export default CreateService;
