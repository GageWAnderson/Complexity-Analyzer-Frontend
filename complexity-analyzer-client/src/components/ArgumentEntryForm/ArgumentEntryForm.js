import React, { useState } from 'react';
import { Alert, Form, FormGroup, Label, Input, Col, Button, FormFeedback } from 'reactstrap';
import { addInputArgument } from '../../redux/inputArgumentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ContainerCard from '../ContainerCard/ContainerCard';

const ArgumentEntryForm = () => {
    const DEFAULT_MAX_INPUT_SIZE = 100;
    const LIMIT_MAX_INPUT_SIZE = 100000;
    const MAX_ARGUMENT_NUMBER = 3;
    const DEFAULT_TYPE = 'int';

    const [name, setName] = useState('');
    const [type, setType] = useState(DEFAULT_TYPE);
    const [isVariable, setIsVariable] = useState(false);
    const [hasSubmissionError, setHasSubmissionError] = useState(false);
    const [submissionErrorText, setSubmissionErrorText] = useState('');
    const [maxInputSize, setMaxInputSize] = useState(DEFAULT_MAX_INPUT_SIZE);
    const [isNameValid, setIsNameValid] = useState(false);
    const [isMaxInputSizeValid, setIsMaxInputSizeValid] = useState(true);

    const dispatch = useDispatch();
    const currentInputArguments = useSelector((state) => state.inputArguments.inputArguments);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isNameValid) {
            setHasSubmissionError(true);
            setSubmissionErrorText('Invalid input name');
            return;
        } else if (!isMaxInputSizeValid) {
            setHasSubmissionError(true);
            setSubmissionErrorText('Invalid max input size');
            return;
        } else if (currentInputArguments.find((inputArgument) => inputArgument.name === name)) {
            setHasSubmissionError(true);
            setSubmissionErrorText('Input name already exists');
            return;
        } else if (currentInputArguments.length >= MAX_ARGUMENT_NUMBER) {
            setHasSubmissionError(true);
            setSubmissionErrorText('Maximum number of input arguments reached');
            return;
        }

        try {
            dispatch(addInputArgument({ name, type, isVariable, maxInputSize }));
            setHasSubmissionError(false);
            setSubmissionErrorText('');
        } catch (error) {
            setHasSubmissionError(true);
            setSubmissionErrorText(error.message);
        }

    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setIsNameValid(e.target.value.trim() !== '');
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setIsVariable(e.target.checked);
    };

    const handleMaxInputSizeChange = (e) => {
        setMaxInputSize(e.target.value);
        setIsMaxInputSizeValid(e.target.value > 0 && e.target.value <= LIMIT_MAX_INPUT_SIZE);
    };

    return (
        <ContainerCard>
            <h3>Input Argument</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="name" sm={2}>
                        Argument Name
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleNameChange}
                            invalid={!isNameValid}
                        />
                        <FormFeedback>Please enter a name</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="value" sm={2}>
                        Argument Value
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="select"
                            name="type"
                            id="type"
                            value={type}
                            onChange={handleTypeChange}
                        >
                            <option value="int">{"int"}</option>
                            <option value="string">{"string"}</option>
                            <option value="list<int>">{"list<int>"}</option>
                            <option value="list<string>">{"list<string>"}</option>
                        </Input>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name="isVariable"
                                    checked={isVariable}
                                    onChange={handleCheckboxChange}
                                />{' '}
                                Vary this argument?
                            </Label>
                        </FormGroup>
                    </Col>
                </FormGroup>

                {isVariable && (
                    <FormGroup row>
                        <Label for="maxInputSize" sm={2}>
                            Maximum Input Size
                        </Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="maxInputSize"
                                id="maxInputSize"
                                placeholder="Enter your maximum input size as an integer"
                                value={maxInputSize}
                                onChange={handleMaxInputSizeChange}
                                invalid={!isMaxInputSizeValid}
                            />
                            <FormFeedback>Please enter a valid maximum input size for your variable argument.</FormFeedback>
                        </Col>
                    </FormGroup>
                )}

                <FormGroup row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
            {hasSubmissionError && <Alert color='danger'>{submissionErrorText}</Alert>}
        </ContainerCard>
    );
};

export default ArgumentEntryForm;
