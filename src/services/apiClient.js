const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiErrorMessages = {
  400: 'Your request was invalid. Please check the data.',
  401: 'Authentication failed. Please log in again.',
  403: 'You do not have permission to do this.',
  404: 'The resource you requested was not found.',
  500: 'An internal server error occurred. Please try again later.'
};

const fallbackErrorMessages = {
  NETWORK: 'Could not connect to the server. Please check your connection.',
  UNKNOWN: 'An unexpected error occurred. Please try again later.'
};

const handleApiResponse = async (response) => {
  if (!response.ok) {
    const status = response.status;

    if (status === 401) {
      localStorage.removeItem('pokedecks_token');
      // Força o re-login
      window.location.href = '/'; 
    }

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

export const fetchAuthenticated = async (endpoint, options = {}) => {
  const token = localStorage.getItem('pokedecks_token');

  if (!token) {
    window.location.href = '/';
    throw new Error('User not authenticated. Redirecting to login.');
  }

  const headers = {
    'Content-Type': 'application/json',
    'accept': '*/*',
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: headers
    });
    return await handleApiResponse(response);
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error(fallbackErrorMessages.NETWORK);
    }
    throw error;
  }
};