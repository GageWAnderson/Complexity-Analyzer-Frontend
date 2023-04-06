import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import ComplexityAnalyzerNavbar from '../../components/ComplexityAnalyzerNavbar/ComplexityAnalyzerNavbar';
import PageRoutes from '../../components/PageRoutes/PageRoutes';
import { updateUser } from '../../redux/profileSlice';
import Footer from '../../components/Footer/Footer';

function Home({ user, signOut }) {
  const [footerVisible, setFooterVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUser({ username: user.username, email: user.attributes.email, uuid: user.attributes.sub }));
  }, [user, dispatch]);

  useEffect(() => {
    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      if (scrollable <= (scrolled + 100)) {
        // The user has scrolled to the bottom of the page
        setFooterVisible(true);
      } else if (scrollable === 0 && scrolled === 0) {
        // Scrolling is impossible and the user can see the whole page
        setFooterVisible(true);
      } else {
        // Neither condition is met
        setFooterVisible(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      <ComplexityAnalyzerNavbar signOut={signOut} />
      <PageRoutes />
      {footerVisible && <Footer />}
    </Container>
  );
}

export default Home;
