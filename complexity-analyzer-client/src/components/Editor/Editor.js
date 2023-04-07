import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { Alert, Button, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import awsData from '../../data/aws-data';
import { API } from 'aws-amplify';
import endpoints from '../../data/endpoints'
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';
import ContainerCard from '../ContainerCard/ContainerCard';
import { updateInputCode } from '../../redux/inputArgumentsSlice';

const Editor = () => {
    const inputArgs = useSelector(state => state.inputArguments.inputArguments);
    const uuid = useSelector(state => state.profile.uuid);
    const [errorText, setErrorText] = useState('There was an error submitting your code and arguments.');
    const description = useSelector(state => state.inputArguments.description);
    const [hasSubmissionError, setHasSubmissionError] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const apiKey = useSelector(state => state.profile.apiKey);

    const code = useSelector(state => state.inputArguments.inputCode);

    const handleCodeChange = (newCode) => {
        if (hasSubmitted) {
            setHasSubmitted(false);
        }
        dispatch(updateInputCode(newCode));
    };

    const getMaxInputSize = (inputArgs) => {
        for (let i = 0; i < inputArgs.length; i++) {
            if (inputArgs[i].isVariable) {
                return inputArgs[i].maxInputSize;
            }
        }
        throw new Error("No variable input argument with a max input size found");
    };

    const formatArguments = (inputArgs) => {
        let formattedArgs = [];
        for (let i = 0; i < inputArgs.length; i++) {
            formattedArgs.push({
                argName: inputArgs[i].name,
                variable: inputArgs[i].isVariable,
                argType: inputArgs[i].type
            });
        }
        return formattedArgs;
    };

    const isValidCode = (code) => {
        if (code === '') {
            return false;
        }
        return true;
    };

    const submitCodeAndArgs = (event) => {
        event.preventDefault();
        if (!isValidCode(code)) {
            setErrorText('Code cannot be empty.');
            setHasSubmissionError(true);
            setHasSubmitted(true);
            return;
        } else if (inputArgs.length === 0) {
            setErrorText('You must have at least one input argument.');
            setHasSubmissionError(true);
            setHasSubmitted(true);
            return;
        }

        const formattedArgs = formatArguments(inputArgs);
        const maxInputSize = getMaxInputSize(inputArgs);
        const init = {
            body: {
                description: description,
                inputCode: JSON.stringify(code),
                maxInputSize: parseInt(maxInputSize),
                args: formattedArgs
            },
            headers: { 'x-api-key': apiKey },
        }
        setIsLoading(true);
        setHasSubmitted(false);
        setHasSubmissionError(false);
        API.post(awsData.apiGatewayName, endpoints.inputValidator(uuid), init)
            .then(() => {
                setHasSubmitted(true);
                setHasSubmissionError(false);
                setIsLoading(false);
            })
            .catch(() => {
                setHasSubmitted(true);
                setHasSubmissionError(true);
                setIsLoading(false);
            });
    };

    // TODO: Add informative validation for error messages on code submitting
    return (
        <ContainerCard>
            <h2>Code Editor</h2>
            <AceEditor
                mode="python"
                theme="dracula"
                onChange={handleCodeChange}
                name="python-editor"
                editorProps={{ $blockScrolling: true }}
                value={code}
                width="100%"
                height="500px"
            />
            {(hasSubmitted && hasSubmissionError) && <Alert style={{ margin: '16px' }} color="danger">{errorText}</Alert>}
            {(hasSubmitted && !hasSubmissionError) && <Alert style={{ margin: '16px' }} color="success">Successfully submitted code and arguments.</Alert>}
            {isLoading ?
                <Button
                    size='lg'
                    style={{ margin: '16px' }}
                    color="primary"
                    disabled
                >
                    <Spinner size="sm">
                        Loading...
                    </Spinner>
                    <span>
                        {' '}Loading
                    </span>
                </Button> :
                <Button size='lg' color="primary" onClick={submitCodeAndArgs} style={{ margin: '16px' }}>Analyze Code</Button>}
        </ContainerCard>

    );
};

export default Editor;