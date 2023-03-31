import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Container, ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import RuntimeGraph from '../RuntimeGraph/RuntimeGraph';
import { API } from 'aws-amplify';
import endpoints from '../../data/endpoints'
import awsData from '../../data/aws-data';
import { updateResultsMetadata } from '../../redux/resultsMetadataSlice';

const Results = () => {

    const dispatch = useDispatch();

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const resultsMetadata = useSelector(state => state.resultsMetadata.results);

    const uuid = useSelector(state => state.profile.uuid);

    const getResultsMetadata = () => {
        const init = { headers: {} };
        setIsLoading(true);
        API.get(awsData.apiGatewayName, endpoints.getAllUserMetadata(uuid), init)
            .then(response => {
                console.log(response);
                dispatch(updateResultsMetadata(response));
                setHasError(false);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setHasError(true);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getResultsMetadata();
    }, []);

    const resultList = () => {
        if (isLoading) {
            return (
                <Spinner />
            );
        } else if (hasError) {
            return (
                <Alert color="danger">Failed to load results metadata, try again.</Alert>
            )
        } else {
            return (
                <ListGroup>
                    {resultsMetadata.body.map(value => (
                        <ListGroupItem key={value.timestamp}>
                            <p><b>{value.timestamp}</b>: Complexity Estimate: {value.complexity}, Code: {value.inputCode}</p>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            );
        }
    }

    return (
        <Container className="mt-5 text-center">
            <h1>Your Results</h1>
            <p>Analyzing complexity takes time, please wait up to 15 minutes for your results to appear...</p>
            {resultList()}
            <Button className="mt-3" onClick={getResultsMetadata} color="primary">Refresh Results</Button>
            <RuntimeGraph />
        </Container>
    );
}

export default Results;