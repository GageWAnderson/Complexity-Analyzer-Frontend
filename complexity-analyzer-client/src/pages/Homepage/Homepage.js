import React from 'react';
import Editor from '../../components/Editor/Editor';
import ArgumentEntryForm from '../../components/ArgumentEntryForm/ArgumentEntryForm';
import ArgumentList from '../../components/ArgumentList/ArgumentList';
import DescriptionEntryForm from '../../components/DescriptionEntryForm/DescriptionEntryForm';
import { Container } from 'reactstrap';

const Homepage = () => {
    return (
        <Container >
            <h1>Instructions</h1>
            <p>Enter a maximum of 3 arguments, which can be integers, strings, or lists of integers or strings.
                Click 'vary this argument' if you want the complexity analyzer to change that argument to make the
                runtime vs. input size graph (i.e the argument is 'n' in O(n)). Only 1 variable argument is supported.
                The description field is optional. </p>
            <ArgumentEntryForm />
            <ArgumentList />
            <DescriptionEntryForm />
            <Editor />
        </Container>
    );
}

export default Homepage;