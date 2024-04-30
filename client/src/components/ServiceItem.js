import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICE_ROUTE } from '../utils/consts';
import ServiceCreateOrder from '../components/modals/ServiceCreateOrder';

const ServiceItem = ({ service }) => {
	const history = useNavigate();
	const [applicationVisible, setApplicationVisible] = useState(false);
	
	return (
		<div class='item'>
			<img src={process.env.REACT_APP_API_URL + service.img} alt='' />
			<div class='main-item'>
				<div class='title-item'>{service.name}</div>
				<div class='description-item'>{service.description}</div>
				<div class='footer-item'>
					<div class='price-item'>Цена: от {service.price} руб.</div>
					<button onClick={() => setApplicationVisible(true)}>Отправить заявку</button>
				</div>
			</div>

			<ServiceCreateOrder
				service={service}
				show={applicationVisible}
				onHide={() => setApplicationVisible(false)}
			></ServiceCreateOrder>
		</div>
	);
};

export default ServiceItem;
