import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import OrderItem from './OrderItem';

const TableOrders = observer(() => {
	const { order } = useContext(Context);
	
	return (
		<table className='table-orders'>
							<thead className='head-orders'>
								<tr className='row-orders'>
									<th className='th-number'>№</th>
									<th className='th-name'>Услуга</th>
									<th className='th-status'>Статус</th>
									<th className='th-comment'>Комментарий</th>
								</tr>
							</thead>
							
							{order.orders.map(order => (
				<OrderItem key={order.id} order={order} />
			))}
							</table>
	
	);
});

export default TableOrders;
