import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import NavBar from './NavBar';
import Footer from './Footer';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue } from 'firebase/database';

const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=1c5ddd160f624d83bb7b1a3ecb08e921');
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

    const handleCare = () => {
      const auth = getAuth();
      const db = getDatabase();
      const user = auth.currentUser;

      if (user) {
          const articleToSave = articles[currentIndex];
          const caresRef = ref(db, `users/${user.uid}/cares`);

          onValue(caresRef, (snapshot) => {
              const caresData = snapshot.val();
              let alreadyCared = false;

              for (let key in caresData) {
                  if (caresData[key].url === articleToSave.url) {
                      alreadyCared = true;
                      break;
                  }
              }

              if (!alreadyCared) {
                  push(caresRef, articleToSave).then(() => {
                      alert('Article saved!');
                  }).catch((error) => {
                      console.error('Error saving article:', error);
                      alert('Failed to save article.');
                  });
              } else {
                  alert('You have already cared about this article.');
              }
          }, {
              onlyOnce: true
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
        <Footer />
      </div>
    );
};

export default HomePage;