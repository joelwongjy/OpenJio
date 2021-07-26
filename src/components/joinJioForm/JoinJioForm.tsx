import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { JIO, JIOS } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import ApiService from 'services/apiService';

interface JoinJioFormProps {
  cancelCallback: () => void;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

const JoinJioForm: React.FC<JoinJioFormProps> = ({
  alertCallback,
  cancelCallback,
}) => {
  const history = useHistory();
  const [jioId, setJioId] = useState('');
  const { hasError, setHasError } = useError();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleJoin = async (jioId: string) => {
    setHasError(false);

    try {
      const response = await ApiService.get(`${JIOS}/${jioId}`);
      if (response.status === 200) {
        history.push(`${JIOS}${JIO}/${jioId}`);
      }
    } catch (error) {
      alertCallback(
        true,
        false,
        'No OpenJio found',
        'Please check the Jio Code and try again.',
        cancelCallback,
        undefined
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 bg-cover py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            <span>Join </span>
            <span className="text-orange-600">Open</span>
            Jio
          </h2>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div>
            <label
              className="text-gray-700 dark:text-gray-200 font-semibold"
              htmlFor="orderName"
            >
              Enter Jio Code:
            </label>
            <input
              id="jioId"
              type="text"
              required
              className="block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              onChange={(e) => setJioId(e!.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={() => handleJoin(jioId)}
            className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Join
          </button>
        </form>
        {hasError ? (
          <div
            className="text-sm font-medium text-red-500"
            style={{
              marginTop: '0.5rem',
              visibility: hasError ? 'visible' : 'hidden',
            }}
          >
            An error occured. Please try again.
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default JoinJioForm;
