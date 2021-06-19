import React from 'react';

import { useAuth } from 'contexts/AuthContext';
import { useUser } from 'contexts/UserContext';

const Home: React.FC = () => {
  const { user } = useUser();
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user ? user.name : ''}!</h1>
      <button type="button" onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
