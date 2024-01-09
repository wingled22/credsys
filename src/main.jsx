import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './AppRouter.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AppRouter/>
    </Router>
  </React.StrictMode>,
)
//TODO:Collectors
//TODO:Reports
//TODO: print reciept