import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";

export const Login = lazy(() => import('./pages/login'));
export const SignUp = lazy(() => import('./pages/sign-up'));
export const NotFound = lazy(() => import('./pages/not-found'));

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<p>Loading ...</p>}>
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
    </Suspense>
  </BrowserRouter>
        
  );
}

export default App;
