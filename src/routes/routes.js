import CreatePage from "../pages/CreatePage";
import EditPage from "../pages/EditPage";
import MainPage from "../pages/MainPage";

const routes = [
    {
        element: <MainPage />,
        path: '/',
    },
    {
        element: <CreatePage />,
        path: '/create',
    },
    {
        element: <EditPage />,
        path: '/edit',
    }
]

export default routes