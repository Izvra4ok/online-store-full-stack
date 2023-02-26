import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../routes/constRouterHelper";
import {observer} from "mobx-react-lite";
import cls from "./NavBar.module.css"


const NavBar = observer(() => {

    const {user} = useContext(Context);
    const history = useNavigate();

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <Navbar bg="secondary" variant="dark">
            <Container>


                <NavLink to={SHOP_ROUTE}>
                    <div className="d-flex flex-column align-items-center">
                        <div className={cls.logo}>Online store</div>
                        <img className={cls.logoImage}
                             src="https://free-png.ru/wp-content/uploads/2021/12/free-png.ru-173-340x340.png" alt="logo"/>
                    </div>
                </NavLink>

                <Nav className="ml-auto">
                    {
                        user.isAuth
                            ? <>
                                <Button variant={"outline-dark"} onClick={() => {
                                    history(ADMIN_ROUTE + "/")
                                }}>
                                    Панель администратора
                                </Button>

                                <Button className="ms-2" variant={"outline-dark"}
                                        onClick={() => {
                                            logout()
                                            history(LOGIN_ROUTE + "/")
                                        }}>
                                    Выйти
                                </Button>

                            </>
                            : <>
                                <Button onClick={() => history(LOGIN_ROUTE)}
                                        variant={"outline-dark"}>Авторизация</Button>
                                <Button onClick={() => history(REGISTRATION_ROUTE)}
                                        variant={"outline-dark"} className="ms-2">Регистрация</Button>
                            </>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;