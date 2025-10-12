
import React, { useState } from 'react';
import { useAuthStore } from '../store/useStore';
import { RegisterCredentials } from '../types';

const RegisterForm: React.FC = () => {
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        email: '',
        password: '',
        name: '',
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    
    const setCurrentView = useAuthStore((state) => state.setCurrentView);

    const register = useAuthStore((state) => state.register);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(credentials);
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Register for Notes App</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={credentials.name}
                            onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                            required
                            placeholder="Enter your name"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                     <p>
                        Already have an account?{' '}
                        <button
                            className="link-button"
                            onClick={() => setCurrentView('login')}
                        >
                            Login here
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;