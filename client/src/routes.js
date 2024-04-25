import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Main from './pages/Main';
import Catalog from './pages/Catalog';
import ServicePage from './pages/ServicePage';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, SERVICE_ROUTE, CATALOG_ROUTE, PORTFOLIO_ROUTE, LK_ROUTE, ABOUT_ROUTE } from './utils/consts';
import Portfolio from './pages/Portfolio';
import PersonalAccount from './pages/PersonalAccount';
import About from './pages/About';

export const authRoutes = [
	{
		path: LK_ROUTE,
		Component: PersonalAccount,
	},
];

export const adminRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
];

export const publicRoutes = [
	{
		path: MAIN_ROUTE,
		Component: Main,
	},
	{
		path: CATALOG_ROUTE,
		Component: Catalog,
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
	{
		path: SERVICE_ROUTE + '/:id',
		Component: ServicePage,
	},
	{
		path: PORTFOLIO_ROUTE,
		Component: Portfolio,
	},
	{
		path: ABOUT_ROUTE,
		Component: About,
	},
];
