import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Navbar, Nav, Button, } from 'reactstrap';
import { FaHome, FaChartBar, FaUsers, FaCog } from 'react-icons/fa'; import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import "./index.css"
import "./ClientSide.css"
import UserContext from "./UserContext";
const ClientSide = () => {

    const { user, setUser } = useContext(UserContext);

    console.log(user)
    if (!user || user.usertype == 1 || user.usertype == 1  || user == undefined) {
        // Redirect to login if no user or usertype is not 1 (admin)
        return <Navigate to="/" />;
      }
    return (
        <>
            <Navbar style={{background:"#aad7e2"}} expand="md">
                <Nav className="mx-auto" navbar>
                    {/* <NavLink href="/" className="mx-3">
                        <Button style={{background:"#eda652"}}> Home</Button>
                    </NavLink> */}
                    <NavLink to="/clients/transactions" className="mx-3">
                        <Button style={{background:"#eda652"}}> Transaction</Button>
                    </NavLink>
                    <NavLink href="/contact">
                        <Button style={{background:"#eda652"}} onClick={(e)=>{
                            e.preventDefault();
                            setUser(null);
                        }}> Logout</Button>
                    </NavLink>
                </Nav>
            </Navbar>
            <Outlet />
        </>
    );
};

export default ClientSide;
