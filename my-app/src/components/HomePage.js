import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import NavBar from './NavBar';
import Footer from './Footer';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../index.css'; // Import the CSS styles

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
      <div style={{backgroundColor: 'black', minHeight: '100vh', color: 'white', padding: '20px'}}>
      <NavBar />
      <h1 style={{textAlign: 'center', margin: '20px 0' }}>CARE / DON'T CARE?</h1>
      <div style={{
        border: '2px solid white',
        padding: '0',
        margin: '0 auto',
        maxWidth: '800px',
        borderRadius: '10px',
        height: '580px'
      }}>
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt="Article"
            style={{
              width: '100%', // make image responsive
              height: 'auto',
              display: 'block', // remove bottom margin/spacing
              maxHeight: '300px', // restrict the image height so everything is visible without scrolling
              objectFit: 'cover', // ensure the aspect ratio is maintained
              borderRadius: '10px'
            }}
          />
        )}
        <h2 style={{ fontSize: '1.5rem', textAlign: 'center', margin: '10px 0', padding: '10px' }}>{article.title}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <button
            className="button-care"
            onClick={handleCare}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            <span style={{ marginLeft: '0.5rem' }}>Care</span>
          </button>
          <button
            className="button-dont-care"
            onClick={handleDontCare}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
            <span style={{ marginLeft: '0.5rem' }}>Don't Care</span>
          </button>
        </div>
      </div>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton className="white-close-button">
            <Modal.Title>{article.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            {article.urlToImage && (
              <img src={article.urlToImage} alt="Article" className="img-fluid mb-3"
              style={{
                width: '100%', // make image responsive
                height: 'auto',
                display: 'block', // remove bottom margin/spacing
                maxHeight: '300px', // restrict the image height so everything is visible without scrolling
                objectFit: 'cover', // ensure the aspect ratio is maintained
                borderRadius: '10px'
              }}/>
            )}
            <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
            <p className="break"><strong>Author:</strong> {article.author || 'Unknown'}</p>
            <p className="break"><strong>Description:</strong> {article.description}</p>
            <p className="break"><strong>Content:</strong> {article.content ? article.content : "Full article content not available. Please visit the source."}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read full article</a>
          </Modal.Body>
        </Modal>
        <Footer />
      </div>
    );
  };

export default HomePage;