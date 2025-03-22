import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("isAuthenticated changed:", isAuthenticated);
        if (isAuthenticated) {
            console.log("Navigating to /");
            navigate('/'); // Redirect to the task dashboard after login
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
        return <p>You are already logged in!</p>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Welcome</h1>
                <p>Please log in to access the application.</p>
                <button
                    className="btn-custom"
                    onClick={() => loginWithRedirect()}
                >
                    Log In
                </button>
        </div>
    );
};

export default LoginPage;
