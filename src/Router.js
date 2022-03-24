import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from "./pages/Dashboard.page";
import { Drugbank } from "./pages/Drugbank";

export const Router = () => (
  <Routes>
    <Route index element={<Dashboard/>}/>
    <Route path="drugbank">
      {/*<Route path="value_calculator" element={<ValueCalculator/>}/> */}
      <Route path="" element={<Drugbank/>}/>
    </Route>
  </Routes>
);
