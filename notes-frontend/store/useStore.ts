import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { Note, LoginCredentials, CreateNoteData, UpdateNoteData } from '../types';

// Define the auth store state and actions
interface AuthState {
  isAuthenticated: boolean;
  user: any;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  currentView: 'login' | 'register';
  setCurrentView: (view: 'login' | 'register') => void;
}

// Define the notes store state and actions
interface NotesState {
    notes: Note[];
    loading: boolean;
    error: string | null;
    fetchNotes: (token: string) => Promise<void>;
    createNote: (token: string, data: CreateNoteData) => Promise<void>;
    updateNote: (token: string, id: number, data: UpdateNoteData) => Promise<void>;
    deleteNote: (token: string, id: number) => Promise<void>;
    clearError: () => void;
}

// Auth Store - Handles authentication state
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  currentView: 'login',
  setCurrentView: (view) => set({ currentView: view }),
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      set({ isAuthenticated: true, user: data.user });
    } catch (error) {
      throw error;
    }
  },
  register: async (credentials: RegisterCredentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      set({ isAuthenticated: true, user: data.user });
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null });
  },
}));

// Notes Store - Handles notes state and operations
export const useNotesStore = create<NotesState>((set, get) => ({
    notes: [],
    loading: false,
    error: null,

    fetchNotes: async (token: string) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(API_ENDPOINTS.NOTES, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ notes: response.data, loading: false });
        } catch (error: any) {
            console.error('Fetch notes error:', error);
            set({
                error: error.response?.data?.message || 'Failed to fetch notes',
                loading: false
            });
        }
    },

    createNote: async (token: string, data: CreateNoteData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(API_ENDPOINTS.NOTES, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Add the new note to the list
            set((state) => ({
                notes: [...state.notes, response.data],
                loading: false
            }));
        } catch (error: any) {
            console.error('Create note error:', error);
            set({
                error: error.response?.data?.message || 'Failed to create note',
                loading: false
            });
            throw error;
        }
    },

    updateNote: async (token: string, id: number, data: UpdateNoteData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(API_ENDPOINTS.NOTE_BY_ID(id), data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the note in the list
            set((state) => ({
                notes: state.notes.map((note) =>
                    note.id === id ? response.data : note
                ),
                loading: false,
            }));
        } catch (error: any) {
            console.error('Update note error:', error);
            set({
                error: error.response?.data?.message || 'Failed to update note',
                loading: false
            });
            throw error;
        }
    },

    deleteNote: async (token: string, id: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(API_ENDPOINTS.NOTE_BY_ID(id), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove the note from the list
            set((state) => ({
                notes: state.notes.filter((note) => note.id !== id),
                loading: false,
            }));
        } catch (error: any) {
            console.error('Delete note error:', error);
            set({
                error: error.response?.data?.message || 'Failed to delete note',
                loading: false
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
