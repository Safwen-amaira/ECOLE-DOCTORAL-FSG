import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../action/auth'
import Dropdown from 'react-bootstrap/Dropdown';
import { FaEdit } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
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


const NavAdminF = () => {
  const state = useSelector(state => state.auth)
  const dispatch = useDispatch()
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" id="my-nav">
        <Navbar.Brand className="app-logo" href="/">
          <img
            src={fsg}
            width="40"
            height="50"
            className="d-inline-block align-center"
            alt="React Bootstrap logo"
          />{' '}
          ecole doctorat
        </Navbar.Brand>

      </Navbar>

      <div className='sidebar'>
        <CDBSidebar textColor="#333" backgroundColor="aliceblue">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <NavLink to="/change-password" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user" >Profile</CDBSidebarMenuItem>
              </NavLink>  
          </CDBSidebarHeader>
          <CDBSidebarContent >
            <CDBSidebarMenu >
              <NavLink to="/adminf/dashboard" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="home"> home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/dashboard-demandes-pre-inscription" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user"> Pré-inscriptions</CDBSidebarMenuItem>
              </NavLink>
              <NavLink  to="/dashboard-liste-d-etudiants-admin/" activeclassname="activeClicked">
                <CDBSidebarMenuItem  icon="user">Liste des Etudiants</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/gerer-actualite" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Actualités</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/dashboard-demandes-generales" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user"> Demandes Générales</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/gerer-etablissement" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Parametres etablissement</CDBSidebarMenuItem>
              </NavLink>


              <NavLink to="/gerer-formation" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Parametres formations</CDBSidebarMenuItem>
              </NavLink>


              <NavLink to="/gerer-Labo" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Parametres des Labos. </CDBSidebarMenuItem>
              </NavLink>

              <NavLink to="/gerer-article" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Articles</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/gerer-these" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Thèses</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/gerer-document" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Documents</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/gerer-user" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Utilisateurs</CDBSidebarMenuItem>
              </NavLink>

              <NavLink to="/gerer-directeur" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Parametres Directeur</CDBSidebarMenuItem>
              </NavLink>
              
              <NavLink to="/headerimgsControle" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Appearence</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>

            <CDBSidebarFooter prefix={<i className="fa fa-bars" />}>
              {state.isAuthenticated ? <button style={{ margintop: '0px', marginLeft: '-1px', background: '#f10001' }} onClick={() => dispatch(logout())} className='nav-link btn btn-danger'>Logout</button>
                : ""}
              <Button style={{  margintop: '-10px', marginLeft: '-1px' }} variant="primary" onClick={handleShow}>
                Historique
              </Button>

            </CDBSidebarFooter>
          </CDBSidebarContent>
        </CDBSidebar>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Historique</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup>
              {Historiques && Historiques.map((historique) =>
                <div key={historique.id}>

                  <ListGroup.Item key={historique.id}>
                    {historique.admin_name && <div>Administrateur: {historique.admin_name}</div>}
                    {historique.user_name && <div>Cheurcheur: {historique.user_name}</div>}
                    <div>Action: {historique.action}</div>
                    <div>Date: {historique.date_creation}</div>
                  </ListGroup.Item>
                </div>
              )}

            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default NavAdminF;