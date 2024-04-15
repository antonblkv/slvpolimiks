import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Main from './pages/Main';
import Catalog from './pages/Catalog';
import ServicePage from './pages/ServicePage';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, SERVICE_ROUTE, CATALOG_ROUTE, PORTFOLIO_ROUTE, LK_ROUTE } from './utils/consts';
import Portfolio from './pages/Portfolio';
import PersonalAccount from './pages/PersonalAccount';

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
	{
		path: LK_ROUTE,
		Component: PersonalAccount,
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
];
