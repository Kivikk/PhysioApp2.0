import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Landing from '../pages/Landing';
import ErrorPage from '../pages/ErrorPage';
import { publicRoutes } from './publicRoutes';
import { protectedRoutes } from './protectedRoutes';

const AppRoutes = () => {
  console.log('AppRoutes rendering');  // Debug log
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        {publicRoutes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {protectedRoutes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;