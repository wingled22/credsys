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
import Penalized from './pages/Penaiized.jsx';
import PenaltyPaymentRegister from './comp/payment/PenaltyPaymentRegister.jsx';
import Reciept from './reports/Reciept.jsx';
import ReportInsurance from './reports/ReportInsurance.jsx';
import DelinquentReport from './reports/DelinquentReport.jsx';

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
                <Route path="/penalized" element={<Penalized />} />
                <Route path="/penalized/paymentregister/:clientId/:loanId" element={<PenaltyPaymentRegister />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/cbu" element={<ReportCBU />} />
                <Route path="/reports/insurance" element={<ReportInsurance />} />
                <Route path="/reports/delinquent" element={<DelinquentReport />} />
                <Route path="/reports/promisory/:loanId" element={<ReportPromisory />} />
                <Route path="/reports/reciept/:transId" element={<Reciept />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;