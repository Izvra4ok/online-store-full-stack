import React from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import cls from "./AuthPage.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../routes/constRouterHelper";


const AuthPage = () => {

    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;


    return (
        <Container className={`d-flex justify-content-center align-items-center mt-3 + ${cls.auth}`}>
            <Card className={`p-5 + ${cls.card}`}>
                <h2 className="m-auto h2">{isLogin ? "Authorization" : "Registration"}</h2>

                <Form className="d-flex flex-column">

                    <Form.Control className={`mt-5   + ${cls.form__input}`}
                                  placeholder={"Enter email"}/>

                    <Form.Control className={`mt-3 + ${cls.form__input}`}
                                  placeholder={"Enter password"}/>

                    <Row>
                        <div className={"d-flex mt-3"}>
                            {isLogin
                                ? <>No account?<NavLink to={REGISTRATION_ROUTE}>Register</NavLink></>
                                : <>Have a profile?<NavLink to={LOGIN_ROUTE}>Login</NavLink></>
                            }

                        </div>
                    </Row>
                    <Button className="mt-3 align-self-end"
                            variant={"outline-dark"}>{isLogin ? "Login" : "Create account"}</Button>

                </Form>
            </Card>

        </Container>
    );
};

export default AuthPage;