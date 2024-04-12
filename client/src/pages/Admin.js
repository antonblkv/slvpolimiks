import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateService from '../components/modals/CreateService';


const Admin = () => {
	const [typeVisible, setTypeVisible] = useState(false);
	const [serviceVisible, setServiceVisible] = useState(false);

	return (
		<Container className='d-flex flex-column'>
			<Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setTypeVisible(true)}>
				Добавить категорию
			</Button>
			<Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setServiceVisible(true)}>
				Добавить услугу
			</Button>
			<CreateService show={serviceVisible} onHide={() => setServiceVisible(false)} />
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
		</Container>
	);
};

export default Admin;
