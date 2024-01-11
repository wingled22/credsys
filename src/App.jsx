import React, { useContext } from "react";
import Sidebar from "./comp/Sidebar";
import { Col, Container, FormGroup, Row } from "reactstrap";

import 'toastr/build/toastr.min.css';
import "./index.css"
import { Routes, Route, Outlet, Navigate} from "react-router-dom";

import UserContext from "./UserContext";

const App = ({children}) => {


    const { user, setUser } = useContext(UserContext);
    if (!user || user.usertype == 3 || user == undefined) {
        // Redirect to login if no user or usertype is not 1 (admin)
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="App">
                <Sidebar/>
                <Outlet/>
            </div>
        </>
    );
};
export default App;