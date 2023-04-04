import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Container, ListGroup, ListGroupItem, Spinner, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import RuntimeGraph from '../RuntimeGraph/RuntimeGraph';
import { API } from 'aws-amplify';
import endpoints from '../../data/endpoints'
import awsData from '../../data/aws-data';
import { updateResultsMetadata } from '../../redux/resultsMetadataSlice';
import ContainerCard from '../ContainerCard/ContainerCard';

const Results = () => {

    const dispatch = useDispatch();

    const ITEMS_PER_PAGE = 5;
    const MAX_PAGES_DISPLAYED = 5;

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeItem, setActiveItem] = useState(null);
    const [page, setPage] = useState(1);
    const resultsMetadata = useSelector(state => state.resultsMetadata.results);

    const uuid = useSelector(state => state.profile.uuid);

    const totalPages = Math.ceil(resultsMetadata.length / ITEMS_PER_PAGE);

    const itemsToDisplay = resultsMetadata.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

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
                dispatch(updateResultsMetadata(response.body));
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

    const handlePageClick = (pageNumber) => {
        setPage(parseInt(pageNumber));
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

    const pagesToDisplay = [];
    const startPage = Math.max(page - Math.floor(MAX_PAGES_DISPLAYED / 2), 1);
    const endPage = Math.min(startPage + MAX_PAGES_DISPLAYED - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        pagesToDisplay.push(i);
    }


    const resultList = () => {
        if (resultsMetadata === null || hasError) {
            return (
                <Alert color='danger'>Failed to load results metadata</Alert>
            );
        }
        return (
            <>
                <ListGroup>
                    {itemsToDisplay.map(value => (
                        <ListGroupItem onClick={handleListItemClick} active={value.timestamp === activeItem} id={value.timestamp} key={value.timestamp}>
                            <p><b>Timestamp: </b>{unixToHuman(value.timestamp)}, <b>Complexity Estimate:</b> {value.complexity}</p>
                            <p><b>Description: </b>{value.description}</p>
                        </ListGroupItem>
                    ))}
                </ListGroup>
                {resultsMetadata.length > 0 && <Pagination style={{ margin: '16px' }}>
                    <PaginationItem disabled={page === 1}>
                        <PaginationLink previous onClick={() => handlePageClick(page - 1)} />
                    </PaginationItem>
                    {pagesToDisplay.map((pageNumber) => (
                        <PaginationItem key={pageNumber} active={pageNumber === page}>
                            <PaginationLink onClick={() => handlePageClick(pageNumber)}>{pageNumber}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem disabled={page === totalPages}>
                        <PaginationLink next onClick={() => handlePageClick(page + 1)} />
                    </PaginationItem>
                </Pagination>}
            </>
        );
    }

    return (
        <Container className="mt-5 text-center">
            <br />
            <h1>Your Results</h1>
            <p>Analyzing complexity takes time, please wait up to 15 minutes for your results to appear...</p>
            <ContainerCard>
                {isLoading ? <Spinner /> : resultList()}
            </ContainerCard>
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