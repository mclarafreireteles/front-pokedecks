const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AUTH_API_URL = `${API_BASE_URL}/auth`;

export const register = async (userData) => {
    const response = await fetch(`${AUTH_API_URL}/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Falha ao registrar. Status: ' + response.status);
    } 

    return data;
}

export const login = async (username, password) => {
    const encodedCredentials = btoa(`${username}:${password}`);

    const response = await fetch(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            
            'accept': '*/*'
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Falha no login. Status: ' + response.status);
    }
    
    return data;
}