import React, { useState } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonRow,
  IonText,
} from '@ionic/react';
import { fastFood } from 'ionicons/icons';

import { useAuth } from 'contexts/AuthContext';

import './Signup.css';

const Signup: React.FC = () => {
  const { signup } = useAuth();

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showLoading, setShowLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const clearError = () => {
    setIsError(false);
    setErrorMessage('');
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
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid className="form ion-padding-horizontal">
          <IonLoading
            isOpen={showLoading}
            message="Logging in"
            onDidDismiss={() => setShowLoading(false)}
          />
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-sm w-full space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="/images/hamburger.svg"
                  alt="OpenJio"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-black-900">
                  Create Your Account
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
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
                        className="h-12 appearance-none leading-8 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                        className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                        className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                        className="h-12 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                      className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
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
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>

              <div className="flex items-center">
                <p className="mr-1 text-sm text-gray-900">
                  Already have an account?
                </p>
                <div className="text-sm">
                  <a
                    href="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;