import PropTypes from 'prop-types';
import { Outlet, Navigate } from 'react-router-dom';
import * as ROUTES from "../constants/routes";
import React, { useContext } from 'react';
import UserContext from '../context/user';
import LoggedInUserContext from '../context/logged-in-user';
import useAuthListener from '../hooks/use-auth-listener';

export default function PrivateRoute() {

const { user } = useAuthListener();

  
   
        
  return ( 
    user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />
  
    );
   
}


PrivateRoute.propTypes = {
    user: PropTypes.object,
   
  };



