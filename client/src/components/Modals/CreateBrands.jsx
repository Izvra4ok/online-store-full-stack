import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {createBrand, fetchBrands, fetchTypes} from "../../DAL/deviceApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import cls from "./Modals.module.css";


const CreateBrand = observer(({onHide, show}) => {

    const {device} = useContext(Context);
    const [brandName, setBrandName] = useState("");

    const addBrand = () => {
        if (brandName) {
            createBrand({name: brandName}).then(data => setBrandName(""))
            onHide()
        }
    };

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, [fetchTypes,fetchBrands,brandName])

    return (

        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить бренд</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        className={cls.form__input} placeholder={"Введите название бренда"}
                        onChange={event => setBrandName(event.target.value)}
                        value={brandName}/>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addBrand}>
                    Добавить бренд
                </Button>
            </Modal.Footer>
        </Modal>

    );
});

export default CreateBrand;