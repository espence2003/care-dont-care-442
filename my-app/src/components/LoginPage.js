import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../firebase-config';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState(''); // State for username
    const navigate = useNavigate();
    const auth = getAuth(app);
    const db = getDatabase(app);

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Save additional user info in the Firebase Realtime Database
            console.log(userCredential);
            console.log(userCredential.user.uid);
            await set(ref(db, `users/${userCredential.user.uid}`), {
                displayName: displayName,
                email: email
            });
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
        <div className="container-fluid bg-light py-5 vh-100">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">
                        <span className="text-success fw-bold">Care </span>
                        <span className="custom-or fw-bold">or</span>
                        <span className="text-danger fw-bold"> Don't Care</span>
                    </h1>
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button onClick={handleLogin} className="btn btn-danger" type="button">Login</button>
                                    <button onClick={handleSignUp} className="btn btn-secondary" type="button">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { app } from '../firebase-config';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const auth = getAuth(app);

// const handleSignUp = async () => {
//     try {
//         await createUserWithEmailAndPassword(auth, email, password);
//         navigate('/home');
//     } catch (error) {
//         console.error(error);
//         alert('Sign Up failed: ' + error.message);
//     }
// };

// const handleLogin = async () => {
//     try {
//         await signInWithEmailAndPassword(auth, email, password);
//         navigate('/home');
//     } catch (error) {
//         console.error(error);
//         alert('Login failed: ' + error.message);
//     }
// };

// return (
//     <div>
//         <div className="container-fluid bg-light py-5 vh-100">
//             <div className="row justify-content-center mt-5">
//                 <div className="col-md-6">
//                     <h1 className="text-center mb-4">
//                         <span className="text-success fw-bold">Care </span>
//                         <span className="custom-or fw-bold">or</span>
//                         <span className="text-danger fw-bold"> Don't Care</span>
//                     </h1>
//                     <div className="card shadow">
//                         <div className="card-body">
//                             <h3 className="card-title text-center mb-4">Login</h3>
//                             <form>
//                                 <div className="mb-3">
//                                     <label htmlFor="email" className="form-label">Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         id="email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         placeholder="Enter your email"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="password" className="form-label">Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         id="password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         placeholder="Enter your password"
//                                     />
//                                 </div>
//                                 <div className="d-grid gap-2">
//                                     <button onClick={handleLogin} className="btn btn-danger" type="button">Login</button>
//                                     <button onClick={handleSignUp} className="btn btn-secondary" type="button">Sign Up</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
// }

