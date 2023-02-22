import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateDevice from "../../components/Modals/CreateDevice";
import CreateBrand from "../../components/Modals/CreateBrands";
import CreateType from "../../components/Modals/CreateType";


const AdminPage = () => {

    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <Container className={"d-flex flex-column"}>
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
};

export default AdminPage;