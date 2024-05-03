import { observer } from 'mobx-react-lite';
import React from 'react';
import ServiceList from '../components/ServiceList';
import SelectType from '../components/SelectType';
import '../styles/service.css';

const Catalog = observer(() => {

	return (
		<main className='catalog-main'>
			<div className='wrapper-service'>
				<div class='catalog'>
					<div className='catalog-title'>
						<h1 class='title'>Каталог</h1>
						<SelectType></SelectType>
					</div>
					<ServiceList></ServiceList>
				</div>
			</div>
		</main>
	);
});

export default Catalog;
