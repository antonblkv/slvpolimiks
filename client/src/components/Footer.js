import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import { Context } from '../index';
import { CATALOG_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts';
import '../styles/footer.css';

const Footer = observer(() => {
	const { user } = useContext(Context);
	const history = useNavigate();

	const logOut = () => {
			localStorage.removeItem('token');
			user.setUser({});
			user.setIsAuth(false);
	};

	return (
		<footer>
			<div className='wrapper'>
				<div className='container-footer'>
					<section className='footer-address'>
						<p className='bold'>Республика Башкортостан</p>
						<p>г. Салават, ул. Южная д. 11</p>
						<p>+7 (991) 876-14-30</p>
						<p>пн-пт с 7:00 до 18:00</p>
					</section>
					<section className='footer-catalog'>
						<p className='bold'>Личный кабинет</p>
						<p>Наши услуги</p>
						<p>Политика обработки персональных данных</p>
					</section>
					<section className='footer-info'>
						<p className='bold'>ООО "Салаватполимикс"</p>
						<p>ОРГН: 1036164030810</p>
						<p>© 2003-2024</p>
						<p>slvpolimiks@mail.ru</p>
					</section>
				</div>
			</div>
		</footer>
	);
});

export default Footer;
