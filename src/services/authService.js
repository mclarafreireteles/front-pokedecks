const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_API_URL = `${API_BASE_URL}/auth`;

const apiErrorMessages = {
  400: 'The data sent is invalid. Please check all fields.',
  401: 'Invalid username or password.',
  404: 'The requested resource was not found.',
  409: 'This email or username is already registered. Please log in instead.',
  500: 'An internal server error occurred. Please try again later.'
};

const fallbackErrorMessages = {
  NETWORK: 'Could not connect to the server. Please check your connection.',
  UNKNOWN: 'An unexpected error occurred. Please try again later.'
};

const isKnownErrorMessage = (message) => {
  return Object.values(apiErrorMessages).includes(message) ||
         Object.values(fallbackErrorMessages).includes(message);
};

const handleApiResponse = async (response) => {
  if (!response.ok) {
    const status = response.status;
    const message = apiErrorMessages[status] || fallbackErrorMessages.UNKNOWN;
    throw new Error(message);
  }

  try {
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(fallbackErrorMessages.UNKNOWN);
  }
};


export const register = async (userData) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      },
      body: JSON.stringify(userData)
    });
    return await handleApiResponse(response);
  } catch (error) {
    if (isKnownErrorMessage(error.message)) {
      throw error;
    }

    throw new Error(fallbackErrorMessages.NETWORK);
  }
};

export const login = async (username, password) => {
  try {
    const encodedCredentials = btoa(`${username}:${password}`);
    const response = await fetch(`${AUTH_API_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'accept': '*/*'
      }
    });
    return await handleApiResponse(response);
  } catch (error) {
    if (isKnownErrorMessage(error.message)) {
      throw error;
    }
    throw new Error(fallbackErrorMessages.NETWORK);
  }
};