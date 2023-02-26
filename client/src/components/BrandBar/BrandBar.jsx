import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Dropdown, Row} from "react-bootstrap";
import cls from "./BrandBar.module.css";

const BrandBar = observer(() => {

    const {device} = useContext(Context);

    return (
        <Row className={`d-flex flex-column mt-1 + ${cls.brands}`}>
            <h2>Популярные бренды производителей</h2>
            <Dropdown>
                <Dropdown.Toggle
                    variant="secondary">{device.selectedBrand.name || "Выберите бренд устройства"}</Dropdown.Toggle>
                <Dropdown.Menu>{device.brands.map(brand =>
                    <Dropdown.Item onClick={() => device.setSelectedBrand(brand)}
                                   key={brand.id}>
                        {brand.name}
                    </Dropdown.Item>
                )}</Dropdown.Menu>
            </Dropdown>
        </Row>
    );
});

export default BrandBar;