import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import CreateOrder from '../components/modals/CreateOrder';
import '../styles/main.css';

const Main = observer(() => {
	const [applicationVisible, setApplicationVisible] = useState(false);

	return (
		<main className='home-main'>
			<div className='wrapper'>
				<section className='offer'>
					<h1>Строительные и пусконаладочные работы</h1>
					<p>Комплексный подход к решению задач любого уровня в один клик. Действуй!</p>
					<button onClick={() => setApplicationVisible(true)}>Получить консультацию</button>
				</section>
			</div>

			<CreateOrder show={applicationVisible} onHide={() => setApplicationVisible(false)}></CreateOrder>
		</main>
	);
});

export default Main;
