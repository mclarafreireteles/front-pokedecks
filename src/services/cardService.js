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