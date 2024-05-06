import { $authHost, $host } from './index';

export const createType = async type => {
	const { data } = await $authHost.post('api/type', type);
	return data;
};

export const fetchTypes = async () => {
	const { data } = await $host.get('api/type');
	return data;
};

export const createService = async service => {
	const { data } = await $authHost.post('api/service', service);
	return data;
};

export const updateService = async service => {
	const { data } = await $authHost.put('api/service', service);
	return data;
};

export const fetchServices = async typeId => {
	const { data } = await $host.get('api/service', {
		params: {
			typeId,
		},
	});
	return data;
};

export const fetchOneService = async id => {
	if (id) {
		const { data } = await $host.get('api/service/' + id);
		return data;
	}
};

export const deleteService = async id => {
	if (id) {
		const { data } = await $authHost.delete('api/service/' + id);
		return data;
	}
};

export const deleteType = async id => {
	if (id) {
		const { data } = await $authHost.delete('api/type/' + id);
		return data;
	}
};