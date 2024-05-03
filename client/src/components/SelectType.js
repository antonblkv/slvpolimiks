import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { fetchServices, fetchTypes } from '../http/serviceAPI';
import { Context } from '../index';
import '../styles/selectType.css';

const SelectType = observer(() => {
	const { service } = useContext(Context);
	const [valueType, setType] = useState();

	useEffect(() => {
		fetchTypes().then(data => service.setTypes(data));
		fetchServices(valueType).then(data => {
			service.setServices(data);
		});
	}, [valueType]);

	return (
		<div className='select'>
			<div className='select-wrapper'>
				<select
					name='select-types'
					className='select-types'
					value={valueType}
					onChange={event => setType(event.target.value)}
				>
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
