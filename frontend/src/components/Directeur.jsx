import React from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getdirecteursid } from '../services/service';
const Directeur = (props) => {
  const [directeur, setDirecteur] = useState([]);
  const did= props.directeur.id
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/directeur/id/' + did + '/')
      .then(response => {
        setDirecteur(response.data);
      })
      .catch(error => {
        // Handle error, e.g., set an error state
      });
  }, [did]);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Details - Directeur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
                <strong>Nom:</strong> {directeur.nom}
              </div>            <div className="col"></div>

              <div className="col">
                <strong>Prénom:</strong> {directeur.prenom}
              </div>
            </div>

            <div className="row">
              <div className="col">
                <strong>Email:</strong> {directeur.email}
              </div>
              <div className="col"></div>

              <div className="col">
                <strong>Spécialité:</strong> {directeur.specialite}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>Grade:</strong> {directeur.grade}
              </div>            <div className="col"></div>

              <div className="col">
                <strong>Lieu de Travail:</strong> <p>{directeur.lieuTravail ? (
                  <p>{directeur.lieuTravail.Codelabo} / {directeur.lieuTravail.Discipline}</p>
                ) : null}</p>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" onClick={props.onHide}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Directeur
