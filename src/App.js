import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";

export const Login = lazy(() => import('./pages/login'));
export const SignUp = lazy(() => import('./pages/sign-up'));

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<p>Loading ...</p>}>
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
     
    </Routes>
    </Suspense>
  </BrowserRouter>
        
  );
}

export default App;
