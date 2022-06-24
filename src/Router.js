import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from "./pages/Dashboard.page";
import { Drugbank } from "./pages/Drugbank";
import { DrugInteractionPage } from "./pages/DrugInteraction";
import { DTIPage } from "./pages/DTI";
import { DrugbankCategories } from "./pages/DrugbankCategories";
import { Login } from './pages/login/login.page';
import { StartView } from './pages/start.page';
import { Drugshot } from "./pages/Drugshot";
import { NotFoundPage }  from './pages/NotFoundPage';
import { HomePage } from './pages/Home';
import { Engine } from "./pages/Engine";
import { SurfacePage } from "./pages/Surface.page";
import {Text2xdlFeature} from "./modules/text2xdl/Text2xdl";

export const Router = () => (
  <Routes>
    {/* <Route index element={<Dashboard/>}/> */}
    <Route exact path='/login' element ={<Login/>} />
    <Route exact path="/home" element = {<HomePage/>} />
    <Route path="dashboard" element={<Dashboard/>}/>
    <Route path="drugbank">
      {/*<Route path="value_calculator" element={<ValueCalculator/>}/> */}
      <Route path="" element={<Drugbank/>}/>
      {/*<Route path="categories" element={<DrugbankCategories/>}/>*/}
    </Route>
    <Route path="categories" element={<DrugbankCategories/>}/>
    <Route path="drug-interaction" element={<DrugInteractionPage />}/>
    <Route path="dti" element={<DTIPage />}/>
    <Route path="engine/*" element={<Engine />}/>
    <Route path="surface" element={<SurfacePage />}/>
    <Route path="start" element={<StartView/>} />
    {/* <Route component={NotFoundPage} />  */}
    <Route path="/404" element={<NotFoundPage />} />
    <Route path="*" element={<Navigate replace to="/404" />} />
    <Route path="/" element={<Navigate replace to="/login" />} />
  </Routes>
);
