import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../action/auth'

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarFooter,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';



import fsg from '../../static/fsg.png';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import "../../App.css";
import logo from '../../Assets/logo-no-background.png';



const NavAdminS = () => {
  const state=useSelector(state =>state.auth)
  const dispatch=useDispatch()
  return (
    <div>
       <div className='HeaderDashBoard'>
      <br/>
      <img  style={{marginRight:'100px'}}
            src={logo}
            width="200"
            height="50"
            className="d-inline-block align-center"
            alt="React Bootstrap logo"
          />
        Ecole doctorale - EDSEN : Dashboard
        {state.isAuthenticated ? <button style={{ float: 'right', marginTop: '20px',margin:'0px',fontSize:'15px', background: '#f10001',marginRight:'20px' }} onClick={() => dispatch(logout())} className='nav-link btn btn-danger'>Logout</button>
                : ""}
      </div>


      <div className='sidebar'>
      <CDBSidebar textColor="#333" backgroundColor="aliceblue">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <NavLink to="/change-password" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user" >Profile</CDBSidebarMenuItem>
              </NavLink>            </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
            <NavLink to="/admins/dashboard" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="home"> home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/gerer-actualite" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">gérer Actualite</CDBSidebarMenuItem>
              </NavLink>
              
              <NavLink to="/dashboard-demandes-generales" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user"> Traiter les demandes</CDBSidebarMenuItem>
              </NavLink>
              
              
            </CDBSidebarMenu>
           
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default NavAdminS;