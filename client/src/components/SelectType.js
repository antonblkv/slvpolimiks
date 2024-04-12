import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { fetchServices, fetchTypes } from '../http/serviceAPI';
import { Context } from '../index';
import '../styles/selectType.css';

const SelectType = observer(() => {
	const { service } = useContext(Context);
	const [valueType, setType] = useState('');

	useEffect(() => {
		fetchTypes().then(data => service.setTypes(data));
		fetchServices(null).then(data => service.setServices(data));
	}, []);

	useEffect(() => {
		fetchServices(service.selectedType.id).then(data => {
			service.setServices(data);
		});
	}, [service.selectedType.id]);

	const handleChange = event => {
		setType(event.target.value);
		if (event.target.value - 1 < 0) service.setSelectedType(service.types);
		if (event.target.value - 1 >= 0) service.setSelectedType(service.types[event.target.value - 1]);
	};

	return (
		<div className='select'>
			<div className='select-wrapper'>
				<select name='select-types' className='select-types' value={valueType} onChange={handleChange}>
					<option className='option-type' value={0}>
						Все категории
					</option>
					{service.types.map(type => (
						<option className='option-type' key={type.id} value={type.id}>
							{type.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
});

export default SelectType;
