import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { fetchTypes, updateService } from '../../http/serviceAPI';
import close from '../../images/close.svg';
import { Context } from '../../index';
import '../../styles/createService.css';


const UpdateService = observer(({ show, onHide, currentService }) => {
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
		formData.append('id', currentService.id);
		updateService(formData).then(data => window.location.reload());
		reset();
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<div className='modal-header'>
				<div className='modal-title'>Редактировать услугу</div>
				<img className='modal-x' src={close} alt='Закрыть' onClick={onHide} />
			</div>
			<div className='modal-body'>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<select name='select-types' className='form-select' {...register('typeId')}>
						<option className='option-type' hidden value={0}>
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
							maxLength: { value: 30, message: 'Максимум 30 символов' },
							pattern: { value: /^[а-яА-Я]*$/, message: 'Только русские буквы' },
						})}
						className='form form-name'
						placeholder={currentService.name ? currentService.name : 'Введите название услуги'}
					/>
					<div className='form-error'>{errors?.name && <p>{errors?.name?.message}</p>}</div>

					<Form.Control
						as='textarea'
						{...register('description', {
							maxLength: { value: 255, message: 'Максимум 255 символов' },
						})}
						className='form form-description'
						placeholder={currentService.description ? currentService.description : 'Описание'}
					/>
					<div className='form-error'>{errors?.description && <p>{errors?.description?.message}</p>}</div>

					<Form.Control
						type='number'
						{...register('price', {
							minLength: { value: 4, message: 'Минимум 4 символа' },
							maxLength: { value: 9, message: 'Максимум 9 символов' },
						})}
						className='form form-price'
						placeholder={currentService.price ? currentService.price : 'Введите стоимость услуги'}
					/>
					<div className='form-error'>{errors?.price && <p>{errors?.price?.message}</p>}</div>

					<Form.Control className='form form-img' type='file' {...register('img')} />
					<Form.Control
						className='modal-button-edit'
						type='submit'
						value={'Изменить'}
					/>
				</Form>
			</div>
		</Modal>
	);
});

export default UpdateService;
