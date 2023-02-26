import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ListGroup} from "react-bootstrap";
import cls from "./TypeBar.module.css";

const TypeBar = observer(() => {

    const {device} = useContext(Context);

    return (
        <ListGroup>
            <h2>Типы устройств</h2>

            {device.types ?
                device.types.map(type =>
                    <ListGroup.Item
                        className={`bg-light text-dark my-1  + ${cls.list__item}`}
                        active={type.id === device.selectedType.id}
                        onClick={() => {
                            device.setSelectedType(type)
                            device.setSelectedBrand("")
                        }}
                        key={type.id}>
                        <div>{type.name}</div>
                    </ListGroup.Item>)
                : "Hello"
            }
        </ListGroup>
    );
});

export default TypeBar;