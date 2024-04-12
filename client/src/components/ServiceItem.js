import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICE_ROUTE } from '../utils/consts';



const ServiceItem = ({ service }) => {
	const history = useNavigate();

	return (
		<div class='item' onClick={() => history(SERVICE_ROUTE + '/' + service.id)}>
			<img src={process.env.REACT_APP_API_URL + service.img} alt='' />
			<div class='main-item'>
				<div class='title-item'>{service.name}</div>
				<div class='description-item'>{service.description}</div>
				<div class='footer-item'>
					<div class='price-item'>Цена: от {service.price} руб.</div>
					<button>Подробнее</button>
				</div>
			</div>
		</div>
	);
};

export default ServiceItem;
