import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TaskDashboard from './components/TaskDashboard';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import RegisterPage from './components/RegisterPage';
import AuthenticationGuard from './components/AuthenticationGuard';
import { TaskProvider } from './context/TaskContext';
import Auth0ProviderWithNavigate from './Auth0Provider';

// Main App component that defines the application's routing
const App: React.FC = () => {
    return (
        // Wrap the entire application with Auth0ProviderWithNavigate for authentication
        <Auth0ProviderWithNavigate>
            {/* Wrap the application with TaskProvider to manage tasks */}
            <TaskProvider>
                {/* Define the application routes */}
                <Routes>
                    {/* Public Routes - accessible without authentication */}
                    {/* Route for the login page */}
                    <Route path="/login" element={<Login />} />
                    {/* Route for the registration page */}
                    <Route path="/register" element={<RegisterPage />} />
                    {/* Route for the callback page (Auth0) */}
                    <Route path="/callback" element={null} />

                    {/* Private Routes - accessible only after authentication */}
                    {/* Route for the task dashboard, protected by AuthenticationGuard */}
                    <Route path="/" element={<AuthenticationGuard component={TaskDashboard} />} />
                    {/* Route for task details, protected by AuthenticationGuard */}
                    <Route
                        path="/task/:id"
                        element={<AuthenticationGuard component={TaskDetails} />}
                    />
                    {/* Route for creating a new task, protected by AuthenticationGuard */}
                    <Route
                        path="/create"
                        element={<AuthenticationGuard component={TaskForm} />}
                    />
                    {/* Route for editing an existing task, protected by AuthenticationGuard */}
                    <Route
                        path="/edit/:id"
                        element={<AuthenticationGuard component={TaskForm} />}
                    />
                </Routes>
            </TaskProvider>
        </Auth0ProviderWithNavigate>
    );
};

export default App;
