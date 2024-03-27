import React from 'react'
import { Outlet, Navigate } from 'react-router';
import {UserAuthStatus} from '../../hooks/userAuthStatus';
import Spinner from './Spinner';

export default function PrivateRoute() {
    const {loggedIn, checkingStatus} = UserAuthStatus(); 

    if(checkingStatus){
        return (
            <div>
                <Spinner />
            </div>
        )
    }
  return loggedIn ? <Outlet/> : <Navigate to="/sign-in/" />;
}
