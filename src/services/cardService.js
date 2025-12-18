import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT = '/cards';

export const getAllCards = async () => {
  return fetchAuthenticated(API_ENDPOINT, {
    method: 'GET'
  });
};

export const getCardById = async (id) => {
  return fetchAuthenticated(`/cards/${id}`, {
    method: 'GET'
  });
};

export const deleteCard = async (id) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, {
        method: 'DELETE'
    });
};

export const updateCard = async (id, cardData) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(cardData)
    });
};

export const createCard = async (cardData) => {
    return fetchAuthenticated(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    });
};