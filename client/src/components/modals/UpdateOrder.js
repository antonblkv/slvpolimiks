import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { fetchServices } from '../../http/serviceAPI';
import close from '../../images/close.svg';
import { Context } from '../../index';
import '../../styles/createService.css';
import { updateOrder, deleteOrder } from '../../http/orderApi';

const UpdateOrder = observer(({ show, onHide, order }) => {
	const { service } = useContext(Context);

	useEffect(() => {
		fetchServices().then(data => {
			service.setServices(data);
		});
	}, []);

	const { register, handleSubmit, reset } = useForm();

	const onSubmit = data => {
		data.id = order.id;
		updateOrder(data).then(data => window.location.reload());
		reset();
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<div className='modal-header'>
				<div className='modal-title'>Редактировать заказ</div>
				<img className='modal-x' src={close} alt='Закрыть' onClick={onHide} />
			</div>
			<div className='modal-body'>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<select name='select-service' className='select-service' {...register('serviceId')}>
						<option className='option-type' hidden value={0}>
							Выберите услугу
						</option>
						{service.services.map(service => (
							<option className='option-type' key={service.id} value={service.id}>
								{service.name}
							</option>
						))}
					</select>

					<select name='select-status' className='select-status' {...register('status')}>
						<option className='option-type' hidden value={0}>
							Выберите статус
						</option>
						<option className='option-type' value='Зарегистрирована'>
							Зарегистрирована
						</option>
						<option className='option-type' value='В очереди'>
							В очереди
						</option>
						<option className='option-type' value='В работе'>
							В работе
						</option>
						<option className='option-type' value='Выполнена'>
							Выполнена
						</option>
						<option className='option-type' value='Отклонена'>
							Отклонена
						</option>
					</select>

					<Form.Control className='modal-button-edit' type='submit' value={'Изменить'} />
				</Form>
				<button
					className='button-delete-order'
					onClick={() => deleteOrder(order.id).then(() => window.location.reload())}
				>
					Удалить
				</button>
			</div>
		</Modal>
	);
});

export default UpdateOrder;
