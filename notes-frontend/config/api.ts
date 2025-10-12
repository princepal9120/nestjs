// API Configuration - easily change the base URL here
export const API_BASE_URL = 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/api/login`,
    REGISTER: `${API_BASE_URL}/api/register`,
    NOTES: `${API_BASE_URL}/api/notes`,
    NOTE_BY_ID: (id: number) => `${API_BASE_URL}/api/notes/${id}`,
};
