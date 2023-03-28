import React, { useState, useEffect } from 'react';
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Editor from '../../components/Editor/Editor';
import Results from '../../components/Results/Results';
import RuntimeGraph from '../../components/RuntimeGraph/RuntimeGraph';
import ArgumentEntryForm from '../../components/ArgumentEntryForm/ArgumentEntryForm';
import ArgumentList from '../../components/ArgumentList/ArgumentList';
import DescriptionEntryForm from '../../components/DescriptionEntryForm/DescriptionEntryForm';
import './Home.css';

function Home() {
  const [footerVisible, setFooterVisible] = useState(false);

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
    <div>
      <Button color="danger">Danger!</Button>
      <Navbar color="dark" dark expand="md" fixed="top">
        <NavbarBrand href="#">My Website</NavbarBrand>
        <Nav className="ml-auto" navbar>
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
        <Button color="primary">Sign In</Button>
      </Navbar>
      <Container className="mt-5 text-center">
        <h1>Python Code Editor</h1>
        <p>Function name def... is assumed, write the function body below in valid Python with no extra indents.</p>
        <ArgumentEntryForm />
        <ArgumentList />
        <DescriptionEntryForm />
        <Editor />
      </Container>
      <Container className="mt-5 text-center">
        <h1>Your Results</h1>
        <Results />
      </Container>
      <Container className="mt-5 text-center">
        <h1>Runtime Graph</h1>
        <RuntimeGraph />
      </Container>
      {footerVisible && (
        <footer className="fixed-bottom bg-light py-2">
          <Container>
            <p>&copy; 2023 My Website. All rights reserved.</p>
          </Container>
        </footer>
      )}
    </div>
  );
}

export default Home;
