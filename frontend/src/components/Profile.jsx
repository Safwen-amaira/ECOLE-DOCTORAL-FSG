import React, { useState, useEffect } from 'react'
import { getDoctorantUser, refreshDoctorant } from '../action/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom';
import ChecheurProfile from './ChecheurProfile';
const Profile = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshDoctorant());

        }


        dispatch(getDoctorantUser())

    }, [dispatch])
    const state = useSelector(state => state.auth);
    if (state.isLoading) {
        return <h3>Loading....</h3>;
    } else if (!state.isAuthenticated || !state.isDoctorant) {
        return <Navigate to="/login" />;
    } else {return (
    <div>
      <h1 style={{marginLeft:'300px'}}>Profile chercheur </h1>
      <ChecheurProfile cin={state.user.login}/>
    </div>
  )
}
}

export default Profile
