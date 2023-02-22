import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import cls from "./DeviceItem.module.css"
import star from "../../assets/star.png"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../routes/constRouterHelper";

const DeviceItem = ({device}) => {
    console.log(device)
    const history = useNavigate();


    return (
        <Col md={4} className={"mt-1"}>
            <Card className={`p-2 d-flex flex-column + ${cls.item}`}>

                <Image width={200} height={200} src={process.env.REACT_APP_API_URL + device.img} onClick={() => {
                    history(DEVICE_ROUTE + "/" + device.id)
                }}/>

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