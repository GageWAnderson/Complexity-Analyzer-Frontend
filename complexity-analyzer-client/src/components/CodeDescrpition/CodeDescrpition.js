import React from 'react';
import { useSelector } from 'react-redux';
import ContainerCard from '../ContainerCard/ContainerCard';

const CodeDescrpition = () => {

    const codeDescription = useSelector(state => state.inputArguments.description);

    return (
        <ContainerCard>
            <h3>Code Description:</h3>
            <p>{codeDescription}</p>
        </ContainerCard>
    );
};

export default CodeDescrpition;
