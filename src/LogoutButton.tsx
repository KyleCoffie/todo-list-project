import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  if(isAuthenticated) return (<Button className="btn-custom" onClick={handleLogout}>Log Out</Button>)
  return null;
}

export default LogoutButton;
