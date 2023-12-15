import React from "react";
import Sidebar from "./comp/Sidebar";
import { Col, Container, FormGroup, Row } from "reactstrap";

import "./index.css"
import { Routes, Route} from "react-router-dom";
import Dash from "./pages/Dash";
import Clients from "./pages/Clients";

const App = () => {
    return (
        <>
            <div className="App">
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<Dash/>}/>
                    <Route path="/clients" element={<Clients/>}/>
                </Routes>
                
            </div>
        </>
    );
};
export default App;