import React, { useState, useEffect, useContext } from 'react';
import { fetchOneService } from '../http/serviceAPI';
import { fetchUser } from '../http/userAPI';
import { Context } from '../index';
import UpdateOrder from './modals/UpdateOrder';

const OrderItem = ({ order }) => {
	const { user } = useContext(Context);
	const [userOrder, setUser] = useState({});
	const [service, setService] = useState({});
	const [updateVisible, setUpdateVisible] = useState(false);

	useEffect(() => {
		fetchOneService(order.serviceId).then(data => setService(data));
	}, []);

	useEffect(() => {
		fetchUser(order.userId).then(data => setUser(data));
	}, []);
	
	return (
		<>
			<tr className='row-orders' onClick={() => setUpdateVisible(true)}>
				<td className='number-order'>{order.id}</td>
				{user.isAdmin ? (
					<>
						<td className='name-user'>{userOrder.name}</td>
						<td className='phone-user'>{userOrder.phone}</td>
						<td className='email-user'>{userOrder.email ? userOrder.email : '-'}</td>
					</>
				) : (
					''
				)}
				<td className='name-order'>{service ? service.name : 'Первичный звонок'}</td>
				<td className='status-order'>{order.status}</td>
				<td className='comment-order'>{order.comment ? order.comment : '-'}</td>
			</tr>

			<UpdateOrder order={order} show={updateVisible} onHide={() => setUpdateVisible(false)}></UpdateOrder>
		</>
	);
};

export default OrderItem;
