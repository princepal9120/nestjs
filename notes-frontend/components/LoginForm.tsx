import React, { useState } from 'react';
import { useAuthStore } from '../store/useStore';
import { LoginCredentials } from '../types';

const LoginForm: React.FC = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(credentials);
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login to Notes App</h2>
                <form onSubmit={handleSubmit} className="login-form">
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
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
