import { Navigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";

/**
 * @param props.user: user object in the realtime database
 */
export default function LoginPage(props) {
  if (props.user) {
    return <Navigate to="/personal" />;
  }

  const FIREBASEUI_CONFIG = {
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
    signInFlow: "popup",
    credentialHelper: "none",
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <StyledFirebaseAuth
      className="loginPage"
      uiConfig={FIREBASEUI_CONFIG}
      firebaseAuth={getAuth()}
    />
  );
}
