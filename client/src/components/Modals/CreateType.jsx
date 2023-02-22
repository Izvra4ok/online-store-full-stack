import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import cls from "./Modals.module.css";
import {createType} from "../../DAL/deviceApi";

const CreateType = ({onHide, show}) => {

    const [typeName, setTypeName] = useState("");

    const addType = () => {
        if (typeName) {
            createType({name: typeName}).then(data => setTypeName(""));
            onHide();
        }
    }

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
}
export default CreateType;