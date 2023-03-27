import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';

const Editor = () => {
    const [code, setCode] = useState('');

    const handleCodeChange = (newCode) => {
        setCode(newCode);
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
        </>

    );
};

export default Editor;