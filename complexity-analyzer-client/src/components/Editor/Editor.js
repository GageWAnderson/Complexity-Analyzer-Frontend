import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import endpoints from '../../data/endpoints'
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';

const Editor = () => {
    const [code, setCode] = useState('');
    const inputArgs = useSelector(state => state.inputArgs);

    const handleCodeChange = (newCode) => {
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
        let formattedArgs = "";
        for (let i = 0; i < inputArgs.length; i++) {
            formattedArgs += inputArgs[i].name;
            if (i < inputArgs.length - 1) {
                formattedArgs += ", ";
            }
        }
        return formattedArgs;
    };

    const submitCodeAndArgs = () => {
        const formattedCode = code.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\t", "\\t");
        const formattedArgs = formatArguments(inputArgs);
        const maxInputSize = getMaxInputSize(inputArgs);

        axios.post(endpoints.inputValidator, {
            description: 'TODO: Add description from user input to be logged in metadata',
            inputCode: formattedCode,
            maxInputSize: maxInputSize,
            args: formattedArgs
        })
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
            <Button size='lg' color="primary" onClick={submitCodeAndArgs} style={{ margin: '16px' }}>Analyze Code</Button>
        </>

    );
};

export default Editor;