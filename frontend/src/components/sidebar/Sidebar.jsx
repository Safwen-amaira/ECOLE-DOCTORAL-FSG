import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { SiChartdotjs } from 'react-icons/si';
import { IoMdNotifications } from 'react-icons/io';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

const Sidebar = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api-notifications/get/notifications/');
        setNotifications(response.data.notifications);
      } catch (error) {
      }
    };

    fetchNotifications();
  }, []);

  const unreadNotifications = notifications.filter(notification => !notification.is_read);
  const limitedNotifications = unreadNotifications.slice(0, 9);

  const handleDashBoard = () => {
    navigate('/dashboard');
  };

  const handleDemandesGenerales = () => {
    navigate('/dashboard-demandes-generales');
  }

  const handleDemandesPreInscriptions = () => {
    navigate('/dashboard-demandes-pre-inscription')
  }

  const handleListeEtudiantbutton = () => {
    navigate('/dashboard-liste-d-etudiants-admin/');
  }
  const handleSettings = () =>{
    navigate('/dashboard-settings-admin')
  }
  return (
    <div className="Sidebar">
      <div className="SidebarContainer">
        <div className="simpel-header-container">
          <center>
            <Dropdown className='dropdown-container'>
              <Dropdown.Toggle className='Dropdown_button' id="dropdown-basic">
                <IoMdNotifications size={30} />
              </Dropdown.Toggle>

              <Dropdown.Menu className='Notification-list'>
                {unreadNotifications.length > 0 ? (
                  unreadNotifications.map((notification, index) => (
                    <Dropdown.Item
                      key={index}
                      className="notification-item unread"
                    >
                      <div className='item-drop-content'>{notification.message}</div>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item className="no-notifications">No unread notifications</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <br />
            <br />
            <p>Welcome to Admin's dashboard</p>
            <SiChartdotjs className="simpel-header" size={120} />
          </center>
        </div>
        <div>
          <button className='Sidebar-item' onClick={handleDashBoard}>DashBoard</button> <br />
          <button className='Sidebar-item' onClick={handleDemandesGenerales}>Demandes Générales</button> <br />
          <button className='Sidebar-item' onClick={handleDemandesPreInscriptions}>Demandes de Pré-inscription</button> <br />
          <button className='Sidebar-item' onClick={handleListeEtudiantbutton}>Liste des chercheurs</button> <br />
          <button className='Sidebar-item' onClick={handleDashBoard}>Paramètres intra-admin </button> <br />
          <button className='Sidebar-item' onClick={handleSettings}>Settings </button> <br />
          <button className='Sidebar-item' onClick={()=>navigate('/new')} > NEW</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
