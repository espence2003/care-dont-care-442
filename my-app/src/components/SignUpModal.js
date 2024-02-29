// src/SignUpModal.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SignUpModal = ({ show, onHide }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const auth = getAuth();
    const db = getDatabase();

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await set(ref(db, `users/${userCredential.user.uid}`), {
                username,
                email
            });
            onHide(); // Close the modal
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSignUp}>Sign Up</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SignUpModal;


// import React, { useState } from 'react';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { getDatabase, ref, set } from 'firebase/database';
// import { useNavigate } from 'react-router-dom';

// const SignUpModal = ({ show, onHide }) => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const auth = getAuth();

//     const handleSignUp = async () => {
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const db = getDatabase();
//             set(ref(db, 'users/' + userCredential.user.uid), {
//                 username: username,
//                 email: email,
//                 cares: []
//             });
//             navigate('/profile');
//             onHide(); // Close modal
//         } catch (error) {
//             console.error(error);
//             alert('Sign Up failed: ' + error.message);
//         }
//     };

//     if (!show) {
//         return null;
//     }

//     return (
//         <div>
//             {/* Modal or form content for sign up */}
//             {/* Include fields for username, email, password and a submit button calling handleSignUp */}
//         </div>
//     );
// };

// export default SignUpModal;
