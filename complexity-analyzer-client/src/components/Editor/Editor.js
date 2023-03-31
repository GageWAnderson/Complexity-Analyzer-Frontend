import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { Alert, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import awsData from '../../data/aws-data';
import { API } from 'aws-amplify';
import endpoints from '../../data/endpoints'
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';

const Editor = () => {
    const [code, setCode] = useState('');
    const inputArgs = useSelector(state => state.inputArguments.inputArguments);
    const uuid = useSelector(state => state.profile.uuid);
    const description = useSelector(state => state.inputArguments.description);
    const [hasSubmissionError, setHasSubmissionError] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleCodeChange = (newCode) => {
        if (hasSubmitted) {
            setHasSubmitted(false);
        }
        setCode(newCode);
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
        console.log(inputArgs);
        for (let i = 0; i < inputArgs.length; i++) {
            formattedArgs.push({
                argName: inputArgs[i].name,
                variable: inputArgs[i].isVariable,
                argType: inputArgs[i].type
            });
        }
        return formattedArgs;
    };

    const submitCodeAndArgs = () => {
        const formattedCode = code.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\t", "\\t");
        const formattedArgs = formatArguments(inputArgs);
        const maxInputSize = getMaxInputSize(inputArgs);
        const init = {
            body: {
                uuid: uuid,
                description: description,
                inputCode: formattedCode,
                maxInputSize: parseInt(maxInputSize),
                args: formattedArgs
            },
            headers: {},
        }
        API.post(awsData.apiGatewayName, endpoints.inputValidator, init)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                setHasSubmitted(true);
                setHasSubmissionError(true);
            });
    };

    return (
        <>
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
            {(hasSubmitted && hasSubmissionError) && <Alert color="danger">Error submitting code and arguments.</Alert>}
            {(hasSubmitted && !hasSubmissionError) && <Alert color="success">Successfully submitted code and arguments.</Alert>}
            <Button size='lg' color="primary" onClick={submitCodeAndArgs} style={{ margin: '16px' }}>Analyze Code</Button>
        </>

    );
};

export default Editor;