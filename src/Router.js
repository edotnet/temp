import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Dashboard} from "./pages/Dashboard.page";
import {Drugbank} from "./pages/Drugbank";
import {DrugInteractionPage} from "./pages/DrugInteraction";
import {DTIPage} from "./pages/DTI";
import {DrugbankCategories} from "./pages/DrugbankCategories";
import {Login} from './pages/login/login.page';
import {StartView} from './pages/start.page';
import {NotFoundPage} from './pages/NotFoundPage';
import {HomePage} from './pages/Home';
import {Engine} from "./pages/Engine";
import {SurfacePage} from "./pages/Surface.page";
import {Text2xdlFeature} from "./modules/text2xdl/Text2xdl";
import {SearchFeature} from "./modules/engine/search/search.feature";
import {DrugSynthesisFeature} from "./modules/engine/drug-synthesis/drug-synthesis-feature";
import {Drug2XDLFeature} from "./modules/engine/drug2xdl/Drug2xdl.feature";
import {AuthProvider} from "./infrastructure/authentication/AuthContext";
import { RequireAuth } from "./infrastructure/authentication/RequireAuth";
import { Base } from "./infrastructure/authentication/Base";

export const Router = () => (
  <AuthProvider>
    <Routes>
      <Route index element={<RequireAuth><Dashboard/></RequireAuth>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path="/home" element={<HomePage/>}/>
      <Route element={<RequireAuth><Base /></RequireAuth>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="drugbank" element={<Drugbank/>} />
        <Route path="categories" element={<DrugbankCategories/>}/>
        <Route path="drug-interaction" element={<DrugInteractionPage/>}/>
        <Route path="dti" element={<DTIPage/>}/>
        <Route path="engine" element={<Engine/>}>
          <Route path="search" element={<SearchFeature/>}/>
          <Route path="text2xdl" element={<Text2xdlFeature/>}/>
          <Route path="drugsynthesis" element={<DrugSynthesisFeature/>}/>
          <Route path="drug2xdl" element={<Drug2XDLFeature/>}/>
        </Route>
        <Route path="surface" element={<SurfacePage/>}/>
        <Route path="start" element={<StartView/>}/>
        {/* <Route component={NotFoundPage} />  */}
        <Route path="/404" element={<NotFoundPage/>}/>
        <Route path="*" element={<Navigate replace to="/404"/>}/>
      </Route>
    </Routes>
  </AuthProvider>
);
