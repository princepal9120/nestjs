// Type definitions for the application

export interface Note {
    id: number;
    title: string;
    body: string;
    createdAt?: string;
    updatedAt?: string;
    userId?: number;
}

export interface User {
    id: number;
    email: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    access_token: string;
}

export interface CreateNoteData {
    title: string;
    body: string;
}

export interface UpdateNoteData {
    title?: string;
    body?: string;
}
