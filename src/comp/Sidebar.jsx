import React, { useContext } from "react"
import { Outlet, Link, NavLink , Navigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt, faMoneyBill, faFileInvoice, faMoneyBill1, faMoneyBill1Wave, faCashRegister, faUsers, faWarning } from '@fortawesome/free-solid-svg-icons';

import "./Sidebar.css"
import UserContext from "../UserContext";

export default function Sidebar() {
    const { user, setUser } = useContext(UserContext);

    if (!user || user.usertype == 3  || user == undefined) {
        // Redirect to login if no user or usertype is not 1 (admin)
        return <Navigate to="/" />;
      }
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

                {/* 
                     <NavLink className="nav-item" to={"/reports"} activeclassname="active">
                        <FontAwesomeIcon icon={faFileInvoice} size="2x" />
                    </NavLink>
                    
                    <Link className="nav-item">
                        <FontAwesomeIcon icon={faCog} size="2x" />
                    </Link>
                */}
                
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