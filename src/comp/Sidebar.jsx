import React from "react"
import { Outlet, Link , NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt, faMoneyBill, faFileInvoice, faMoneyBill1, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';

import "./Sidebar.css"

export default function Sidebar ()
{

    return <>
        <div className="sidebar">
                <div className="logo-container">
                    <div className="logo">

                    </div>
                </div>
                <div className="nav-container">
                    <NavLink className="nav-item" to={"/"} activeclassname="active">
                        <FontAwesomeIcon icon={faHome} size="2x" />
                    </NavLink>

                   <NavLink className="nav-item" to={"/clients"} activeclassname="active">
                        <FontAwesomeIcon icon={faUser} size="2x" />
                    </NavLink>
 {/* 
                    <NavLink className="nav-item" to={"/loans"} activeclassname="active">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} size="2x" />
                    </NavLink>

                    <NavLink className="nav-item" to={"/reports"} activeclassname="active">
                        <FontAwesomeIcon icon={faFileInvoice} size="2x" />
                    </NavLink>
                    
                    <Link className="nav-item">
                        <FontAwesomeIcon icon={faCog} size="2x" />
                    </Link>
                     */}
                    <NavLink className="nav-item bottom" >
                        <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                    </NavLink>
                </div>
            </div>
    </>
}