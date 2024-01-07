import React from "react"
import { Outlet, Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt, faMoneyBill, faFileInvoice, faMoneyBill1, faMoneyBill1Wave, faCashRegister, faUsers, faWarning } from '@fortawesome/free-solid-svg-icons';

import "./Sidebar.css"

export default function Sidebar() {

    return <>
        <div className="sidebar">
            <div className="logo-container">
                <div className="logo">

                </div>
            </div>
            <div className="nav-container">
                <NavLink className="nav-item" to={"/"} activeclassname="active">
                    <FontAwesomeIcon icon={faHome} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/clients"} activeclassname="active">
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/payment"} activeclassname="active">
                    <FontAwesomeIcon icon={faCashRegister} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/penalty"} activeclassname="active">
                    <FontAwesomeIcon icon={faWarning} size="lg" />
                </NavLink>

                <NavLink className="nav-item" to={"/reports"} activeclassname="active">
                    <FontAwesomeIcon icon={faFileInvoice} size="lg" />
                </NavLink>

                {/* 
                     <NavLink className="nav-item" to={"/reports"} activeclassname="active">
                        <FontAwesomeIcon icon={faFileInvoice} size="2x" />
                    </NavLink>
                    
                    <Link className="nav-item">
                        <FontAwesomeIcon icon={faCog} size="2x" />
                    </Link>
                */}
                
                <NavLink className="nav-item bottom" >
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                </NavLink>
            </div>
        </div>
    </>
}