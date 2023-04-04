import React, { useState } from 'react';
import { Alert, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateDescription } from '../../redux/inputArgumentsSlice';
import ContainerCard from '../ContainerCard/ContainerCard';

const DescriptionEntryForm = () => {
    const [textareaValue, setTextareaValue] = useState('');
    const [textareaError, setTextareaError] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
        if (textareaError) {
            setTextareaError(false);
        }
        if (formSubmitted) {
            setFormSubmitted(false);
        }
    };

    const codeDescription = useSelector(state => state.inputArguments.description);

    const handleSubmit = (event) => {
        event.preventDefault();

        setFormSubmitted(true);

        if (!textareaValue) {
            setTextareaError(true);
            return;
        }

        dispatch(updateDescription(textareaValue));
        setTextareaError(false);
    };

    return (
        <ContainerCard>
            <h2>Code Description</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        type="description"
                        name="description"
                        id="description"
                        value={textareaValue}
                        onChange={handleTextareaChange}
                        invalid={textareaError}
                    />
                    <FormFeedback>Please enter a value for the code description.</FormFeedback>
                    <FormText>(Optional) Enter some text to document and describe your code.<br /></FormText>
                    <Button size='sm' color="primary" type='submit'>Add Description</Button>
                </FormGroup>
                {formSubmitted && (textareaError ? <Alert color='danger'>There was an error submitting your description, try again.</Alert> :
                    <Alert color='success'>Successfully saved code description.</Alert>)}
            </Form>
            <Alert color='primary'><b>Description: </b>{codeDescription && <p>{codeDescription}</p>}</Alert>
        </ContainerCard>
    );
};

export default DescriptionEntryForm;
