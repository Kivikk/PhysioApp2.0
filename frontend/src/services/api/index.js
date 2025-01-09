export { default as apiClient, updateAuthHeader, getBaseUrl } from './config';

export {
  getAllExercises,
  getExerciseById,
  getExercisesByCategory,
  createExercise,
  updateExercise,
  deleteExercise
} from './exerciseApi';

export {
  login,
  logout,
  verifyToken,
  refreshToken
} from './authApi';

import './interceptors';