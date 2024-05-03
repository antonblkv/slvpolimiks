import { jwtDecode } from 'jwt-decode';
import { $authHost, $host } from './index';

export const registration = async (phone, password) => {
	const { data } = await $host.post('api/user/registration', { phone, password, role: 'USER' });
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

export const fetchUser = async id => {
	if (id) {
		const { data } = await $authHost.get('api/user/' + id);
		return data;
	}
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
