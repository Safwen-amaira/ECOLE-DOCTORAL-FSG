import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Sidebar from '../Sidebar';
import Card from 'react-bootstrap/Card';
import './SettingsAdminControleAll.css'
import ConfirmationModal from './ConfirmationModal';
import preinscription from '../../../Assets/pré-inscription.jpg'
import Navigation from '../../Navigation';

const SettingsAdminControleAll = () => {
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
      end_date: selectedDate
    };
  
    axios.put('http://127.0.0.1:8000/controlling/preinscription/preinscription/api/', requestData)
      .then(response => {
        console.log('Data saved successfully:', response.data);
        setShowConfirmation(false);
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

  return (
    <div className='component'>
   
      <div className='titleSettingsAdmins'>      <center> Paramètres ayant une relation avec les etudiants</center>
</div>
      <div className='SettingsContent'>
        <div className='PreInscriptionSettings'>
        <Card style={{ width: '19rem' }}>
      <Card.Img variant="top" src={preinscription} />
      <Card.Body>
        <Card.Title>Paramètres de preinscription</Card.Title>
        <Card.Text>
         vous pouvez ouvrir , fermée les préinscription pour les chercheurs de l'années universitaire courante et définir une date limite
        </Card.Text>
        <Button variant="primary" onClick={handleShow}>
            Paramètres
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title> Pré-inscription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Ouvrir/Fermer la pré-inscription :<br/>
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
                <Form.Label>Fin de la préinscription :</Form.Label>
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
           
      </Card.Body>
    </Card>
   
        </div>



        <div className='InscriptionSettings'>
        <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={preinscription} />
      <Card.Body>
        <Card.Title> Paramètres des inscriptions</Card.Title>
        <Card.Text>
          Vous pouvez ici Ouvrir / Fermer l'Inscriptin des chercheur pour l'années universitaire  courante et définir une date limite
        </Card.Text>


        <Button variant="primary" onClick={handleShow}>
            Paramètres des inscriptions
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title> inscription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Ouvrir/Fermer l'inscription :<br/>
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
                <Form.Label>Fin de la préinscription :</Form.Label>
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
          
      </Card.Body>
    </Card>
</div>


          
      <div  className='InscriptionSettings'>
      <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={preinscription} />
      <Card.Body>
        <Card.Title>Liste des chercheurs</Card.Title>
        <Card.Text>
            Vous pouvez ici voir les  chercheurs qui sont déja inscrient . Vous pouvez également modifier leur informations personnelles ainsi leur contacts
        </Card.Text>
        <Button variant="primary"> Liste des chercheurs</Button>
      </Card.Body>
    </Card>

      </div>
  
  
  </div>
  <div className='titleSettingsAdmins'>      <center> Paramètres ayant une relation avec les Admins</center>
</div>
  <div className='SettingsContent'>
  
        <div className='PreInscriptionSettings'>
        <Card style={{ width: '19rem' }}>
      <Card.Img variant="top" src={preinscription} />
      <Card.Body>
        <Card.Title>Paramètres de preinscription</Card.Title>
        <Card.Text>
         vous pouvez ouvrir , fermée les préinscription pour les chercheurs de l'années universitaire courante et définir une date limite
        </Card.Text>
        <Button variant="primary" onClick={handleShow}>
            Paramètres
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title> Pré-inscription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Ouvrir/Fermer la pré-inscription :<br/>
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
                <Form.Label>Fin de la préinscription :</Form.Label>
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
           
      </Card.Body>
    </Card>
   
        </div>



        <div className='InscriptionSettings'>
        <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={preinscription} />
      <Card.Body>
        <Card.Title> Paramètres des inscriptions</Card.Title>
        <Card.Text>
          Vous pouvez ici Ouvrir / Fermer l'Inscriptin des chercheur pour l'années universitaire  courante et définir une date limite
        </Card.Text>


        <Button variant="primary" onClick={handleShow}>
            Paramètres des inscriptions
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title> inscription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Ouvrir/Fermer l'inscription :<br/>
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
                <Form.Label>Fin de la préinscription :</Form.Label>
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
          
      </Card.Body>
    </Card>
</div>


          
      <div  className='InscriptionSettings'>
      <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={preinscription} />
      <Card.Body>
        <Card.Title>Liste des chercheurs</Card.Title>
        <Card.Text>
            Vous pouvez ici voir les  chercheurs qui sont déja inscrient . Vous pouvez également modifier leur informations personnelles ainsi leur contacts
        </Card.Text>
        <Button variant="primary"> Liste des chercheurs</Button>
      </Card.Body>
    </Card>

      </div>
  
  
  </div>
  </div>
  );
};

export default SettingsAdminControleAll;
