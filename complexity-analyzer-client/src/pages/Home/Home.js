import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Homepage from '../Homepage/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from '../SignIn/SignIn';
import './Home.css';

function Home() {
  const [footerVisible, setFooterVisible] = useState(false);

  const signedIn = useSelector((state) => state.profile.signedIn);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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
      <br />
      <Navbar color="dark" dark expand="md" fixed="top">
        <NavbarBrand href="#">Code Complexity Analyzer</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink href="#">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Contact</NavLink>
          </NavItem>
        </Nav>
        {signedIn ? <Button className='ml-auto' color="danger">Sign Out</Button> :
          <Button className='ml-auto' color="primary">Sign In</Button>}
        {!signedIn && <Button className='ml-auto' color="danger">Sign Up</Button>}
      </Navbar>
      {signedIn ? <Homepage /> : <SignIn />}
      {footerVisible && (
        <footer className="fixed-bottom bg-light py-2">
          <Container>
            <p>&copy; 2023 My Website. All rights reserved.</p>
          </Container>
        </footer>
      )}
    </Container>
  );
}

export default Home;
