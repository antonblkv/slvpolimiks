import React, { useState, useEffect, useContext } from 'react';
import { fetchOneService } from '../http/serviceAPI';
import { fetchOneUser } from '../http/userAPI';
import { Context } from '../index';

const OrderItem = ({ order }) => {
	const { user } = useContext(Context);


	const [currentUser, setCurrentUser] = useState({});
	const [service, setService] = useState({});

	useEffect(() => {
		fetchOneService(order.serviceId).then(data => setService(data));
	}, []);

	useEffect(() => {
		fetchOneUser(order.userId).then(data => setCurrentUser(data));
	}, []);

	return (
		<tr className='row-orders'>
			<td className='number-order'>{order.id}</td>
			{user.isAdmin ? (
				<>
					<td className='name-user'>{currentUser.name}</td>
					<td className='phone-user'>{currentUser.phone}</td>
				</>
			) : (
				''
			)}
			<td className='name-order'>{service ? service.name : 'Первичный звонок'}</td>
			<td className='status-order'>{order.status}</td>
			<td className='comment-order'>
				<div className='comment'>{order.comment}</div>
			</td>
		</tr>
	);
};

export default OrderItem;
