import React, { useState } from 'react';

import Google from 'components/google';
import { useAuth } from 'contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const clearError = () => {
    setIsError(false);
    setErrorMessage('');
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    try {
      await login({ username, password });
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-food-background bg-gray-50 bg-cover py-12 sm:px-6 lg:px-8">
      <div className="absolute bg-black opacity-0 lg:opacity-30 inset-0 z-0" />
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-50 rounded-xl lg:shadow-lg z-10">
        <div className="max-w-sm w-full  space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/images/hamburger.svg"
              alt="OpenJio"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to <span className="text-orange-600">Open</span>Jio
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="username"
                  required
                  className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    clearError();
                    setUsername(e.target.value!);
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
                  className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    clearError();
                    setPassword(e.target.value!);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/login"
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-orange-600 group-hover:text-orange-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>

          <div className="flex items-center">
            <Google />
          </div>

          <div className="flex items-center">
            <p className="mr-1 text-sm text-gray-900">
              Don&apos;t have an account?
            </p>
            <div className="text-sm">
              <a
                href="/signup"
                className="font-medium text-orange-600 hover:text-orange-500 mr-5"
              >
                Sign up
              </a>
            </div>
          </div>

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

export default Login;
