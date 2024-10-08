import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { getAdminfUser, getAdminsUser, getAdmintUser, refreshAdminf, refreshAdmins, refreshAdmint } from '../../../action/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import NavBar from '../../NavDashboard/NavBar';
import DetailsDemandeInscriptionModel from '../../DetailsDemandeInscriptionModel';
import Swal from 'sweetalert2';
import ConfirmationModal from './ConfirmationModal';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { getHistoriqueinscri } from '../../../services/service';
import { FaLock } from "react-icons/fa";
const DemandePreInscriptionAdmin = () => {

  // open and close inscription stuff
  const [show, setShow] = useState(false);
  const [OpenPreInscription, setOpenPreInscription] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    setSelectedDate(inputDate);
  };

  const handleSave = () => {
    setShow(false)

    setShowConfirmation(true);
  };

  const handleConfirmSave = () => {
    const requestData = {
      is_open: OpenPreInscription,
      end_date: selectedDate,
      admin:state.user.login
    };

    axios.put('http://127.0.0.1:8000/controlling/preinscription/preinscription/api/', requestData)
      .then(response => {
        console.log('Data saved successfully:', response.data);
        setShowConfirmation(false);
        Swal.fire("modifer avec success", "", "success")
        handleClose();
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
    setShowConfirmation(false);
    handleClose();
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/controlling/preinscription/preinscription/api/getter')
      .then(response => {
        const data = response.data;
        setOpenPreInscription(data.is_open);
        setSelectedDate(data.end_date);
      })
      .catch(error => {
        console.error('Error fetching preinscription data:', error);
      });
  }, []);

  // open and close inscription stuff




  const [cinchercheur, setCinChercheur] = useState('')
  const [addModelShow, setAddMOdelShow] = useState(false)
  const handleAdd = (cin) => {
    setCinChercheur(cin)
    setAddMOdelShow(true);
  };
  let addModelClose = () => setAddMOdelShow(false)

  const dispatch = useDispatch()
  const [Historiques, setHistoriques] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (Historiques.length) {
      return
    }
    getHistoriqueinscri().then(data => {
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
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(refreshAdminf());

    }


    dispatch(getAdminfUser())

  }, [dispatch])
  const state = useSelector(state => state.auth);
  const [demandes, setDemandes] = useState([]);
  const [filter, setFilter] = useState('En attente');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api-chercheur/get_all_inscriptions/');
        setDemandes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const [showc, setShowc] = useState(false);

  const handleClosec = () => setShowc(false);
  const handleShowc = () => setShowc(true);
  const handleredirect = (cin) => {
    var url = `/get-more-info-about-pre-inscription-demande/${cin}/`;
    window.location.href = url;
  };
  if (state.isLoading) {
    return <h3>Loading....</h3>;
  } else if (!state.isAuthenticated || !state.isAdminf) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <NavBar />
        <div className='d-flex p-2'>
          <div className="vstack gap-3">
            <div className="bg-light border">
              <p>filtrer selon</p>
              <select style={{
                padding: '10px', // Add padding
                fontSize: '15px', // Set font size
                border: '1px solid blue', // Add border
                borderRadius: '8px', // Add border radius
              }} on onChange={(e) => setFilter(e.target.value)}>
                <option value='En attente'>En attente</option>
                <option value='Accepted'>Acceptées</option>
                <option value='Refused'>Refusées</option>
              </select>
             
              <button onClick={handleShow} style={{ margin: '-1px', border: '1.5px solid black', marginLeft: '40px', background: 'royalblue', fontSize: '15px', marginBottom: '5px' }}><FaLock style={{ margin: '-1px', width: '10px', marginRight: '3px', marginBottom: '3px' }} />Parametre</button>
              <Button style={{  marginLeft: '10px' }} variant="primary" onClick={handleShowc}>
                Historique
              </Button>
            </div>


            <div style={{
            margin: '4px',
            padding: '4px',
            width: '990px',
            height: '460px',
            overflowX: 'hidden',
            overflowY: 'auto',
            textAlign: 'justify'
          }} className="bg-light border">
              <table style={{ marginLeft: '10px' }}>
                <thead>
                  <tr>
                    <th scope="col">Nom de chercheur</th>
                    <th scope="col">Cin / passport de chercheur</th>
                    <th scope="col">Sujet de thèse</th>
                    <th scope="col">Etablissement</th>
                    <th scope="col">Structure de recherche </th>
                    <th scope="col">Specialité</th>
                    <th scope="col">Etat de demande</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {demandes.map((demande) => (
                  ((demande.State === 'En attente') && (filter === 'En attente')) &&
                  (


                    <tbody>

                      <tr key={demande.id} >

                        <td >{demande.Nom} {demande.Prenom}
                        </td>
                        <td>{demande.cin}</td>

                        <td>{demande.SujetThese} </td>
                        <td>{demande.Etablissement} </td>

                        <td>{demande.StructureRecherche}</td>
                        <td>{demande.specialite}</td>
                        <td>{demande.State} </td>
                        <td>
                          <FaEye
                            className="eyes-icon"
                            color='red'
                            size={15}
                            onClick={() => handleAdd(demande.cin)}
                          />
                          <DetailsDemandeInscriptionModel show={addModelShow} cin={cinchercheur} onHide={addModelClose}></DetailsDemandeInscriptionModel>

                        </td>


                      </tr>

                    </tbody>

                  )
                ))}

                {demandes.map((demande) => (
                  ((demande.State === 'Accepted') && (filter === 'Accepted')) &&
                  (


                    <tbody>
                      <tr className='Table-Content' key={demande.id} >
                        <td>{demande.Nom} {demande.Prenom} </td>
                        <td>{demande.cin}</td>

                        <td>{demande.SujetThese} </td>
                        <td>{demande.StructureRecherche}</td>
                        <td>{demande.specialite}</td>
                        <td>{demande.State} </td>
                        <td><FaEye
                          className="eyes-icon"
                          color='red'
                          size={15}
                          onClick={() => handleAdd(demande.cin)}
                        />
                          <DetailsDemandeInscriptionModel show={addModelShow} cin={cinchercheur} onHide={addModelClose}></DetailsDemandeInscriptionModel>
                        </td>
                      </tr>
                    </tbody>
                  )
                ))}
                {demandes.map((demande) => (
                  ((demande.State === 'Refused') && (filter === 'Refused')) &&
                  (


                    <tbody>
                      <tr className='Table-Content' key={demande.id} >
                        <td>{demande.Nom} {demande.Prenom}</td>
                        <td>{demande.cin}</td>

                        <td>{demande.SujetThese} </td>
                        <td>{demande.StructureRecherche}</td>
                        <td>{demande.specialite}</td>
                        <td>{demande.State} </td>
                        <td><FaEye
                          className="eyes-icon"
                          color='red'
                          size={15}
                          onClick={() => handleAdd(demande.cin)}
                        /> </td>
                        <DetailsDemandeInscriptionModel show={addModelShow} cin={cinchercheur} onHide={addModelClose}></DetailsDemandeInscriptionModel>
                      </tr>
                    </tbody>
                  )
                ))}
              </table>

            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title> Inscription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Ouvrir/Fermer l' inscription :<br />
            <Form>
              <Form.Check
                type="switch"
                defaultChecked={OpenPreInscription}
                id="custom-switch"
                label={OpenPreInscription ? "La pré-inscription est ouverte" : "La pré-inscription est fermée"}
                onChange={() => setOpenPreInscription(!OpenPreInscription)}
              />
            </Form>
            <Form.Group controlId="Date">
              <Form.Label>Fin de l'inscription :</Form.Label>
              <Form.Control
                disabled={!OpenPreInscription}
                type="text"
                placeholder="YYYY-MM-DD"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="primary" onClick={handleSave}>Enregistrer</Button>
          </Modal.Footer>
        </Modal>
        <ConfirmationModal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
          onConfirm={handleConfirmSave}
          message="Êtes-vous sûr de vouloir enregistrer ces modifications ?"
        />

<Offcanvas show={showc} onHide={handleClosec}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Historique</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <ListGroup>
              {Historiques && Historiques.map((historique) =>
                <div key={historique.id}>

                  <ListGroup.Item key={historique.id} style={{ fontSize: '15px' }}>
                    {historique.IDAdmin && <div>Administrateur: {historique.IDAdmin.username}</div>}
                    <div style={{ fontSize: '13px' }}>Action: {historique.action}</div>
                    <div style={{ fontSize: '10px' }}>Date: {historique.date_creation}</div>
                  </ListGroup.Item>
                </div>
              )}

            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    )
  }
};
export default DemandePreInscriptionAdmin
