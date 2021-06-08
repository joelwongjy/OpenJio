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
        name, username, email, password, confirmPassword,
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
          <IonRow>
            <IonIcon icon={fastFood} className="icon" />
          </IonRow>
          <IonText className="text">Create your account</IonText>
          {isError ? (
            <div
              style={{
                color: 'red',
                marginTop: '0.5rem',
                height: '1rem',
              }}
            >
              {errorMessage}
            </div>
          ) : (
            <div />
          )}
          <form onSubmit={handleSignup}>
            <IonCol className="ion-padding-bottom">
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  value={name}
                  onIonChange={(e) => {
                    clearError();
                    setName(e.detail.value!);
                  }}
                />
              </IonItem>
            </IonCol>
            <IonCol className="ion-padding-bottom">
              <IonItem>
                <IonLabel position="floating">Username</IonLabel>
                <IonInput
                  type="text"
                  value={username}
                  onIonChange={(e) => {
                    clearError();
                    setUsername(e.detail.value!);
                  }}
                />
              </IonItem>
            </IonCol>
            <IonCol className="ion-padding-bottom">
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => {
                    clearError();
                    setEmail(e.detail.value!);
                  }}
                />
              </IonItem>
            </IonCol>
            <IonCol className="ion-padding-bottom">
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => {
                    clearError();
                    setPassword(e.detail.value!);
                  }}
                />
              </IonItem>
            </IonCol>
            <IonCol className="ion-padding-bottom">
              <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                  type="password"
                  value={confirmPassword}
                  onIonChange={(e) => {
                    clearError();
                    setConfirmPassword(e.detail.value!);
                  }}
                />
              </IonItem>
            </IonCol>

            <IonButton class="button" expand="block" type="submit">
              Sign up
            </IonButton>
          </form>
          <IonRow class="ion-padding-vertical">
            <IonText>Already have an account?</IonText>
            <IonRouterLink href="/login">Log in</IonRouterLink>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
