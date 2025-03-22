import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const User = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && user && (
        <div>
          <h3>{user.name}</h3>
          {user.email && (
            <h4>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </h4>
          )}
          {user.picture && <img src={user.picture} alt="User profile" />}
        </div>
      )}
    </div>
  );
};

export default User;
