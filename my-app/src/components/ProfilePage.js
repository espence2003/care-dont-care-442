// // src/ProfilePage.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
// import { getDatabase, ref, onValue } from "firebase/database";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ProfilePage = () => {
//     const [userDetails, setUserDetails] = useState(null);
//     const navigate = useNavigate();
//     const auth = getAuth();
//     const db = getDatabase();

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 const userRef = ref(db, 'users/' + user.uid);
//                 onValue(userRef, (snapshot) => {
//                     setUserDetails(snapshot.val());
//                 });
//             } else {
//                 navigate('/login');
//             }
//         });
//     }, [navigate, auth, db]);

//     const handleLogout = () => {
//         signOut(auth).then(() => {
//             navigate('/login');
//         }).catch((error) => {
//             console.error('Logout Error', error);
//         });
//     };

//     return (
//         <div>
//             {userDetails && (
//                 <>
//                     <h1>Profile Page</h1>
//                     <p>Username: {userDetails.username}</p>
//                     <button onClick={handleLogout}>Logout</button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ProfilePage;


import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = ref(db, 'users/' + user.uid);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    setUserDetails(data);
                });
            } else {
                console.log("No user is signed in.");
            }
        });
    }, []);

    return (
        <div className="container mt-5">
            <h2>Profile Page</h2>
            {userDetails && (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Username: {userDetails.username}</h5>
                        <p className="card-text">Cares: {userDetails.cares.join(", ")}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;


