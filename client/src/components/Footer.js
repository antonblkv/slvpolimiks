import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { ABOUT_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE, LK_ROUTE, POLICY_ROUTE, ADMIN_ROUTE } from '../utils/consts';
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
						<a className='bold' onClick={() => history(ABOUT_ROUTE)}>
							Республика Башкортостан
						</a>
						<a onClick={() => history(ABOUT_ROUTE)}>г. Салават, ул. Южная д. 11</a>
						<a onClick={() => history(ABOUT_ROUTE)}>+7 (991) 876-14-30</a>
						<a onClick={() => history(ABOUT_ROUTE)}>пн-пт с 9:00 до 18:00</a>
					</section>
					<section className='footer-catalog'>
						<p className='bold'>
							{user.isAuth ? (
								user.isAdmin ? (
									<a onClick={() => history(ADMIN_ROUTE)}>
										Админ-панель
									</a>
								) : (
									<a onClick={() => history(LK_ROUTE)}>
										Личный кабинет
									</a>
								)
							) : (
								<a onClick={() => history(LOGIN_ROUTE)}>
									Авторизация
								</a>
							)}
						</p>
						<a onClick={() => history(CATALOG_ROUTE)}>Наши услуги</a>
						<a onClick={() => history(POLICY_ROUTE)}>Политика обработки персональных данных</a>
					</section>
					<section className='footer-info'>
						<a className='bold' onClick={() => history(ABOUT_ROUTE)}>
							ООО "Салаватполимикс"
						</a>
						<a onClick={() => history(ABOUT_ROUTE)}>ОРГН: 1036164030810</a>
						<a onClick={() => history(ABOUT_ROUTE)}>© 2003-2024</a>
						<a onClick={() => history(ABOUT_ROUTE)}>slvpolimiks@mail.ru</a>
					</section>
				</div>
			</div>
		</footer>
	);
});

export default Footer;
