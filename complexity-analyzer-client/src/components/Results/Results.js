import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Container, ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import RuntimeGraph from '../RuntimeGraph/RuntimeGraph';
import { API } from 'aws-amplify';
import endpoints from '../../data/endpoints'
import awsData from '../../data/aws-data';
import { updateResultsMetadata } from '../../redux/resultsMetadataSlice';
import ContainerCard from '../ContainerCard/ContainerCard';

const Results = () => {

    const dispatch = useDispatch();

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeItem, setActiveItem] = useState(null);
    const resultsMetadata = useSelector(state => state.resultsMetadata.results);

    const uuid = useSelector(state => state.profile.uuid);

    const getResultsMetadata = (event) => {
        if (event) {
            event.preventDefault();
        }
        const init = { headers: {} };
        setHasError(false);
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
        if (resultsMetadata === null) {
            getResultsMetadata(null);
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleListItemClick = (event) => {
        setActiveItem(event.target.id);
    };

    function unixToHuman(unixTimestamp) {
        // Create a new Date object based on the Unix timestamp
        const dateObj = new Date(unixTimestamp * 1000);

        // Extract the individual date and time components from the Date object
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();

        // Format the date and time components into a human-readable string
        const formattedTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

        // Return the formatted string
        return formattedTime;
    }


    const resultList = () => {
        if (resultsMetadata === null) {
            return (
                <Alert color='danger'>Failed to load results metadata</Alert>
            );
        }
        return (
            <ListGroup>
                {resultsMetadata.body.map(value => (
                    <ListGroupItem onClick={handleListItemClick} active={value.timestamp === activeItem} id={value.timestamp} key={value.timestamp}>
                        <p><b>Timestamp: </b>{unixToHuman(value.timestamp)}, <b>Complexity Estimate:</b> {value.complexity}</p>
                        <p><b>Description: </b>{value.description}</p>
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }

    return (
        <Container className="mt-5 text-center">
            <h1>Your Results</h1>
            <p>Analyzing complexity takes time, please wait up to 15 minutes for your results to appear...</p>
            {isLoading ? <ContainerCard><Spinner /></ContainerCard> : resultList()}
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
                <Button size='lg' color="primary" onClick={getResultsMetadata} style={{ margin: '16px' }}>Refresh Results</Button>}
            <RuntimeGraph uuid={uuid} timestamp={activeItem} />
        </Container>
    );
}

export default Results;