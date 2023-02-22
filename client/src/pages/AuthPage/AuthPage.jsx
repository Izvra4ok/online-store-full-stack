import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import cls from "./AuthPage.module.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../routes/constRouterHelper";
import {login, registration} from "../../DAL/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";


const AuthPage = observer(() => {

    const {user} = useContext(Context);

    const location = useLocation();
    const history = useNavigate();

    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
    }

    return (
        <Container className={`d-flex justify-content-center align-items-center mt-3 + ${cls.auth}`}>
            <Card className={`p-5 + ${cls.card}`}>
                <h2 className="m-auto h2">{isLogin ? "Авторизация" : "Регистрация"}</h2>

                <Form className="d-flex flex-column">
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
                                    ? <>No account?<NavLink to={REGISTRATION_ROUTE}>Register</NavLink></>
                                    : <>Have a profile?<NavLink to={LOGIN_ROUTE}>Login</NavLink></>
                            }
                        </div>
                    </Row>
                    <Button onClick={click}
                            className="mt-3 align-self-end"
                            variant={"outline-dark"}>{isLogin ? "Войти" : "Создать аккаунт"}</Button>

                </Form>
            </Card>
        </Container>
    );
});

export default AuthPage;