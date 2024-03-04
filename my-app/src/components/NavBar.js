import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { getAuth, signOut } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import '../index.css'; // Import the CSS styles

const NavBar = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const auth = getAuth(); // Initialize Firebase Auth

  // Handle sign out functionality
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful. Redirect user to sign-in page
      navigate('/login');
    }).catch((error) => {
      // An error happened during sign out
      console.error('Sign out error', error);
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
          C/DC
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;




// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
// import { getAuth, signOut } from 'firebase/auth';

// const NavBar = () => {
//     const navigate = useNavigate();
//     const auth = getAuth();

//     const handleSignOut = () => {
//         signOut(auth).then(() => {
//             navigate('/login');
//         }).catch((error) => {
//             console.error('Sign out error', error);
//         });
//     };

//     return (
//         <nav className="navbar navbar-expand-lg nav-styling">
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="/home">
//                     CARE DON'T CARE
//                 </Link>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav ms-auto">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/home">
//                                 <FontAwesomeIcon icon={faHome} /> Home
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/profile">
//                                 <FontAwesomeIcon icon={faUser} /> Profile
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <button className="nav-link btn btn-link" onClick={handleSignOut}>Sign Out</button>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default NavBar;