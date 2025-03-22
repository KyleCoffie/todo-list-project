import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

// Define a context for authentication
interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: () => void;
    logout: () => void;
    register: (email: string) => Promise<void>;
}

// Create a default AuthContext
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
    register: async (email: string) => {
        console.warn("register function not implemented");
    },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
    const navigate = useNavigate();

    const login = () => loginWithRedirect();
    const logoutWithRedirect = () => {
        logout();
        navigate('/login'); // Redirect to the login page after logout
    };

    const register = async (email: string) => {
        // Implement Auth0 passwordless flow here
        console.log("registering user with email", email);
        const domain = "dev-2psy3rgmsg2mpa0v.us.auth0.com";
        const clientId = "SZNS8fk76SijVwE4wfftq6fHaNjfKQly";
        try {
            const response = await fetch(`https://${domain}/passwordless/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id: clientId,
                    connection: 'email',
                    email: email,
                    send: 'code'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Passwordless flow initiated successfully');
            alert('A verification code has been sent to your email address.');

        } catch (error) {
            console.error('Error initiating passwordless flow:', error);
            alert('Failed to initiate passwordless flow. Please try again.');
        }
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, logout: logoutWithRedirect, register }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
