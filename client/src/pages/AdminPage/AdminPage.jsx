import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateDevice from "../../components/Modals/CreateDevice";
import CreateBrand from "../../components/Modals/CreateBrands";
import CreateType from "../../components/Modals/CreateType";
import {observer} from "mobx-react-lite";
import {fetchBrands, fetchTypes} from "../../DAL/deviceApi";
import {Context} from "../../index";


const AdminPage = observer(() => {

    const {device} = useContext(Context);

    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, [fetchTypes,fetchBrands])

    return (
        <Container className={"d-flex flex-column w-50"}>

            <Button onClick={() => setTypeVisible(true)} variant={"outline-dark"} className={"mt-4 p-2"}>
                Добавить тип
            </Button>

            <Button onClick={() => setBrandVisible(true)} variant={"outline-dark"} className={"mt-4 p-2"}>
                Добавить бренд
            </Button>

            <Button onClick={() => setDeviceVisible(true)} variant={"outline-dark"} className={"mt-4 p-2"}>
                Добавить устройство
            </Button>

            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>


        </Container>
    );
});

export default AdminPage;