import React, { useContext } from "react"
import { Outlet, Link, NavLink, Navigate, useMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt, faMoneyBill, faFileInvoice, faMoneyBill1, faMoneyBill1Wave, faCashRegister, faUsers, faWarning } from '@fortawesome/free-solid-svg-icons';

import "./Sidebar.css"
import UserContext from "../UserContext";

export default function Sidebar() {

    const { user, setUser } = useContext(UserContext);
    if (!user || user.usertype == 3 || user == undefined) {
        // Redirect to login if no user or usertype is not 1 (admin)
        return <Navigate to="/" />;
    }

    const isActive = (path) => {
        return window.location.pathname === path || window.location.pathname.startsWith(path);
    };

    const CustomNavLink = ({ to, children, icon }) => {
        const match = useMatch(to);
      
        return (
          <Link className={`nav-item ${match ? 'active' : ''}`} to={to}>
            <FontAwesomeIcon icon={icon} size="lg" />
            {children}
          </Link>
        );
      };


    return <>
        <div className="sidebar">
            <div className="logo-container">
                <div className="logo">

                </div>
            </div>
            <div className="nav-container">
                <CustomNavLink to="/admin" icon={faHome}/>

                <NavLink className="nav-item" to={"/admin/clients"} activeClassName="active" isActive={() => isActive('/admin/clients')}>
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/admin/payment"} activeClassName="active">
                    <FontAwesomeIcon icon={faCashRegister} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/admin/penalty"} activeClassName="active">
                    <FontAwesomeIcon icon={faWarning} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/admin/reports"} activeClassName="active">
                    <FontAwesomeIcon icon={faFileInvoice} size="lg" />
                </NavLink>



                <NavLink className="nav-item bottom" >
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" onClick={(e) => {
                        e.preventDefault();
                        setUser(null);

                    }} />
                </NavLink>
            </div>
        </div>
    </>
}