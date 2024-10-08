import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { postHistorique } from '../services/service';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
const FormationSimpleModal = (props) => {
    const formation = props.updatedformation;
    const handleDeleteSimple = (e, id) => {
        //if(window.confirm('Are you sure ?')){
        e.preventDefault();
        Swal.fire({
            title: "Voulez-vous supprimer cette formation ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/formation/simple/' + id + '/')
                    .then((result) => {
                        Swal.fire("Supptimer avec success", "", "success")
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé formation ');
                        postHistorique(formData2)
                        props.setUpdated(true)

                    },
                        (error) => {
                            Swal.fire("echec !!! ");
                        })
                    .then(response => {
                    })
                    .catch(err => {
                    });
            }

        });


    };
    const handleUpdateSimple = (e, formation) => {
        e.preventDefault();
        const formData = new FormData();
        if (formation.state == 'Validé') {
            formData.append('state', 'Non-Validé');
        } else {
            formData.append('state', 'Validé');
        }


        Swal.fire({
            title: "Voulez-vous modifier  State de cette formation ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://127.0.0.1:8000/formation/simple/' + formation.id + '/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        Swal.fire("modifier avec success ", "", "success");
                        props.setUpdated(true)
                    })
                    .catch(err => {
                    });
            }

        });


    };
    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };

    return (
        <div className='container'>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Formation Simple
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <h2>Details</h2>
                        <div style={{ marginLeft: '10px' }}>

                            <div >
                                <p> {formation.chercheur ? (
                                    <p><p><strong>Nom:</strong> {formation.chercheur.Nom}</p>
                                        <p><strong>Prénom:</strong> {formation.chercheur.Prenom}</p>
                                        <p><strong>CIN:</strong> {formation.chercheur.cin}</p>
                                        <p><strong>Niveau:</strong>{formation.chercheur.Niveau&& <p>{formation.chercheur.Niveau}</p>}</p>
                                        <p><strong>Téléphone:</strong> {formation.chercheur.Niveau&& <p>{formation.chercheur.tel}</p>}</p>
                                        <p><strong>Email:</strong> {formation.chercheur.Niveau&& <p>{formation.chercheur.email}</p>}</p>
                                        <p><strong>Spécialité:</strong> {formation.chercheur.Niveau&& <p>{formation.chercheur.specialite}</p>}</p>
                                    </p>) : null}</p>

                                <p><strong>Nom de la formation:</strong> {formation.nom_formation}</p>
                                <p><strong>Nom du formateur:</strong> {formation.nom_formateur}</p>
                                <p><strong>Lieu de formation:</strong> {formation.lieu_formation}</p>
                                <p><strong>Nombre d'heures:</strong> {formation.nombre_heure}</p>
                                <p><strong>Type:</strong> {formation.type}</p>
                                <p><strong>Date de début:</strong> {formation.date_debut}</p>
                                <p><strong>Date de fin:</strong> {formation.date_fin}</p>
                                <p><strong>Date de création:</strong> {formation.date_creation}</p>
                                <p><strong>État:</strong> {formation.state}</p>
                                {formation.file && (
                                    <div>
                                        <strong>Certificat :    </strong>
                                        <FaDownload
                                            className="download-icon"
                                            onClick={() => forceDownload(formation.file)}
                                        />
                                    </div>
                                )}<p><strong>Action :<span style={{ marginLeft: "20px" }}></span></strong>
                                    <FaTrash
                                        className="trash-icon"
                                        size={15}
                                        onClick={event => handleDeleteSimple(event, formation.id)}
                                    /> <span style={{ marginLeft: "20px" }}></span>
                                    <FaEdit
                                        className="edit-icon"
                                        size={15}
                                        onClick={event => handleUpdateSimple(event, formation)}
                                    />

                                </p>

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






export default FormationSimpleModal
