import apiClient from './config';

const EXERCISE_URL = '/api/cards';

export const getAllExercises = async () => {
  try {
    console.log('API URL:', EXERCISE_URL);
    console.log('API Config:', apiClient.defaults.baseURL);
    const response = await apiClient.get(EXERCISE_URL);
    console.log('API Response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Fehler beim Laden der Übungen'
    };
  }
};

export const getExerciseById = async (id) => {
  if (!id) {
    return { success: false, error: 'Invalid ID' };
  }
  try {
    const response = await apiClient.get(`${EXERCISE_URL}/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Übung nicht gefunden'
    };
  }
};

export const getExercisesByCategory = async (category) => {
  try {
    const response = await apiClient.get(`${EXERCISE_URL}/category/${category}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Keine Übungen in dieser Kategorie gefunden'
    };
  }
};

// Protected Routes
export const createExercise = async (exerciseData) => {
  try {
    const response = await apiClient.post(EXERCISE_URL, exerciseData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Fehler beim Erstellen der Übung'
    };
  }
};

export const updateExercise = async (id, exerciseData) => {
  try {
    const response = await apiClient.patch(`${EXERCISE_URL}/${id}`, exerciseData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Fehler beim Aktualisieren der Übung'
    };
  }
};

export const deleteExercise = async (id) => {
  try {
    await apiClient.delete(`${EXERCISE_URL}/${id}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Fehler beim Löschen der Übung'
    };
  }
};