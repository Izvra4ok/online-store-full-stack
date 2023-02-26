import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {createBrand} from "../../DAL/deviceApi";
import cls from "./Modals.module.css";


const CreateBrand = ({onHide, show}) => {

    const [brandName, setBrandName] = useState("");

    const addBrand = () => {
        if (brandName) {
            createBrand({name: brandName}).then(data => setBrandName(""))
            onHide()
        }
    };

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
}
export default CreateBrand;