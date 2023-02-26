import React, {useContext, useEffect, useState} from "react";
import AppRouter from "./components/AppRouter/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./DAL/userApi";
import {Spinner} from "react-bootstrap";
import './App.css';


const App = observer(() => {

    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(true);
            user.setIsAuth(true)
        })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <div className="App">
            <NavBar/>
            <AppRouter/>
        </div>
    )
});

export default App;
