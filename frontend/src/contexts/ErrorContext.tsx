import React, { useState } from 'react';

import ErrorContextInterface from 'interfaces/contexts/errorContext';

const ErrorContext =
  React.createContext<ErrorContextInterface | undefined>(undefined);

// Allows user data to be accessible from everywhere
const ErrorProvider: React.FunctionComponent = (props) => {
  const [hasError, setHasError] = useState<boolean>(false);
  return (
    <ErrorContext.Provider
      value={{
        hasError,
        setHasError: (newState: boolean) => setHasError(newState),
      }}
      {...props}
    />
  );
};

const useError = (): ErrorContextInterface => {
  const context = React.useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within a ErrorProvider');
  }
  return context;
};

export { ErrorProvider, useError };
