import React, {useEffect} from 'react';
import {Card, Col, Image, Spinner} from "react-bootstrap";
import star from "../../assets/star.png"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../routes/constRouterHelper";
import cls from "./DeviceItem.module.css"

const DeviceItem = ({device}) => {

    const history = useNavigate();

    return (
        <Col xl={4} md={6} className={"mt-1 d-flex align-items-center justify-content-center"} onClick={() => {
            history(DEVICE_ROUTE + "/" + device.id)
        }}>
            <Card className={`p-2 d-flex flex-column justify-content-center + ${cls.item}`}>

                <Image width={200} height={200} src={process.env.REACT_APP_API_URL + device.img}/>

                <div className={"text-black-50 mt-1 d-flex justify-content-between align-items-center"}>
                    <div>{device.name}</div>
                    <div className={"d-flex align-items-center"}>
                        <div>{device.rating}</div>

                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;