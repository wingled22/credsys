import React from "react";
import Sidebar from "./comp/Sidebar";
import { Col, Container, FormGroup, Row } from "reactstrap";

import 'toastr/build/toastr.min.css';
import "./index.css"
import { Routes, Route, Outlet} from "react-router-dom";

const App = ({children}) => {
    return (
        <>
            <div className="App">
                <Sidebar/>
                <Outlet/>
                {children}
            </div>
        </>
    );
};
export default App;