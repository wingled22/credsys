import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import Dash from "./pages/Dash";
import Clients from "./pages/Clients";
import Payment from "./pages/Payment";
import ClientLoans from "./comp/payment/ClientLoans";
import PaymentRegister from "./comp/payment/PaymentRegister.jsx";
import Reports from "./pages/Reports.jsx";
import App from './App.jsx';
import ReportCBU from './reports/ReportCBU.jsx';
import ReportPromisory from './reports/ReportPromisory.jsx';
import Penalty from './pages/Penalty.jsx';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Dash />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/clientloans/:clientId" element={<ClientLoans />} />
                <Route path="/payment/paymentregister/:clientId/:scheduleId" element={<PaymentRegister />} />
                <Route path="/penalty" element={<Penalty />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/cbu" element={<ReportCBU />} />
                <Route path="/reports/promisory/:loanId" element={<ReportPromisory />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;