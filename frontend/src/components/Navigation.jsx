import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../action/auth'
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import "./public/styles/Navigations.css"
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarFooter,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { FaEdit } from 'react-icons/fa';

import axios from 'axios';

import fsg from '../static/fsg.png';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import "../App.css";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getHistorique, getNotification, getNotificationcount } from '../services/service';
import Dropdown from 'react-bootstrap/Dropdown';
import EDSENLogo from '../Assets/logo-no-background.png'
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const [Historiques, setHistoriques] = useState([]);
  const [Notifications, setNotifications] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false)

  const [counter, setcounter] = useState({});

  useEffect(() => {
    let mounted = true;
    if (Historiques.length) {
      return
    }
    getHistorique().then(data => {
      if (mounted) {
        const sortedhis = data.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));

        setHistoriques(sortedhis)
      }
    })
    return () => {
      mounted = false
    };
  }, [Historiques]);

  
    useEffect(() => {
      let mounted = true;
      if (Notifications.length && !isUpdated) {
          return
      }
      getNotification().then(data => {
        if (mounted) {
          const sortedNotifications = data.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
          setNotifications(sortedNotifications);
        }
      })
      return () => {
          mounted = false
          setIsUpdated(false)
      };
  }, [isUpdated, Notifications]);

  
  useEffect(() => {
    let mounted = true;
    if (Notifications.length && !isUpdated) {
        return
    }
    getNotificationcount().then(data => {
        if (mounted) {
          setcounter(data)
        }
    })
    return () => {
        mounted = false
        setIsUpdated(false)
    };
}, [isUpdated, counter]);
 
  const handleVu = () => {
    axios.put('http://127.0.0.1:8000/notification/get/')
    setIsUpdated(true)
  };
  const state = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
 
  
  return (
    <div>
      <div className='HeaderDashBoard'>
        <br />
        <img style={{ height: '60px', width: '300px',marginLeft:'50px', marginRight: '90px' }} src={EDSENLogo} alt='ZDSEN logo' />
        Ecole doctorale - EDSEN : Dashboard

        <span ><Dropdown style={{ float: 'right', marginLeft: '10px' }}>
          <Dropdown.Toggle style={{ float: 'right', marginright: '40px' }} variant="light" id="dropdown-basic">
            <i className="fas fa-bell"></i> <span style={{ fontSize: '10px', marginLeft: '-1px' }} className="badge rounded-pill badge-notification bg-danger">{counter.count}</span>  </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item >
              <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '400px', width: '600px' }}>
                <ListGroup>
                <Button onClick={handleVu} style={{ margin: '0px', width: '100%' }}>Tout marquer comme vu</Button>
                {Notifications && Notifications.map((Notification) =>
                  <div key={Notification.id} >
                    <ListGroup.Item
                      key={Notification.id}
                      
                      style={{ background: Notification.state === "non-vu" ? 'lightblue' : 'white' }}
                    >
                      <div
                         style={{ fontSize: '13px' }}>
                        Chercheur: {Notification.user} {Notification.action}
                      </div>
                      <div style={{ fontSize: '10px' }}>
                        Date: {formatDate(Notification.date_creation)}
                      </div>
                       
                    </ListGroup.Item>
                    
                  
                  </div>
                )}

              </ListGroup></div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {state.isAuthenticated ? <button style={{ float: 'right', marginTop: '25px',margin:'0px',fontSize:'15px', background: '#f10001' }} onClick={() => dispatch(logout())} className='nav-link btn btn-danger'>Logout</button>
                : ""}
                 <Button style={{  float: 'right', marginTop: '25px',margin:'0px', }} variant="primary" onClick={handleShow}>
                Historique
              </Button></span>
       
      </div>

      <div className='sidebar'>
        <CDBSidebar textColor="#333" backgroundColor="aliceblue">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            <NavLink to="/change-password" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user" >Profile</CDBSidebarMenuItem>
            </NavLink>

            Dashboard
          </CDBSidebarHeader>
          <CDBSidebarContent >
            <CDBSidebarMenu >
            <NavLink to="/adminf/dashboard" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="home"> home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/dashboard-demandes-pre-inscription" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user"> Inscriptions</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/dashboard-liste-d-etudiants-admin/" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Liste des Etudiants</CDBSidebarMenuItem>
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

                  <ListGroup.Item key={historique.id} style={{ fontSize: '15px' }}>
                    {historique.admin_name && <div>Administrateur: {historique.admin_name.username}</div>}
                    {historique.user_name && <div>Cheurcheur: {historique.user_name}</div>}
                    <div style={{ fontSize: '13px' }}>Action: {historique.action}</div>
                    <div style={{ fontSize: '10px' }}>Date: {historique.date_creation}</div>
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

export default Navigation;