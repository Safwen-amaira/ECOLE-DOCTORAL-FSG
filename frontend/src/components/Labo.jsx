import React from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Labo = (props) => {
 
 
 

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
                <strong>Type:</strong> {props.labo.type}
              </div>            <div className="col"></div>

              <div className="col">
                <strong>Codelabo:</strong> {props.labo.Codelabo}
              </div>
            </div>

            <div className="row">
              <div className="col">
                <strong>Directeur:</strong> {props.labo.Directeur}
              </div>
              <div className="col"></div>

              <div className="col">
                <strong>Discipline:</strong> {props.labo.Discipline}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>Etablissement:</strong> {props.labo.Etablissement}
              </div>            <div className="col"></div>

              
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

export default Labo
