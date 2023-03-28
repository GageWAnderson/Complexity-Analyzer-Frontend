import React from 'react';
import Editor from '../../components/Editor/Editor';
import Results from '../../components/Results/Results';
import RuntimeGraph from '../../components/RuntimeGraph/RuntimeGraph';
import ArgumentEntryForm from '../../components/ArgumentEntryForm/ArgumentEntryForm';
import ArgumentList from '../../components/ArgumentList/ArgumentList';
import DescriptionEntryForm from '../../components/DescriptionEntryForm/DescriptionEntryForm';
import { Container } from 'reactstrap';

const Homepage = () => {
    <>
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
    </>
}

export default Homepage;