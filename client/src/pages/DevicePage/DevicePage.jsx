import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {fetchOneDevice} from "../../DAL/deviceApi";
import cls from "./DevicePage.module.css"


const DevicePage = () => {

    const [device, setDevice] = useState({info: [] });
    const {id} = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDevice(data)
            console.log(data)
        })
    }, [])


    return (
        <Container className={"mt-3"}>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>

                <Col md={4}>
                    <Row className={"d-flex flex-row justify-content-center align-items-center"}>
                        <h2 style={{textAlign: "center"}}>{device.name}</h2>
                        <div className={`d-flex align-items-center justify-content-center + ${cls.rating}`}>
                            {device.rating}
                        </div>
                    </Row>

                </Col>

                <Col md={4}>
                    <Card className={"d-flex flex-column align-items-center justify-content-around"}
                          style={{width: "300px", height: "300px", border: "5px solid lightgrey", fontSize: "32px"}}>
                        <h3>From: {device.price} $</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>

            <Row className={"d-flex flex-column mt-3"}>
                <h1>Характеристики товара:</h1>
                {
                    device.info.map((info, index) =>
                        <Row key={info.id}
                             style={{background: index % 2 === 0 ? "lightgray" : "transparent", padding: "10px"}}>
                            {info.title} : {info.description}
                        </Row>)}
            </Row>
        </Container>
    );
};
export default DevicePage;