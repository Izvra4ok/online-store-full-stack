import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../routes/constRouterHelper";
import {login, registration} from "../../DAL/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import cls from "./AuthPage.module.css";


const AuthPage = observer(() => {

    const {user} = useContext(Context);

    const location = useLocation();
    const history = useNavigate();

    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user);
            user.setIsAuth(true);
            history(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    };

    return (
        <Container className={`d-flex justify-content-center align-items-center mt-3`}>
            <Card className={`p-5 + ${cls.card}`}>
                <h2 className="m-auto h2 text-black">{isLogin ? "Авторизация" : "Регистрация"}</h2>

                <Form className="d-flex flex-column text-black">
                    <Form.Control className={`mt-5   + ${cls.form__input}`}
                                  placeholder={"Введите ваш email"}
                                  value={email}
                                  type={email}
                                  onChange={(e) => setEmail(e.target.value)}/>

                    <Form.Control className={`mt-3 + ${cls.form__input}`}
                                  placeholder={"Введите ваш пароль"}
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>

                    <Row>
                        <div className={"d-flex mt-3"}>
                            {
                                isLogin
                                    ? <div className="text-black">Нет аккаунта?
                                        <NavLink to={REGISTRATION_ROUTE}
                                                 className="text-primary ms-1">Зарегистрируйся</NavLink>
                                    </div>
                                    : <div className="text-black">Есть аккаунт?
                                        <NavLink to={LOGIN_ROUTE} className="text-primary ms-1">Войти</NavLink>
                                    </div>
                            }
                        </div>
                    </Row>
                    <Button onClick={click}
                            className="mt-3 align-self-end"
                            variant={"outline-dark"}>
                        {isLogin ? "Войти" : "Создать аккаунт"}
                    </Button>

                </Form>
            </Card>
        </Container>
    );
});

export default AuthPage;