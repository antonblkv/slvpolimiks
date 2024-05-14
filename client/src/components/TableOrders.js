import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import OrderItem from './OrderItem';

const TableOrders = observer(() => {
	const { order } = useContext(Context);
	const { user } = useContext(Context);

	return (
		<table className='table-orders'>
			<thead className='head-orders'>
				<tr className='row-orders'>
					<th className='th-number'>№</th>
					{user.isAdmin ? (
						<>
							<th className='th-status'>Имя</th>
							<th className='th-status'>Телефон</th>
							<th className='th-status'>Email</th>
						</>
					) : (
						''
					)}
					<th className='th-name'>Услуга</th>
					<th className='th-status'>Статус</th>

					<th className='th-comment'>Комментарий</th>
				</tr>
			</thead>
			{order.orders.slice().sort((order1, order2) => order1.id - order2.id).map(order => (
					<OrderItem key={order.id} order={order} />
				))}
		</table>
	);
});

export default TableOrders;
