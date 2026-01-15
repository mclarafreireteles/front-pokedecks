import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT = '/sets';

export const getAllSets = async () => {
    return fetchAuthenticated(API_ENDPOINT, {
        method: 'GET'
    });
};

export const deleteSet= async (id) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, {
        method: 'DELETE'
    });
};

export const getSetById = async (id) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, {
        method: 'GET'
    });
};  

export const createSet = async (setData) => {
    return fetchAuthenticated(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(setData)
    });
};

export const updateSet = async (id, setData) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(setData)
    });
};

export const getSetDetails = async (setId) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${setId}/cards`, {
        method: 'GET'
    })
}
