import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import SubmitApplication from '../components/modals/SubmitApplication';
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

			<SubmitApplication show={applicationVisible} onHide={() => setApplicationVisible(false)}></SubmitApplication>
		</main>
	);
});

export default Main;
