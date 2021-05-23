import { fastFood } from "ionicons/icons";
import React, { useState } from "react";
import {
  IonContent,
  IonInput,
  IonItem,
  IonCol,
  IonPage,
  IonText,
  IonButton,
  IonLabel,
  IonLoading,
  IonIcon,
} from "@ionic/react";
import "./Login.css";
import { useAuth } from "contexts/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const clearError = () => {
    setIsError(false);
    setErrorMessage("");
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
    <IonPage>
      <IonContent fullscreen>
        <div className="form">
          <IonLoading
            isOpen={showLoading}
            message="Logging in"
            onDidDismiss={() => setShowLoading(false)}
          />
          <div className="ion-padding-horizontal">
            <IonIcon icon={fastFood} className="icon"></IonIcon>
          </div>
          <IonText className="text ion-padding-horizontal">
            Log In to Open Jio
          </IonText>
          <form className="ion-padding-horizontal" onSubmit={handleLogin}>
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
                ></IonInput>
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
                ></IonInput>
              </IonItem>
            </IonCol>

            <IonButton class="button" expand="block" type="submit">
              Log in
            </IonButton>
            <div
              style={{
                color: "red",
                marginTop: "0.5rem",
                visibility: isError ? "visible" : "hidden",
                height: "2rem",
              }}
            >
              {errorMessage}
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
