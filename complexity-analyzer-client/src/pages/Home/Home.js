import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import ComplexityAnalyzerNavbar from '../../components/ComplexityAnalyzerNavbar/ComplexityAnalyzerNavbar';
import PageRoutes from '../../components/PageRoutes/PageRoutes';

function Home() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight + 100) {
        setFooterVisible(true);
      } else {
        setFooterVisible(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      <ComplexityAnalyzerNavbar />
      <PageRoutes />
      {footerVisible && (
        <footer className="fixed-bottom bg-dark py-2">
          <Container>
            <p>&copy; 2023 My Website. All rights reserved.</p>
          </Container>
        </footer>
      )}
    </Container>
  );
}

export default Home;
