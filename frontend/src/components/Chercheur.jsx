import React from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Chercheur = (props) => {
  const [chercheur, setChercheur] = useState([]);
  
  
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Details - Chercheur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
                <strong>Nom:</strong> {props.chercheur.Nom}
              </div>            <div className="col"></div>

              <div className="col">
                <strong>Prénom:</strong> {props.chercheur.Prenom}
              </div>
            </div>

            <div className="row">
              <div className="col">
                <strong>Email:</strong> {props.chercheur.email}
              </div>
              <div className="col"></div>

              <div className="col">
                <strong>Spécialité:</strong> {props.chercheur.specialite}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>Niveau:</strong> {props.chercheur.Niveau}
              </div>            <div className="col"></div>

              <div className="col">
                <strong>Etablissement:</strong> {props.chercheur.Etablissement}
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

export default Chercheur
