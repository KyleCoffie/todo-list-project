import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Custom hook to handle Auth0 or any authentication logic

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { register } = useAuth(); // `register` function handles user registration

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await register(email); // Call registration logic
            alert('Registration successful!');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn-custom" type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
