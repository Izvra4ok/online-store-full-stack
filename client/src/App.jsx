import React from "react";
import './App.css';
import AppRouter from "./components/AppRouter/AppRouter";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
    return (
        <div className="App">
            <NavBar/>
            <AppRouter/>
        </div>
    );
}

export default App;
