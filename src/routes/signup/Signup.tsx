import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import StepsBar from 'components/stepsBar/StepsBar';
import { useAuth } from 'contexts/AuthContext';

const Signup: React.FC = () => {
  const { signup, update } = useAuth();
  const history = useHistory();

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [paylah, setPaylah] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [step, setStep] = useState<number>(1);

  const clearError = () => {
    setIsError(false);
    setErrorMessage('');
  };

  const handleNextStep = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    try {
      await update({ paylah });
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
      return;
    }
    setStep(3);
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    try {
      await signup({
        name,
        username,
        email,
        password,
        confirmPassword,
      });
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
      return;
    }
    setStep(2);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      clearError();
                      setName(e.target.value!);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      clearError();
                      setUsername(e.target.value!);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    E-mail Address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="text"
                    autoComplete="email-address"
                    required
                    className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="E-mail address"
                    value={email}
                    onChange={(e) => {
                      clearError();
                      setEmail(e.target.value!);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      clearError();
                      setPassword(e.target.value!);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      clearError();
                      setConfirmPassword(e.target.value!);
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        );
      case 2:
        return (
          <form className="mt-8 space-y-6" onSubmit={handleNextStep}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    value={paylah}
                    onChange={(e) => {
                      clearError();
                      setPaylah(e.target.value!);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-b-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        );
      case 3:
        return (
          <button
            type="submit"
            className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            onClick={() => history.push('/')}
          >
            Done
          </button>
        );
      default:
        return <></>;
    }
  };

  const renderHeader = () => {
    switch (step) {
      case 1:
        return 'Create Your Account';
      case 2:
        return 'Enter PayLah Link';
      case 3:
        return 'Start Using OpenJio!';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-food-background bg-gray-50 bg-cover py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 sm:p-10 p-2 bg-gray-50 rounded-xl lg:shadow-lg z-10">
        <div className="max-w-sm w-full space-y-8">
          <StepsBar step={step} />
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/images/hamburger.svg"
              alt="OpenJio"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {renderHeader()}
            </h2>
            <p className="mt-8">
              {step === 2 &&
                'Go to your PayLah app and tap on My QR. Enter the digits after "transRef="'}
            </p>
          </div>

          {renderForm()}

          {step === 1 && (
            <div className="flex items-center">
              <p className="mr-1 text-sm text-gray-900">
                Already have an account?
              </p>
              <div className="text-sm">
                <a
                  href="/login"
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  Sign in
                </a>
              </div>
            </div>
          )}

          {isError ? (
            <div
              className="text-sm font-medium text-red-500"
              style={{
                marginTop: '0.5rem',
                visibility: isError ? 'visible' : 'hidden',
              }}
            >
              {errorMessage}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
