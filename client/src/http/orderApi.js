import { $authHost, $host } from './index';

export const createOrder = async order => {
	const { data } = await $host.post('api/order', order);
	return data;
};
