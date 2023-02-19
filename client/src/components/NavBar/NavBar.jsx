import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../../routes/constRouterHelper";
import cls from "./NavBar.module.css"
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context);

    return (
        <Navbar bg="secondary" variant="dark">
            <Container>

                <NavLink to={SHOP_ROUTE}>
                    <img className={cls.navbar__logo}
                         src="https://free-png.ru/wp-content/uploads/2021/12/free-png.ru-173-340x340.png" alt=""/>
                </NavLink>

                <Nav className="ml-auto">
                    {
                        user.isAuth
                            ? <>
                                <Button variant={"outline-dark"}>Admin panel</Button>
                                <Button className="ms-2" variant={"outline-dark"}
                                        onClick={() => user.setIsAuth(false)}>Log out</Button>

                            </>
                            : <>
                                <Button onClick={() => user.setIsAuth(true)} variant={"outline-dark"}>Authorization</Button>
                            </>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;