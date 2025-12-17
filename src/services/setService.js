import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT = '/sets';

export const getAllSets = async () => {
    return fetchAuthenticated(API_ENDPOINT, {
        method: 'GET'
    });
};