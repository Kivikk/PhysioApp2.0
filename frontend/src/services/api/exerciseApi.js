import apiClient from './config';


const EXERCISE_URL = '/api/cards';

export const getAllExercises = async () => {
  try {
    const response = await apiClient.get(EXERCISE_URL);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Fehler beim Laden der Übungen'
    };
  }
};

export const getExerciseById = async (id) => {
  if (!id) {
    console.log('Invalid ID provided to getExerciseById'); // Hier einfügen
    return { success: false, error: 'Invalid ID' };
  }
  try {
    console.log('API call: getExerciseById with ID:', id);
    const response = await apiClient.get(`${EXERCISE_URL}/${id}`);
    console.log('API response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      error
    });
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

// Protected
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

// Protected
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

// Protected
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