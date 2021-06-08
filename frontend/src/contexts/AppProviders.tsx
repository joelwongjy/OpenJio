import React from 'react';

import { AuthProvider } from './AuthContext';
import { ErrorProvider } from './ErrorContext';
import { UserProvider } from './UserContext';

const AppProviders: React.FunctionComponent = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ErrorProvider>{children}</ErrorProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
