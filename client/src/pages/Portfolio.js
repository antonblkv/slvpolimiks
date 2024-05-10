import React from 'react';
import '../styles/portfolio.css';
import portfolio1 from '../images/portfolio1.jpg'
import portfolio2 from '../images/portfolio2.jpg';
import portfolio3 from '../images/portfolio3.jpg';
import portfolio4 from '../images/portfolio4.jpg';

const Portfolio = () => {
	return (
		<main className='portfolio-main'>
			<div className='portfolio-wrapper'>
				<div className='portfolio-body'>
					<div className='portfolio-title'>
						<h1 class='title'>Наши работы</h1>
					</div>

					<div className='portfolio-container'>
						<div className='portfolio-item'>
							<img className='portfolio-img' src={portfolio1} alt='' />
							<div className='portfolio-description'>
								Замена турбокомпрессора М-1 в границах проекта «Реконструкция этиленовой установки ЭП-300» г. Кстово в
								период остановочного ремонта.
							</div>
							<div className='portfolio-name'>ООО «Сибур-Кстово»</div>
						</div>

						<div className='portfolio-item'>
							<img className='portfolio-img' src={portfolio2} alt='' />
							<div className='portfolio-description'>Замена физического оборудования на объектах АО «СНПЗ».</div>
							<div className='portfolio-name'>АО «Сызранский НПЗ»</div>
						</div>

						<div className='portfolio-item'>
							<img className='portfolio-img' src={portfolio3} alt='' />
							<div className='portfolio-description'>
								Установка дожимной компрессорной станции для подключения к ГТС ОАО «Газпром» в два этапа.
							</div>
							<div className='portfolio-name'>ООО «ЛУКОЙЛ-Пермнефтегазпереработка»</div>
						</div>

						<div className='portfolio-item'>
							<img className='portfolio-img' src={portfolio4} alt='' />
							<div className='portfolio-description'>
								Установка производства силикагеля. Реконструкция здания об.612 под производство катализатора
								порошкового.
							</div>
							<div className='portfolio-name'>ООО «Салаватский катализаторный завод»</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Portfolio;
