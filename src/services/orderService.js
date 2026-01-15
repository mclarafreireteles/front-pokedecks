import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT = '/orders';

export const createOrder = async (orderData) => {
  return fetchAuthenticated(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
};

export const getMyOrders = async () => {
  return fetchAuthenticated(`${API_ENDPOINT}/my-orders`, {
    method: 'GET',
  });
};

export const getAllOrders = async () => {
  return fetchAuthenticated(API_ENDPOINT, { method: 'GET' });
};

export const getOrderById = async (id) => {
  return fetchAuthenticated(`${API_ENDPOINT}/${id}`, { method: 'GET' });
};

export const deleteOrder = async (id) => {
  return fetchAuthenticated(`${API_ENDPOINT}/${id}`, { method: 'DELETE' });
};
