import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { createOrder } from '../../http/orderApi';
import close from '../../images/close.svg';
import '../../styles/createService.css';

const CreateOrder = observer(({ show, onHide }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onBlur' });

	const onSubmit = data => {
		createOrder(data).then(data => onHide());
		reset();
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
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Control
						{...register('name', {
							required: 'Поле обязательно к заполнению',
							maxLength: { value: 20, message: 'Максимум 20 символов' },
							pattern: { value: /^[а-яА-Я]*$/, message: 'Только русские буквы' },
						})}
						className='form form-name'
						placeholder='Имя'
					/>
					<div className='form-error'>{errors?.name && <p>{errors?.name?.message}</p>}</div>

					<Form.Control
						as={InputMask}
						mask='+7 (***) ***-**-**'
						{...register('phone', {
							required: 'Поле обязательно к заполнению',
							pattern: {
								value: /^\+\d{1,3}\s*\(\d{1,3}\)\s*\d{3}-\d{2}-\d{2}$/,
								message: 'Необходимо ввести номер полностью',
							},
						})}
						className='form form-name'
						placeholder='Номер телефона'
					/>
					<div className='form-error'>{errors?.phone && <p>{errors?.phone?.message}</p>}</div>

					<Form.Control
						as='textarea'
						{...register('comment', {
							maxLength: { value: 255, message: 'Максимум 255 символов' },
						})}
						className='form form-description'
						placeholder='Комментарий'
					/>
					<div className='form-error'>{errors?.comment && <p>{errors?.comment?.message}</p>}</div>

					<Form.Control className='modal-button' type='submit' />
				</Form>
			</div>
		</Modal>
	);
});

export default CreateOrder;
