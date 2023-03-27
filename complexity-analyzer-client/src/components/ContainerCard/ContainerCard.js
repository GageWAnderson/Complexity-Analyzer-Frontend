import React from 'react';
import { Container, Card, CardBody } from 'reactstrap';

const ContainerCard = ({ children }) => {
    return (
        <Container className="d-flex justify-content-center">
            <Card className="border-info bg-light shadow-sm d-flex flex-column align-items-left" style={{ whiteSpace: 'nowrap', margin: '16px', padding: '16px', minWidth: 1200 }}>
                <CardBody>{children}</CardBody>
            </Card>
        </Container>
    );
};

export default ContainerCard;
