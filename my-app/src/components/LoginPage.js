import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase-config';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert('Sign Up failed: ' + error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert('Login failed: ' + error.message);
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../firebase-config'; // Adjust this import path as necessary

// export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       if (user) {
//         navigate('/home');
//       }
//     });
//     return () => unsubscribe();
//   }, [navigate]);

//   const handleLogin = async () => {
//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//       // Redirect is handled by the auth state change listener
//     } catch (error) {
//       console.error(error);
//       alert('Login failed: ' + error.message);
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       await auth.createUserWithEmailAndPassword(email, password);
//       // Redirect is handled by the auth state change listener
//     } catch (error) {
//       console.error(error);
//       alert('Sign Up failed: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleSignUp}>Create Account</button>
//     </div>
//   );
// };



// import { Navigate } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import { auth } from '../firebase-config'; // Ensure this path matches the location of your firebase-config file
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth'; // Import these here if they're used

// const firebaseUIConfig = {
//   signInOptions: [
//     EmailAuthProvider.PROVIDER_ID,
//     GoogleAuthProvider.PROVIDER_ID,
//   ],
//   signInFlow: 'popup',
//   credentialHelper: 'none',
//   callbacks: {
//     signInSuccessWithAuthResult: () => false,
//   }
// };

// export default function Login(props) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if(firebaseUser) {
//         setUser(firebaseUser);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleSignOut = () => {
//     signOut(auth).then(() => {
//       setUser(null);
//     }).catch((error) => {
//       console.error(error);
//     });
//   };

//   if (user) {
//     return <Navigate to="/home" />;
//   }

//   return (
//     <div>
//       <h1>My App</h1>
//       {user ? (
//         <div>
//           <p>Welcome {user.displayName}!</p>
//           <button onClick={handleSignOut}>Sign out</button>
//         </div>
//       ) : (
//         <div>
//           <p>Please sign in:</p>
//           <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
//         </div>
//       )}
//     </div>
//   );
// }


// import { Navigate } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import { getAuth, EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth'
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// const firebaseUIConfig = {
//   signInOptions: [
//     { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
//     GoogleAuthProvider.PROVIDER_ID,
//   ],
//   signInFlow: 'popup',
//   credentialHelper: 'none',
//   callbacks: {
//     signInSuccessWithAuthResult: () => {
//       return false;
//     }
//   }
// }

// export default function SignInPage(props) {
//   const auth = getAuth();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const logout = onAuthStateChanged(auth, (firebaseUser) => {
//       if(firebaseUser){
//         setUser(firebaseUser);
//       }
//       else {
//         setUser(null);
//       }
//     });

//     return () => {
//       logout();
//     };
//   }, [auth]);

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         setUser(null);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   if (user) {
//     return <Navigate to="/home" />;
//   }


//   return (
//     <div>
//       <h1>My App</h1>
//       {user ? (
//         <div>
//           <p>Welcome {user.displayName}!</p>
//           <button onClick={handleSignOut}>Sign out</button>
//         </div>
//       ) : (
//         <div>
//           <p>Please sign in:</p>
//           <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
//         </div>
//       )}
//     </div>
//   );
// }


