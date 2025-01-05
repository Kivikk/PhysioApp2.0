import Landing from '../pages/Landing';
import FavoritesPage from '../pages/FavoritesPage';
import ExerciseDetail from '../pages/ExerciseDetail';
// import LoginPage from '../pages/LoginPage';

export const publicRoutes = [
  { path: "/", element: <Landing /> },
  { path: "favorites", element: <FavoritesPage /> },
  { path: "exercise/:id", element: <ExerciseDetail /> },
  // { path: "login", element: <LoginPage /> }
];
export default publicRoutes;