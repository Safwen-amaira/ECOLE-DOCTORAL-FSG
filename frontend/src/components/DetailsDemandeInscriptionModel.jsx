import React from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import DemandePreInscriptionAdminDetails from './sidebar/dashboardContent/DemandePreInscriptionAdminDetails';

const DetailsDemandeInscriptionModel = (props) => {
  return (
    <div className='container'        style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
    >
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DemandePreInscriptionAdminDetails cin={props.cin}/>
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

export default DetailsDemandeInscriptionModel
