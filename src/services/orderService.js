import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT = '/orders';

export const createOrder = async (orderData) => {
    return fetchAuthenticated(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
};

export const getMyOrders = async () => {
    return fetchAuthenticated(`${API_ENDPOINT}/my-orders`, {
        method: 'GET'
    });
};