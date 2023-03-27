import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Button, FormFeedback } from 'reactstrap';
import ContainerCard from '../ContainerCard/ContainerCard';

const ArgumentEntryForm = () => {
    const DEFAULT_MAX_INPUT_SIZE = 100;
    const LIMIT_MAX_INPUT_SIZE = 100000;

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [maxInputSize, setMaxInputSize] = useState(DEFAULT_MAX_INPUT_SIZE);
    const [isNameValid, setIsNameValid] = useState(false);
    const [isMaxInputSizeValid, setIsMaxInputSizeValid] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle argument entry here
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setIsNameValid(e.target.value !== '');
    };

    const handleValueChange = (e) => {
        setValue(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
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
                            name="value"
                            id="value"
                            value={value}
                            onChange={handleValueChange}
                        >
                            <option value="">Please select a value</option>
                            <option value="integer">{"Integer"}</option>
                            <option value="option2">{"String"}</option>
                            <option value="option3">{"List<Integer>"}</option>
                            <option value="option4">{"List<String>"}</option>
                        </Input>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name="isChecked"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />{' '}
                                Vary this argument?
                            </Label>
                        </FormGroup>
                    </Col>
                </FormGroup>

                {isChecked && (
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
        </ContainerCard>
    );
};

export default ArgumentEntryForm;
