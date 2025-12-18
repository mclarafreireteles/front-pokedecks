import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT = '/sets';

export const getAllSets = async () => {
    return fetchAuthenticated(API_ENDPOINT, {
        method: 'GET'
    });
};

/**
 * Deleta um único set pelo ID.
 * DELETE /api/cards/{id}
 */
export const deleteSet= async (id) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, {
        method: 'DELETE'
    });
};