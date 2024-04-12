import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneService } from '../http/serviceAPI';
import '../styles/servicePage.css';

const ServicePage = () => {
	const [service, setService] = useState('');
	const { id } = useParams();
	useEffect(() => {
		fetchOneService(id).then(data => setService(data));
	}, []);

	return (
		<main className='service-main'>
			<div className='service-wrapper'>
				<h1 className='title'>{service.name}</h1>
				<div className='service-container'>
					<div className='first-half'>
						<img className='service-img' src={process.env.REACT_APP_API_URL + service.img} alt='' />
						<div className='service-subtitle'>
							{service.subtitle}
						</div>
					</div>
					<div className='second-half'>
						<div className='service-description'>
							{service.description}
						</div>
						<div className='service-footer'>
							<div className='service-price'>
								<div className='cost'>Стоимость:</div>
								<div className='price'>от {service.price} руб.</div>
							</div>
							<button className='service-button'>Отправить заявку</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ServicePage;
