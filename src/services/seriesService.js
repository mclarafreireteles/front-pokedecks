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


export const getSeriesById = async (id) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, { method: 'GET' });
};


export const updateSeries = async (id, data) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
};

export const createSeries = async (data) => {
    return fetchAuthenticated(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
};