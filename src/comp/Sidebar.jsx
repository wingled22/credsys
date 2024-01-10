import React, { useContext } from "react"
import { Outlet, Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt, faMoneyBill, faFileInvoice, faMoneyBill1, faMoneyBill1Wave, faCashRegister, faUsers, faWarning } from '@fortawesome/free-solid-svg-icons';

import "./Sidebar.css"
import UserContext from "../UserContext";

export default function Sidebar() {
    const { user, setUser } = useContext(UserContext);

    
    return <>
        <div className="sidebar">
            <div className="logo-container">
                <div className="logo">

                </div>
            </div>
            <div className="nav-container">
                <NavLink className="nav-item" to={"/admin/dash"} activeclassname="active">
                    <FontAwesomeIcon icon={faHome} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/admin/clients"} activeclassname="active">
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/admin/payment"} activeclassname="active">
                    <FontAwesomeIcon icon={faCashRegister} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/admin/penalty"} activeclassname="active">
                    <FontAwesomeIcon icon={faWarning} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/admin/reports"} activeclassname="active">
                    <FontAwesomeIcon icon={faFileInvoice} size="lg" />
                </NavLink>

           
                
                <NavLink className="nav-item bottom" >
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" onClick={(e)=> {
                        e.preventDefault();
                        setUser(null);

                    }}/>
                </NavLink>
            </div>
        </div>
    </>
}