import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT = '/api/users/me';

/**
 * Busca os dados do perfil do usuário logado.
 */
export const getUserProfile = async () => {
  return fetchAuthenticated(API_ENDPOINT, {
    method: 'GET'
  });
};

/**
 * Atualiza os dados do perfil do usuário logado.
 * @param {object} profileData
 */
export const updateUserProfile = async (profileData) => {
  return fetchAuthenticated(API_ENDPOINT, {
    method: 'PUT', // ou 'PATCH'
    body: JSON.stringify(profileData)
  });
};

/**
 * Deleta o perfil do usuário logado.
 */
export const deleteUserProfile = async () => {
  return fetchAuthenticated(API_ENDPOINT, {
    method: 'DELETE'
  });
};