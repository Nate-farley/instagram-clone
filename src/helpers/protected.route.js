import PropTypes from 'prop-types';
import { Outlet, Navigate } from 'react-router-dom';
import * as ROUTES from "../constants/routes";
import React, { useContext } from 'react';
import UserContext from '../context/user';
import LoggedInUserContext from '../context/logged-in-user';
import useAuthListener from '../hooks/use-auth-listener';

export default function PrivateRoute() {

const { user } = useAuthListener();

    console.log(user);
   
        
  return ( 
    user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />
  
    );
    console.log(user);
}






/*
export default function PrivateRoute({ children, ...rest }) {

    const { user } = useContext(UserContext);

    console.log(user);
    return(
        <Outlet 
            {...rest}
            render={({ location }) => {
                if (user) {
                    return children;
                }
                console.log('location', location);
                console.log(user);
                if (!user) {
                    return (
                        <Navigate
                                to={ROUTES.LOGIN}
                                state={{location}}
                            
                            

                        />
                        
                    );
                }
                console.log(user);
                console.log('location', location);
                return null;
            }}
        />
    );
}

*/

PrivateRoute.propTypes = {
    user: PropTypes.object,
   
  };



