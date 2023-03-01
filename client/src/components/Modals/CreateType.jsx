import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {createType, fetchBrands, fetchTypes} from "../../DAL/deviceApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import cls from "./Modals.module.css";


const CreateType = observer(({onHide, show}) => {

    const {device} = useContext(Context);
    const [typeName, setTypeName] = useState("");

    const addType = () => {
        if (typeName) {
            createType({name: typeName}).then(data => setTypeName(""));
            onHide();
        }
    }

        useEffect(() => {
            fetchTypes().then(data => device.setTypes(data));
            fetchBrands().then(data => device.setBrands(data));
        }, [fetchTypes,fetchBrands,typeName])

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить тип</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control className={cls.form__input} placeholder={"Введите название типа"}
                                  value={typeName}
                                  onChange={e => setTypeName(e.target.value)}/>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addType}>
                    Добавить тип
                </Button>
            </Modal.Footer>
        </Modal>

    );
});
export default CreateType;