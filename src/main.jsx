import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import '@/index.css'
import App from '@/App.jsx'
import BankCho from '@/components/shared/BankCho';
// import CashBack from './CashBack';

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<App />} />
      {/* <Route path="/cashback" element={<CashBack />} /> */}
      <Route path='/bank/:bankId' element={<BankCho/>}></Route>
    </Routes>
  </BrowserRouter>,
);
