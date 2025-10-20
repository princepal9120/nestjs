// API Configuration - easily change the base URL here
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
console.log("Backend URL:", API_BASE_URL);
// API Endpoints
export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/api/login`,
    REGISTER: `${API_BASE_URL}/api/register`,
    NOTES: `${API_BASE_URL}/api/notes`,
    NOTE_BY_ID: (id: number) => `${API_BASE_URL}/api/notes/${id}`,
};
