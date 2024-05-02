import React, { useState, useEffect } from 'react';
import { fetchOneService } from '../http/serviceAPI';
import { Context } from '../index';

const OrderItem = ({ order }) => {
	const [service, setService] = useState({});

	useEffect(() => {
		fetchOneService(order.serviceId).then(data => setService(data));
	}, []);

	return (
		<tr className='row-orders'>
			<td className='number-order'>{order.id}</td>
			<td className='name-order'>{service ? service.name : 'Первичный звонок'}</td>
			<td className='status-order'>{order.status}</td>
			<td className='comment-order'>
				<div className='comment'>{order.comment}</div>
			</td>
		</tr>
	);
};

export default OrderItem;
