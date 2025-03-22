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

const App: React.FC = () => {
    return (
        <Auth0ProviderWithNavigate>
            <TaskProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/callback" element={null} />

                    {/* Private Routes */}
                    <Route path="/" element={<AuthenticationGuard component={TaskDashboard} />} />
                    <Route
                        path="/task/:id"
                        element={<AuthenticationGuard component={TaskDetails} />}
                    />
                    <Route
                        path="/create"
                        element={<AuthenticationGuard component={TaskForm} />}
                    />
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
