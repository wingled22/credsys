import React, { useMemo, useState } from 'react';
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
import RemittanceReport from './reports/RemittanceReport.jsx';
import UserContext from './UserContext.jsx';
import Login from './Login.jsx';
import ClientSide from './ClientSide.jsx';
import ItineraryReport from './Itinerary.jsx';
import ClientTransactions from './ClientTransaction.jsx';
import TransactionReport from './reports/TransactionReport.jsx';

const AppRouter = () => {
    const [user, setUser] = useState(null);

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <UserContext.Provider value={value}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" exact element={<App />}>
                    <Route  index  element={<Dash />} />
                    <Route path="/admin/clients" element={<Clients />} />
                    <Route path="/admin/payment" element={<Payment />} />
                    <Route path="/admin/payment/clientloans/:clientId" element={<ClientLoans />} />
                    <Route path="/admin/payment/paymentregister/:clientId/:scheduleId" element={<PaymentRegister />} />
                    <Route path="/admin/penalty" element={<Penalty />} />
                    <Route path="/admin/penalized" element={<Penalized />} />
                    <Route path="/admin/penalized/paymentregister/:clientId/:loanId" element={<PenaltyPaymentRegister />} />
                    <Route path="/admin/reports" element={<Reports />} />
                    <Route path="/admin/reports/cbu" element={<ReportCBU />} />
                    <Route path="/admin/reports/insurance" element={<ReportInsurance />} />
                    <Route path="/admin/reports/delinquent" element={<DelinquentReport />} />
                    <Route path="/admin/reports/transaction" element={<TransactionReport />} />
                    <Route path="/admin/reports/ItineraryReport" element={<ItineraryReport />} />
                    <Route path="/admin/reports/remittance" element={<RemittanceReport />} />
                    <Route path="/admin/reports/promisory/:loanId" element={<ReportPromisory />} />
                    <Route path="/admin/reports/reciept/:transId" element={<Reciept />} />
                </Route>

                <Route path='/clients' element={<ClientSide/>}>
                <Route path='/clients/transactions' element={<ClientTransactions />} />

                    
                </Route> 

                    
            </Routes>
        </UserContext.Provider>
    );
}

export default AppRouter;