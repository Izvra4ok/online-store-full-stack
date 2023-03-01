import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes} from "../../DAL/deviceApi";
import {observer} from "mobx-react-lite";
import cls from "./Modals.module.css";


const CreateDevice = observer(({show, onHide}) => {

    const {device} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, []);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(inf => inf.number === number ? {...inf, [key]: value} : inf))
    };

    const selectFile = e => {
        setFile(e.target.files[0])
    };

    const addDevice = () => {
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', `${price}`);
            formData.append('img', file);
            formData.append('brandId', device.selectedBrand.id);
            formData.append('typeId', device.selectedType.id);
            formData.append('info', JSON.stringify(info));
            createDevice(formData).then(data => onHide());
        } catch (e) {
            console.log(`${e},`,e)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg" fullscreen={"sm-down"}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Dropdown>
                        <Dropdown.Toggle
                            variant="secondary">{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>{device.types.map(type =>
                            <Dropdown.Item onClick={() => device.setSelectedType(type)}
                                           key={type.id}>
                                {type.name}
                            </Dropdown.Item>
                        )}</Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className={"mt-3 mb-3"}>
                        <Dropdown.Toggle
                            variant="secondary">{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>{device.brands.map(brand =>
                            <Dropdown.Item onClick={() => device.setSelectedBrand(brand)}
                                           key={brand.id}>
                                {brand.name}
                            </Dropdown.Item>
                        )}</Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите название устройства"
                        className={cls.form__input}
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder="Введите стоимость устройства"
                        type="number"
                        className={cls.form__input}

                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button variant={"outline-dark"} onClick={addInfo}>Добавить новое свойство</Button>
                    {
                        info.map(i =>
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder="Введите название свойства"
                                        className={cls.form__input_description}
                                    />
                                </Col>

                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        placeholder="Введите описание свойства"
                                        className={cls.form__input_description}
                                    />
                                </Col>

                                <Col md={4}>
                                    <Button
                                        onClick={() => removeInfo(i.number)}
                                        variant={"outline-dark"}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;