'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useStore';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import NotesList from '../components/NotesList';

export default function Home() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const currentView = useAuthStore((state) => state.currentView);
    const setCurrentView = useAuthStore((state) => state.setCurrentView);

    if (isAuthenticated) {
        return (
            <main className="app">
                <NotesList />
            </main>
        );
    }

    return (
        <main className="app">
            {currentView === 'login' ? <LoginForm /> : <RegisterForm />}

        </main>
    );
}
