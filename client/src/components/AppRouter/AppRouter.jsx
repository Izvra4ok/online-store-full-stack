import React, {useContext} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../../routes/routes";
import {SHOP_ROUTE} from "../../routes/constRouterHelper";
import {Context} from "../../index";

const AppRouter = () => {

    const {user} = useContext(Context)

    return (
        <Routes>
            {
                user.isAuth && authRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>)
            }

            {
                publicRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>)
            }
            <Route path='*' element={<Navigate to={SHOP_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;