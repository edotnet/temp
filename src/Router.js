import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from "./pages/Dashboard.page";
import { Drugbank } from "./pages/Drugbank";
import { DrugInteractionPage } from "./pages/DrugInteraction";
import { DTIPage } from "./pages/DTI";
import { DrugbankCategories } from "./pages/DrugbankCategories";

export const Router = () => (
  <Routes>
    <Route index element={<Dashboard/>}/>
    <Route path="drugbank">
      {/*<Route path="value_calculator" element={<ValueCalculator/>}/> */}
      <Route path="" element={<Drugbank/>}/>
      {/*<Route path="categories" element={<DrugbankCategories/>}/>*/}
    </Route>
    <Route path="categories" element={<DrugbankCategories/>}/>
    <Route path="drug-interaction" element={<DrugInteractionPage />}/>
    <Route path="dti" element={<DTIPage />}/>
  </Routes>
);
