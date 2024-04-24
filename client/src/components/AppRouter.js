import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '../index.js';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { MAIN_ROUTE } from '../utils/consts';

const AppRouter = observer(() => {
	const { user } = useContext(Context);

	return (
		<Routes>
			{user.isAuth &&
				authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />)}
			{user.isAdmin &&
				adminRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />)}
			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} exact />
			))}
			<Route path='*' element={<Navigate to={MAIN_ROUTE} />} />
		</Routes>
	);
});

export default AppRouter;
