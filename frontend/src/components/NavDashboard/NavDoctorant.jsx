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
import "../public/styles/Navigations.css"



import logo from '../../Assets/logo-no-background.png';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import "../../App.css";


const NavDoctorant = () => {
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
            alt="ZDSEN  logo"
          />
        Ecole doctorale - EDSEN : Dashboard
        {state.isAuthenticated ? <button style={{ float: 'right', marginTop: '20px',margin:'0px',fontSize:'15px', background: '#f10001',marginRight:'20px' }} onClick={() => dispatch(logout())} className='nav-link btn btn-danger'>Logout</button>
                : ""}
      </div>

      <div className='sidebar'>
        <CDBSidebar textColor="#333" backgroundColor="aliceblue">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <NavLink to="/profile" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user" >Profile</CDBSidebarMenuItem>
              </NavLink>
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
            <NavLink to="/doctorant/dashboard" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="home"> home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/demandes-chercheur" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="home">Dispose Demande</CDBSidebarMenuItem>
              </NavLink>
              
              
              <NavLink to="/add-formation" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Ajouter formation</CDBSidebarMenuItem>
              </NavLink>                        
              <NavLink to="/add-these" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Ajouter These</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/add-article" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Ajouter article</CDBSidebarMenuItem>
              </NavLink>

              
              
            </CDBSidebarMenu>
            <CDBSidebarFooter prefix={<i className="fa fa-bars" />}>
             
            </CDBSidebarFooter>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default NavDoctorant;