import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT = '/series';

export const getAllSeries= async () => {
    return fetchAuthenticated(API_ENDPOINT, {
        method: 'GET'
    });
};

/**
 * Deleta um único set pelo ID.
 * DELETE /api/series/{id}
 */
export const deleteSerie = async (id) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, {
        method: 'DELETE'
    }); 
};