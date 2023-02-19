import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../../components/TypeBar/TypeBar";
import BrandBar from "../../components/BrandBar/BrandBar";

const ShopPage = () => {
    return (
        <Container>
            <Row className={"mt-3"}>
                <Col md={3}>
                    <TypeBar/>
                </Col>

                <Col md={6}>
                    <BrandBar/>
                </Col>
            </Row>
        </Container>
    );
};

export default ShopPage;