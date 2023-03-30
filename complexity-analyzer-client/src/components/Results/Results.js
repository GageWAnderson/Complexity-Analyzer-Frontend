import React from 'react';
import { Container } from 'reactstrap';
import RuntimeGraph from '../RuntimeGraph/RuntimeGraph';

const Results = () => {
    return (
        <Container className="mt-5 text-center">
            <h1>Runtime Graph</h1>
            <RuntimeGraph />
        </Container>
    );
}

export default Results;