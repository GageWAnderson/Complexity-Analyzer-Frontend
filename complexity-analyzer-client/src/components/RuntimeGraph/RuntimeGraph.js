import React from 'react';
import { XYPlot, XAxis, YAxis, MarkSeries } from 'react-vis';
import { Container } from 'reactstrap';
// import { useSelector } from 'react-redux';

function RuntimeGraph() {
    //   const data = useSelector(state => state.scatterPlot.data);

    const data = [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 1 },
        { x: 4, y: 5 },
        { x: 5, y: 3 },
    ];


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <XYPlot width={800} height={400}>
                <XAxis />
                <YAxis />
                <MarkSeries data={data} />
            </XYPlot>
        </Container>
    );
}

export default RuntimeGraph;
