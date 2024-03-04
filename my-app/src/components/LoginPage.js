import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../firebase-config';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Import the CSS styles


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth(app);
    const db = getDatabase(app);

    // const handleSignUp = async () => {
    //   if (!username.trim()) {
    //       alert('Username is required');
    //       return;
    //   }
    //   try {
    //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //       await set(ref(db, `users/${userCredential.user.uid}`), { username, email });
    //       navigate('/home');
    //   } catch (error) {
    //       console.error(error);
    //       alert('Sign Up failed: ' + error.message);
    //   }
    // };

    const handleSignUp = async () => {
        if (!username.trim()) {
                   alert('Username is required');
                   return;
               }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            await set(ref(db, `users/${userCredential.user.uid}`), { username, email });
            navigate('/home');
            console.log(auth)
        } catch (error) {
            console.error(error);
            alert('Sign Up failed: ' + error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
            console.log(auth)
        } catch (error) {
            console.error(error);
            alert('Login failed: ' + error.message);
        }
    };

    return (
        <div className="container-fluid bg-dark py-5 vh-100">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <h1 className="text-center mb-4 care-dont-care">Care / Don't Care?</h1>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center login-header">{isSignUp ? 'Sign Up' : 'Login'}</h3>
                            <form>
                                {isSignUp && (
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                                </div>
                                <div className="d-grid gap-2 login-div">
                                    {isSignUp ? (
                                        <button onClick={handleSignUp} className="btn-primary login-button login" type="button">Sign Up</button>
                                    ) : (
                                        <button onClick={handleLogin} className="btn-success login-button login" type="button">Login</button>
                                    )}
                                </div>
                                <div className="mt-3 text-center">
                                    <button type="button" className="btn btn-link" onClick={() => setIsSignUp(!isSignUp)}>
                                        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}