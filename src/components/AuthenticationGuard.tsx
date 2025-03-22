import React, { useEffect } from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { Component } from "react";
import { useNavigate } from 'react-router-dom';

type AuthenticationGuardProps = {
    component: React.ReactNode | any;
}

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ component }) => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => {
            console.log("Redirecting to login page...");
            console.log("User is not authenticated, redirecting to login page");
            return <div>Redirecting you to the login page...</div>
        },
    });

    console.log("AuthenticationGuard rendering");
    return (
        <Component />
    );
}

export default AuthenticationGuard;
