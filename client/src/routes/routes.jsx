import React from "react";
import AdminPage from "../pages/AdminPage";
import {
    ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE,
    LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE
} from "./constRouterHelper";
import BasketPage from "../pages/BasketPage";
import ShopPage from "../pages/ShopPage/ShopPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import DevicePage from "../pages/DevicePage";


export const authRoutes = [
    {path: ADMIN_ROUTE, element: <AdminPage/>},
    {path: BASKET_ROUTE, element: <BasketPage/>},
    {path: SHOP_ROUTE, element: <ShopPage/>},
];


export const publicRoutes = [
    {path: SHOP_ROUTE, element: <ShopPage/>},
    {path: LOGIN_ROUTE, element: <AuthPage/>},
    {path: REGISTRATION_ROUTE, element: <AuthPage/>},
    {path: DEVICE_ROUTE + "/:id", element: <DevicePage/>},
];