import React from 'react';
import '../styles/portfolio.css';
import portfolio_img from '../images/portfolio.png';

const About = () => {
	return (
		<main className='portfolio-main'>
			<div className='portfolio-wrapper'>
				<div className='portfolio-body'>
					<div className='portfolio-title'>
						<h1 class='title'>Наши работы</h1>
					</div>

					<div className='portfolio-container'>
						<div className='portfolio-item'>
							<img className='portfolio-img' src={portfolio_img} alt='' />
							<div className='portfolio-description'>
								Замена турбокомпрессора М-1 в границах проекта «Реконструкция этиленовой установки ЭП-300» г. Кстово в
								период остановочного ремонта.
							</div>
							<div className='portfolio-name'>ООО «Сибур-Кстово»</div>
						</div>

						<div className='portfolio-item'>
							<img className='portfolio-img' src={portfolio_img} alt='' />
							<div className='portfolio-description'>
								Замена турбокомпрессора М-1 в границах проекта «Реконструкция этиленовой установки ЭП-300» г. Кстово в
								период остановочного ремонта.
							</div>
							<div className='portfolio-name'>ООО «Сибур-Кстово»</div>
						</div>

						<div className='portfolio-item'>
							<img className='portfolio-img' src={portfolio_img} alt='' />
							<div className='portfolio-description'>
								Замена турбокомпрессора М-1 в границах проекта «Реконструкция этиленовой установки ЭП-300» г. Кстово в
								период остановочного ремонта.
							</div>
							<div className='portfolio-name'>ООО «Сибур-Кстово»</div>
						</div>

						<div className='portfolio-item'>
							<img className='portfolio-img' src={portfolio_img} alt='' />
							<div className='portfolio-description'>
								Замена турбокомпрессора М-1 в границах проекта «Реконструкция этиленовой установки ЭП-300» г. Кстово в
								период остановочного ремонта.
							</div>
							<div className='portfolio-name'>ООО «Сибур-Кстово»</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default About;
