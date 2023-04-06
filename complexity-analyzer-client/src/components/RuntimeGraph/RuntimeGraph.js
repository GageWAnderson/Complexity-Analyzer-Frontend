import React, { useState } from 'react';
import { XYPlot, XAxis, YAxis, MarkSeries, VerticalGridLines, HorizontalGridLines } from 'react-vis';
import { Alert, Button, Spinner } from 'reactstrap';
import { API } from 'aws-amplify';
import endpoints from '../../data/endpoints'
import awsData from '../../data/aws-data';
import { useDispatch, useSelector } from 'react-redux';
import ContainerCard from '../ContainerCard/ContainerCard';
import { updateResultsGraph } from '../../redux/resultsGraphSlice';

function RuntimeGraph({ timestamp, uuid }) {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const graphData = useSelector(state => state.resultsGraph.graph);
    const apiKey = useSelector(state => state.profile.apiKey);

    const dispatch = useDispatch();

    const formatGraphData = (data) => {
        const mappedData = data.map((item) => {
            return {
                x: item.x,
                y: parseFloat(item.y),
            }
        });
        dispatch(updateResultsGraph(mappedData));
    };

    const getResultsGraph = (event) => {
        event.preventDefault();
        if (timestamp === null) {
            setHasError(true);
            return;
        }
        const init = { headers: { 'x-api-key': apiKey } };
        setIsLoading(true);
        API.get(awsData.apiGatewayName, endpoints.getResultGraph(uuid, timestamp), init)
            .then(response => {
                formatGraphData(response.body)
                setHasError(false);
                setIsLoading(false);
            })
            .catch(error => {
                setHasError(true);
                setIsLoading(false);
            });
    }

    const minX = graphData ? Math.min(...graphData.map(item => item.x)) : 0;
    const maxX = graphData ? Math.max(...graphData.map(item => item.x)) : 0;
    const minY = graphData ? Math.min(...graphData.map(item => item.y)) : 0;
    const maxY = graphData ? Math.max(...graphData.map(item => item.y)) : 0;

    const renderGraphDisplay = () => {
        if (isLoading) {
            return (
                <Spinner color='primary' />
            );
        } else if (hasError) {
            return (
                <Alert color="danger">Error loading results runtime graph</Alert>
            );
        } else if (graphData === null) {
            return (
                <Alert color='warning'>No Graph Data Yet</Alert>
            );
        } else {
            return (
                <XYPlot xDomain={[minX, maxX]} yDomain={[minY, maxY]} width={1000} height={600}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title='Input Size' />
                    <YAxis title='Runtime (seconds)' />
                    <MarkSeries data={graphData} />
                </XYPlot>
            );
        }
    };

    return (
        <>
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
                <Button size='lg' color="primary" onClick={getResultsGraph} style={{ margin: '16px' }}>Get Runtime Graph</Button>}
            <ContainerCard>
                {renderGraphDisplay()}
            </ContainerCard>
        </>
    );
}

export default RuntimeGraph;
