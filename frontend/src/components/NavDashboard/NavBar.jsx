import React from 'react'
import NavAdminF from './NavAdminF'
import NavAdminS from './NavAdminS'
import NavAdminT from './NavAdminT'
import NavDoctorant from './NavDoctorant'
import { getDoctorantUser ,getAdminfUser,getAdminsUser,getAdmintUser,refreshDoctorant,refreshAdminf,refreshAdmins,refreshAdmint} from '../../action/auth'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import Navigation from '../Navigation'

const NavBar = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(refreshDoctorant());
        dispatch(refreshAdminf());
        dispatch(refreshAdmins());
        dispatch(refreshAdmint());


  
    }
      dispatch(getDoctorantUser())
      dispatch(getAdminfUser())
      dispatch(getAdminsUser())
      dispatch(getAdmintUser())


        
    }, [dispatch])
    const state = useSelector(state => state.auth);
    if (state.isAdminf && state.isAuthenticated) {
        return <Navigation />
    } else if (state.isAdmins && state.isAuthenticated) {
        return <NavAdminS />
    } else if (state.isAdmint && state.isAuthenticated) {
        return <NavAdminT />
    } else if (state.isDoctorant && state.isAuthenticated) {
        return <NavDoctorant />
}
}
export default NavBar
