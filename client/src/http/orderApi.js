import { $authHost, $host } from './index';

export const createOrder = async order => {
	const { data } = await $host.post('api/order', order);
	return data;
};

export const fetchOrders = async userId => {
	const { data } = await $authHost.get('api/order', {
		params: {
			userId,
		}
	});

	return data;
};

export const updateOrder = async order => {
	const { data } = await $authHost.put('api/order', order);
	return data;
};

export const deleteOrder = async id => {
	if (id) {
		const { data } = await $authHost.delete('api/order/' + id);
		return data;
	}
};