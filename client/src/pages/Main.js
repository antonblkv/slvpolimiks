import { observer } from 'mobx-react-lite';
import React from 'react';
import '../styles/main.css';


const Main = observer(() => {
	return (
			<main className='home-main'>
				<div className='wrapper'>
					<section className='offer'>
						<h1>Строительные и пусконаладочные работы</h1>
						<p>Комплексный подход к решению задач любого уровня в один клик. Действуй!</p>
						<button>Получить консультацию</button>
					</section>
				</div>
			</main>
	);
});

export default Main;
