import React, { useContext } from 'react';
import { Context } from '../index';

const OrderItem = ({ order }) => {
	const { service } = useContext(Context);

	return (
		<tr className='row-orders'>
			<td className='number-order'>{order.id}</td>
			<td className='name-order'></td>
			<td className='status-order'>{order.status}</td>
			<td className='comment-order'>
				<div className='comment'>{order.comment}</div>
			</td>
		</tr>
	);
};

export default OrderItem;
