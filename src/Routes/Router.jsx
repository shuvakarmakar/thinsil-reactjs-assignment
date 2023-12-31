import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Error from "../Pages/Error/Error";
import Dashboard from "../Layout/Dashboard";
import ManageProducts from "../Pages/Dashboard/Admin Dashboard/ManageProducts";
import AddProducts from "../Pages/Dashboard/Admin Dashboard/AddProducts";
import Cart from "../Pages/Dashboard/UserDashboard/Cart";
import Home from "../Pages/Home/Home/Home";
import ProductDetails from "../Pages/Home/Products/ProductDetails";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signup",
                element: <Signup></Signup>
            },
            {
                path: "product/:id",
                element: <ProductDetails></ProductDetails>
            }
        ]
    },
    {
        path: "*",
        element: <Error></Error>
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            // Admin Route
            {
                path: 'addProducts',
                element: <AddProducts></AddProducts>
            },
            {
                path: 'manageProducts',
                element: <ManageProducts></ManageProducts>
            }
        ]
    },

]);