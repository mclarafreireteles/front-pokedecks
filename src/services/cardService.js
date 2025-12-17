import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT = '/cards';

/**
 * Busca todas as cartas disponíveis no sistema.
 * GET /api/cards
 */
export const getAllCards = async () => {
  return fetchAuthenticated(API_ENDPOINT, {
    method: 'GET'
  });
};

/**
 * Busca os detalhes de uma única carta pelo ID.
 * GET /api/cards/{id}
 */
export const getCardById = async (id) => {
  return fetchAuthenticated(`/cards/${id}`, {
    method: 'GET'
  });
};

/**
 * Deleta uma única carta pelo ID.
 * DELETE /api/cards/{id}
 */
export const deleteCard = async (id) => {
    return fetchAuthenticated(`${API_ENDPOINT}/${id}`, {
        method: 'DELETE'
    });
};