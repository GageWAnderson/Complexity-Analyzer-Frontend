import React, { useState } from 'react';
import { Alert, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { updateDescription } from '../../redux/inputArgumentsSlice';

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
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="textarea">Code Description</Label>
                <Input
                    type="description"
                    name="description"
                    id="description"
                    value={textareaValue}
                    onChange={handleTextareaChange}
                    invalid={textareaError}
                />
                <FormFeedback>Please enter a value for the code description.</FormFeedback>
                <FormText>Enter some text to document and describe your code.<br /></FormText>
                <Button size='sm' color="primary" type='submit'>Add Description</Button>
            </FormGroup>
            {formSubmitted && (textareaError ? <Alert color='danger'>There was an error submitting your description, try again.</Alert> :
                <Alert color='success'>Successfully saved code description.</Alert>)}
        </Form>
    );
};

export default DescriptionEntryForm;
