import React from "react";
import Sidebar from "./comp/Sidebar";
import { Col, Container, FormGroup, Row } from "reactstrap";

import 'toastr/build/toastr.min.css';
import "./index.css"
import { Routes, Route} from "react-router-dom";
import Dash from "./pages/Dash";
import Clients from "./pages/Clients";
import Payment from "./pages/Payment";
import ClientLoans from "./comp/payment/ClientLoans";
import PaymentRegister from "./comp/payment/PaymentRegister.jsx";

const App = () => {
    return (
        <>
            <div className="App">
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<Dash/>}/>
                    <Route path="/clients" element={<Clients/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                    <Route path="/payment/clientloans/:clientId" element={<ClientLoans/>}/>
                    <Route path="/payment/paymentregister/:clientId/:scheduleId" element={<PaymentRegister/>}/>

                </Routes>
                
            </div>
        </>
    );
};
export default App;