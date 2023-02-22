import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Card, Row} from "react-bootstrap";
import cls from "./BrandBar.module.css";

const BrandBar = observer(() => {

    const {device} = useContext(Context);

    return (
        <Row className={`mt-1 + ${cls.brands}`}>
            {
                device.brands.map(brand =>
                    <Card className={`p-2 + ${cls.brand}`}
                          onClick={() => device.setSelectedBrand(brand)}
                          border={brand.id === device.selectedBrand.id ? "primary" : ""}
                          key={brand.id}>
                        {brand.name}
                    </Card>)
            }
        </Row>
    );
});

export default BrandBar;