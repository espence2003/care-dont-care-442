import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import NavBar from './NavBar';
import '../index.css';
import Footer from './Footer';

const ProfilePage = () => {
    // const [username, setUsername] = useState('');
    const [cares, setCares] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();
    const db = getDatabase();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = ref(db, `users/${user.uid}`);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        // setUsername(data.username || 'No username');
                        const caredArticles = data.cares ? Object.values(data.cares) : [];
                        setCares(caredArticles);
                    } else {
                        console.log('No user data available');
                    }
                    setIsLoading(false);
                }, (error) => {
                    console.error('Failed to fetch user data:', error);
                    setIsLoading(false);
                });
            } else {
                console.log('No user signed in');
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [auth, db]);

    const handleShowModal = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
        console.log(auth)
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="container mt-5 container-height">
                <h1 className="mb-4">{auth.currentUser.displayName}'s Profile</h1>
                <div className="row">
                    {cares.map((article, index) => (
                        <div key={index} className="col-md-4 mb-4" onClick={() => handleShowModal(article)}>
                        <div className="card card-hover">
                          <img src={article.urlToImage} className="card-img-top" alt="Article" />
                          <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
            {selectedArticle && (
                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedArticle.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={selectedArticle.urlToImage} alt="Article" className="img-fluid mb-3" />
                        <p><strong>Published At:</strong> {new Date(selectedArticle.publishedAt).toLocaleString()}</p>
                        <p><strong>Author:</strong> {selectedArticle.author || 'Unknown'}</p>
                        <p><strong>Description:</strong> {selectedArticle.description}</p>
                        <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read full article</a>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
          <Footer />
        </div>
    );
};

export default ProfilePage;