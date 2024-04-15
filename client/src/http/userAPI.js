import { $authHost, $host } from './index';
import { jwtDecode } from 'jwt-decode';

export const registration = async (phone, password) => {
	const { data } = await $host.post('api/user/registration', { phone, password, role: 'ADMIN' });
	localStorage.setItem('token', data.token);
	return jwtDecode(data.token);
};

export const login = async (phone, password) => {
	const { data } = await $host.post('api/user/login', { phone, password });
	localStorage.setItem('token', data.token);
	return jwtDecode(data.token);
};

export const fetchOneUser = async () => {
	const { data } = await $authHost.get('api/user/lk');
	return data;
};

export const updateUser = async user => {
	const { data } = await $authHost.put('api/user/lk', user);
	return data;
};

export const check = async () => {
	const { data } = await $authHost.get('api/user/auth');
	localStorage.setItem('token', data.token);
	return jwtDecode(data.token);
};
