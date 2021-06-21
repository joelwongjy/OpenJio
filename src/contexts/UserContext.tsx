import React from 'react';

import UserContextInterface from 'interfaces/contexts/userContext';

import { useAuth } from './AuthContext';

const UserContext = React.createContext<UserContextInterface | undefined>(undefined);

// Allows user data to be accessible from everywhere
const UserProvider: React.FunctionComponent = (props) => {
  const { data } = useAuth();

  return <UserContext.Provider value={{ user: data }} {...props} />;
};

const useUser = (): UserContextInterface => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
