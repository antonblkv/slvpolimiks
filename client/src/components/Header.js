import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
import { Context } from '../index';
import { CATALOG_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts';
import '../styles/nav.css';
import NavBar from './NavBar';

const Header = observer(() => {
	const { user } = useContext(Context);
	const history = useNavigate();

	return (
		<header>
			<div className='wrapper-header'>
				<div className='container-header'>
					<div className='logo' onClick={() => history(MAIN_ROUTE)}>
						<img src={logo} alt='СалаватПолимикс' />
						<div className='logo-description'>
							<p className='bold'>Салаватполимикс</p>
							<p>Строительная компания</p>
						</div>
					</div>
					<NavBar></NavBar>
				</div>
			</div>
		</header>
	);
});

export default Header;
