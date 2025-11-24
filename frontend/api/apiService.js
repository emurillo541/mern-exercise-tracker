import { useAuth0 } from '@auth0/auth0-react';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_PATH = `${API_BASE_URL}/exercises`;

export const useExercisesApi = () => {
    const { getAccessTokenSilently } = useAuth0();

    const secureFetch = async (url, options = {}) => {
        const token = await getAccessTokenSilently();

        const defaultHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        });

        if (response.status === 204) {
            return null; 
        }

        if (!response.ok) {
            let errorMessage = 'Request failed.';
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.Error || errorBody.message || errorMessage;
            } catch (e) {
                errorMessage = response.statusText || errorMessage;
            }
            throw new Error(`API Error ${response.status}: ${errorMessage}`);
        }

        return response.json();
    };

    const getAllExercises = () => secureFetch(API_BASE_PATH);

    const createExercise = (data) => secureFetch(API_BASE_PATH, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    const updateExercise = (id, data) => secureFetch(`${API_BASE_PATH}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

    const deleteExercise = (id) => secureFetch(`${API_BASE_PATH}/${id}`, {
        method: 'DELETE',
    });

    return {
        getAllExercises,
        createExercise,
        updateExercise,
        deleteExercise,
        secureFetch
    };
};
