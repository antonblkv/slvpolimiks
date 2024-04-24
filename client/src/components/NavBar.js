import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../index';
import '../styles/nav.css';
import { ADMIN_ROUTE, CATALOG_ROUTE, LK_ROUTE, LOGIN_ROUTE, PORTFOLIO_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
	const { user } = useContext(Context);
	const history = useNavigate();
	const location = useLocation();

	const link_catalog =
		location.pathname === CATALOG_ROUTE
			? {
					fontWeight: 600,
					borderBottom: '2px solid grey',
			  }
			: {
					fontWeight: 400,
			  };

	const link_login =
		location.pathname === LOGIN_ROUTE
			? {
					fontWeight: 600,
					borderBottom: '2px solid grey',
			  }
			: {
					fontWeight: 400,
			  };

	const link_portfolio =
		location.pathname === PORTFOLIO_ROUTE
			? {
					fontWeight: 600,
					borderBottom: '2px solid grey',
			  }
			: {
					fontWeight: 400,
			  };

	const link_lk =
		location.pathname === LK_ROUTE
			? {
					fontWeight: 600,
					borderBottom: '2px solid grey',
			  }
			: {
					fontWeight: 400,
			  };

	return (
		<nav>
			<ul className='nav'>
				<li>
					<a style={link_catalog} onClick={() => history(CATALOG_ROUTE)}>
						Услуги
					</a>
				</li>
				<li>
					<a style={link_portfolio} onClick={() => history(PORTFOLIO_ROUTE)}>
						Портфолио
					</a>
				</li>

				<li>
					<a href=''>О нас</a>
				</li>
				<li>
					{user.isAuth ? (
						user.isAdmin ? (<a style={link_lk} href='' onClick={() => history(ADMIN_ROUTE)}>
							Админ-панель
						</a>) : (<a style={link_lk} href='' onClick={() => history(LK_ROUTE)}>
							Личный кабинет
						</a>)
					) : (
						<a style={link_login} href='' onClick={() => history(LOGIN_ROUTE)}>
							Войти
						</a>
					)}
				</li>
			</ul>
		</nav>
	);
});

export default NavBar;
