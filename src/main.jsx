import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import '@/index.css'
import App from '@/App.jsx'
import CashBack from '@/components/CashBackCalc';
import MilesCalc from '@/components/MilesCalc';
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cashback" element={<CashBack />} />
      <Route path="/miles" element={<MilesCalc />} />
    </Routes>
  </BrowserRouter>,
);
