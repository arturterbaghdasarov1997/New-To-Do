import React from 'react';
import CreatePage from "../pages/CreatePage";
import EditPage from "../pages/EditPage";
import MainPage from "../pages/MainPage";

interface Route {
    element: React.FC;
    path: string;
}

const routes: Route[] = [
    {
        element: MainPage,
        path: '/',
    },
    {
        element: CreatePage,
        path: '/create',
    },
    {
        element: EditPage,
        path: '/edit/:id',
    }
];

export default routes;
