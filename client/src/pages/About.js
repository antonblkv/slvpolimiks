import { observer } from 'mobx-react-lite';
import React from 'react';
import '../styles/about.css';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { createOrder } from '../http/orderApi';

const About = observer(() => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const onSubmit = data => {
		createOrder(data).then();
		reset();
	};

	return (
		<main className='about-main'>
			<div className='about-wrapper'>
				<div className='about-body'>
					<div className='about-title'>
						<h1 class='title'>О компании</h1>
						<h2 className='subtitle'>Группа Аквилон 20 лет на рынке недвижимости</h2>
					</div>

					<div className='about-container'>
						<div className='about-description'>
							Группа Аквилон - одна из ведущих девелоперских компаний, более 20 лет предоставляющая полный спектр услуг
							на рынке недвижимости в Санкт-Петербурге, Ленинградской области, Москве, Архангельске, Северодвинске.
							Группа Аквилон признана системообразующим предприятием России. Группа Аквилон - одна из ведущих
							девелоперских компаний, более 20 лет предоставляющая полный 
						</div>
						<div className='about-columns'>
							<div className='about-info'>
								<h2 className='subtitle-info'>Свяжитесь с нами</h2>
								<div className='info-row'>
									<p className='text'>
										<b className='sb'>Телефон: </b>
										+7 (991) 876-14-30
									</p>
								</div>

								<div className='info-row'>
									<p className='text'>
										<b className='sb'>Отдел продаж: </b>
										г. Салават, ул. Южная д. 11
									</p>
								</div>

								<div className='info-row'>
									<p className='text'>
										<b className='sb'>Email: </b>
										slvpolimiks@mail.ru
									</p>
								</div>

								<div className='info-row'>
									<p className='text'>
										<b className='sb'>Режим работы отдела продаж: </b>
										пн-пт с 7:00 до 18:00
									</p>
								</div>

								<div className='info-row'>
									<p className='text'>
										<b className='sb'>Услуги: </b>
										инженерно-коммуникационные работы, ландшафтные работы, обустройство фундамента, работа с металлом и др.
									</p>
								</div>
							</div>

							<div className='about-form'>
								<Form onSubmit={handleSubmit(onSubmit)}>
									<Form.Control
										{...register('name', {
											required: 'Поле обязательно к заполнению',
											maxLength: { value: 20, message: 'Максимум 20 символов' },
											pattern: { value: /^[а-яА-Я]*$/, message: 'Только русские буквы' },
										})}
										className='form form-name'
										placeholder='Имя'
									/>
									<div className='form-error'>{errors?.name && <p>{errors?.name?.message}</p>}</div>

									<Form.Control
										as={InputMask}
										mask='+7 (***) ***-**-**'
										{...register('phone', {
											required: 'Поле обязательно к заполнению',
											pattern: {
												value: /^\+\d{1,3}\s*\(\d{1,3}\)\s*\d{3}-\d{2}-\d{2}$/,
												message: 'Необходимо ввести номер полностью',
											},
										})}
										className='form form-name'
										placeholder='Номер телефона'
									/>
									<div className='form-error'>{errors?.phone && <p>{errors?.phone?.message}</p>}</div>

									<Form.Control
										as='textarea'
										{...register('comment', {
											maxLength: { value: 255, message: 'Максимум 255 символов' },
										})}
										className='form form-description'
										placeholder='Комментарий'
									/>
									<div className='form-error'>{errors?.comment && <p>{errors?.comment?.message}</p>}</div>

									<div class='checkbox'>
										<input
											{...register('check', { required: 'Необходимо Ваше согласие' })}
											type='checkbox'
											id='checkbox'
											className='modal-checkbox'
										/>
										<label className='modal-checkbox-label'>Даю согласие на обработку персональных данных</label>
									</div>
									<div className='form-error'>{errors?.check && <p>{errors?.check?.message}</p>}</div>

									<Form.Control className='modal-button-about' type='submit' value={'Отправить заявку'} />
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
});

export default About;
