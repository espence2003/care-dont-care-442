import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import NavBar from './NavBar';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';

const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=1c5ddd160f624d83bb7b1a3ecb08e921');
                // Filter out articles without images or descriptions
                const validArticles = response.data.articles.filter(article => article.urlToImage && article.description);
                setArticles(validArticles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    const handleDontCare = () => {
        const nextIndex = currentIndex + 1 < articles.length ? currentIndex + 1 : 0;
        setCurrentIndex(nextIndex);
    };

    // Inside your HomePage component
    const handleCare = () => {
        const auth = getAuth();
        const db = getDatabase();
        const user = auth.currentUser;

        if (user) {
            const articleToSave = articles[currentIndex];
            const caresRef = ref(db, `users/${user.uid}/cares`);
            push(caresRef, articleToSave).then(() => {
                alert('Article saved!');
            }).catch((error) => {
                console.error('Error saving article:', error);
                alert('Failed to save article.');
            });
        } else {
            alert('You must be logged in to care about articles.');
        }

        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (articles.length === 0) return <div>No articles found.</div>;

    const article = articles[currentIndex];

    return (
        <div>
          <NavBar />
        <div className="container p-5">
            <h2>Articles</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <button className="btn btn-danger me-2" onClick={handleDontCare}>Don't Care</button>
                    <button className="btn btn-success" onClick={handleCare}>Care</button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{article.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {article.urlToImage && (
                        <img src={article.urlToImage} alt="Article" className="img-fluid mb-3" />
                    )}
                    <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
                    <p><strong>Author:</strong> {article.author || 'Unknown'}</p>
                    <p><strong>Description:</strong> {article.description}</p>
                    <p><strong>Content:</strong> {article.content ? article.content : "Full article content not available. Please visit the source."}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read full article</a>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
      </div>
    );
};

export default HomePage;






// import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const HomePage = () => {
//     const [articles, setArticles] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     // const navigate = useNavigate();

//     useEffect(() => {
//         const fetchArticles = async () => {
//             try {
//                 const response = await axios.get('https://newsapi.org/v2/top-headlines', {
//                     params: {
//                         country: 'us', // Customize as needed
//                         apiKey: '1c5ddd160f624d83bb7b1a3ecb08e921' // Replace with your NewsAPI key
//                     }
//                 });
//                 setArticles(response.data.articles);
//             } catch (error) {
//                 console.error('Error fetching articles:', error);
//             }
//         };

//         fetchArticles();
//     }, []);

//     const handleDontCare = () => {
//         const nextIndex = currentIndex + 1 < articles.length ? currentIndex + 1 : 0;
//         setCurrentIndex(nextIndex);
//     };

//     const handleCare = () => {
//         // Implement full article view navigation here
//         // For example: navigate('/article', { state: { article: articles[currentIndex] } });
//         console.log('Navigate to full article view');
//     };

//     if (articles.length === 0) return <div>Loading...</div>;

//     const { title } = articles[currentIndex];

//     return (
//         <div className="container p-5">
//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">{title}</h5>
//                     <button className="btn btn-danger me-2" onClick={handleDontCare}>
//                         <i className="fas fa-times"></i> Don't Care
//                     </button>
//                     <button className="btn btn-success" onClick={handleCare}>
//                         <i className="fas fa-check"></i> Care
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;

