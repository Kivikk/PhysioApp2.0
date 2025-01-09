// routes/publicRoutes.jsx
import Landing from '../pages/Landing';
import FavoritesPage from '../pages/FavoritesPage';
import ExerciseDetail from '../pages/ExerciseDetail';
import WorkoutPlanPage from '../pages/WorkoutPlanPage';
import WorkoutPlanDetails from '../pages/WorkoutPlanDetails';
// import LoginPage from '../pages/LoginPage';

export const publicRoutes = [
  { path: "/", element: <Landing /> },
  { path: "favorites", element: <FavoritesPage /> },
  { path: "exercise/:id", element: <ExerciseDetail /> },
  { path: "workout-plan/:planId", element: <WorkoutPlanPage /> },
  { path: "workout-plan/:planId/exercise/:exerciseId", element: <WorkoutPlanDetails /> },
  // { path: "login", element: <LoginPage /> }
];

export default publicRoutes;