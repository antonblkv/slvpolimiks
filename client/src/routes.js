import About from './pages/About';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Catalog from './pages/Catalog';
import Main from './pages/Main';
import PersonalAccount from './pages/PersonalAccount';
import Policy from './pages/Policy';
import Portfolio from './pages/Portfolio';
import {
	ABOUT_ROUTE,
	ADMIN_ROUTE,
	CATALOG_ROUTE,
	LK_ROUTE,
	LOGIN_ROUTE,
	MAIN_ROUTE,
	PORTFOLIO_ROUTE,
	REGISTRATION_ROUTE,
	POLICY_ROUTE,
} from './utils/consts';

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
		path: PORTFOLIO_ROUTE,
		Component: Portfolio,
	},
	{
		path: ABOUT_ROUTE,
		Component: About,
	},
	{
		path: POLICY_ROUTE,
		Component: Policy,
	},
];
