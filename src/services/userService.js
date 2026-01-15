import { fetchAuthenticated } from './apiClient';

const API_ENDPOINT_ME = '/users/me';

const API_ENDPOINT_USERS = '/users';

/**
 * Busca os dados do perfil do usuário logado.
 */
export const getUserProfile = async () => {
  return fetchAuthenticated(API_ENDPOINT_ME, {
    method: 'GET',
  });
};

/**
 * Atualiza os dados do perfil do usuário logado.
 * @param {string} userId - O ID do usuário a ser atualizado
 * @param {object} profileData
 */
export const updateUserProfile = async (userId, profileData) => {
  return fetchAuthenticated(`${API_ENDPOINT_USERS}/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

/**
 * Deleta o perfil do usuário logado.
 * @param {string} userId
 */
export const deleteUserProfile = async (userId) => {
  return fetchAuthenticated(`${API_ENDPOINT_USERS}/${userId}`, {
    method: 'DELETE',
  });
};
