import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signOut } from 'firebase/auth';

const NavBar = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/login');
        }).catch((error) => {
            console.error('Sign out error', error);
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">
                    CARE DON'T CARE
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                <FontAwesomeIcon icon={faHome} /> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                <FontAwesomeIcon icon={faUser} /> Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={handleSignOut}>Sign Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;