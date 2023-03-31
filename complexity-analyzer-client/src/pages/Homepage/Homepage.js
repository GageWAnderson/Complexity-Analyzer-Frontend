import React from 'react';
import Editor from '../../components/Editor/Editor';
import ArgumentEntryForm from '../../components/ArgumentEntryForm/ArgumentEntryForm';
import ArgumentList from '../../components/ArgumentList/ArgumentList';
import DescriptionEntryForm from '../../components/DescriptionEntryForm/DescriptionEntryForm';
import CodeDescrpition from '../../components/CodeDescrpition/CodeDescrpition';
import { Container } from 'reactstrap';

const Homepage = () => {
    return (
        <>
            <br />
            <Container className="mt-5 text-center">
                <h1>Python Code Editor</h1>
                <p>Function name def... is assumed, write the function body below in valid Python with no extra indents.</p>
                <ArgumentEntryForm />
                <ArgumentList />
                <DescriptionEntryForm />
                <CodeDescrpition />
                <Editor />
            </Container>
        </>
    );
}

export default Homepage;