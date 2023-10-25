import { NavLink, Outlet } from "react-router-dom";
import { FaCartPlus, FaHome, FaProductHunt, FaUser } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import Navbar from "../Shared/Navbar/Navbar";
import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../Provider/AuthProvider";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const { user } = useContext(AuthContext);
    return (
        <>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content lg:m-10 items-center justify-center">
                    <Outlet></Outlet>
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <Slide direction="left" triggerOnce>
                        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                            {isAdmin ? (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/manageUsers">
                                            <FaUser className="mr-2" />
                                            Manage Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addProducts">
                                            <FaProductHunt className="mr-2" />
                                            Add Products
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manageProducts">
                                            <FaProductHunt className="mr-2" />
                                            Manage Products
                                        </NavLink>
                                    </li>
                                    <div className="divider"></div>
                                    <li>
                                        <NavLink to="/">
                                            <FaHome className="mr-2" />
                                            Home
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/cart">
                                            <FaCartPlus className="mr-2" />
                                            Cart
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/checkout">
                                            <FaCartPlus className="mr-2" />
                                            Checkout
                                        </NavLink>
                                    </li>
                                    <div className="divider"></div>
                                    <li>
                                        <NavLink to="/">
                                            <FaHome className="mr-2" />
                                            Home
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </Slide>
                </div>
            </div>
        </>
    );
};

export default Dashboard;