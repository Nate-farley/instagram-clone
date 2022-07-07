import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";

export const Login = lazy(() => import('./pages/login'));

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<p>Loading ...</p>}>
    <Routes>
      <Route path={ROUTES.LOGIN}element={<Login />}>
        <Route path="expenses" element={''} />
        <Route path="invoices" element={''} />
      </Route>
    </Routes>
    </Suspense>
  </BrowserRouter>
        
  );
}

export default App;
