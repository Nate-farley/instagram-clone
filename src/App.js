import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

export const Login = lazy(() => import('./pages/login'));
export const SignUp = lazy(() => import('./pages/sign-up'));
export const Dashboard = lazy(() => import('./pages/dashboard'));
export const NotFound = lazy(() => import('./pages/not-found'));

function App() {
    const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
    <BrowserRouter>
    <Suspense fallback={<p>Loading ...</p>}>
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  </BrowserRouter>
  </UserContext.Provider>
        
  );
}

export default App;
