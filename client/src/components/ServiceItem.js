import React, { useState, useContext } from 'react';
import ServiceCreateOrder from '../components/modals/ServiceCreateOrder';
import { Context } from '../index';
import { deleteService } from '../http/serviceAPI';
import UpdateService from './modals/UpdateService';

const ServiceItem = ({ service }) => {
	const { user } = useContext(Context);
	const [applicationVisible, setApplicationVisible] = useState(false);
	const [updateVisible, setUpdateVisible] = useState(false);

	const deleteThisService = (id) => {
		deleteService(id);
		window.location.reload();
	}
	
	return (
		<div class='item'>
			<img src={process.env.REACT_APP_API_URL + service.img} alt='' />
			<div class='main-item'>
				<div class='title-item'>{service.name}</div>
				<div class='description-item'>{service.description}</div>
				<div class='footer-item'>
					<div class='price-item'>Цена: от {service.price} руб.</div>
					{user.isAdmin ? (
						<>
							<div className='catalog-admin-buttons'>
								<button className='admin-button-edit' onClick={() => setUpdateVisible(true)}>
									Редактировать
								</button>
								<button className='admin-button-delete' onClick={() => deleteThisService(service.id)}>
									Удалить
								</button>
							</div>
						</>
					) : (
						<button onClick={() => setApplicationVisible(true)}>Отправить заявку</button>
					)}
				</div>
			</div>

			<ServiceCreateOrder
				service={service}
				show={applicationVisible}
				onHide={() => setApplicationVisible(false)}
			></ServiceCreateOrder>
			<UpdateService currentService={service} show={updateVisible} onHide={() => setUpdateVisible(false)}></UpdateService>
		</div>
	);
};

export default ServiceItem;
