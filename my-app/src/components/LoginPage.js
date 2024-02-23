import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getAuth, EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseUIConfig = {
  signInOptions: [
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
    GoogleAuthProvider.PROVIDER_ID,
  ],
  signInFlow: 'popup',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () => {
      return false;
    }
  }
}

export default function SignInPage(props) {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const logout = onAuthStateChanged(auth, (firebaseUser) => {
      if(firebaseUser){
        setUser(firebaseUser);
        //<Navigate to="/Quiz" />;
      }
      else {
        setUser(null);
      }
    });

    return () => {
      logout();
    };
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (user) {
    return <Navigate to="/Home" />;
  }


  return (
    <div>
      <h1>My App</h1>
      {user ? (
        <div>
          <p>Welcome {user.displayName}!</p>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div>
          <p className="sign-in">Please sign in:</p>
          <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
        </div>
      )}
    </div>
  );
}


