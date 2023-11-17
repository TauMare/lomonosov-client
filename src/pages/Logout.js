import * as React from 'react';
import validate from '../Components/auth';
import { Navigate } from 'react-router-dom';

export default function Logout(){
    if(validate()){
        localStorage.removeItem('Authentication')
        return (
            <Navigate to="/" replace={true} />
        )
    } else{
        return (
            <Navigate to="/" replace={true} />
        )
    }
}