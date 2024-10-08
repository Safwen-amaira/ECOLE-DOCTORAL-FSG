import axios from 'axios';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';

import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2';
import { postHistorique } from '../services/service';

import { useSelector } from "react-redux";

const UploadActualite = (props) => {

    
    const state = useSelector(state => state.auth);

    const [actualite, setActualite] = useState({
        titre: '',
        description: '',
        remarque:'',
        file: ''
    })
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setActualite({
            ...actualite,
            file: file // Mettre à jour le fichier dans l'état avec le fichier sélectionné
        });
    };
    const handleChange = (e) => {
        if (e.target.name === 'file') {
            // Si le champ est un champ de fichier, utilisez handleFileChange
            handleFileChange(e);
        } else {
            // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
            setActualite({
                ...actualite,
                [e.target.name]: e.target.value
            })
        }
    };
    const { titre, description,remarque, file } = actualite
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('remarque', remarque);
        formData.append('admin', state.user.login);

        formData.append('description', description);
        formData.append('file', file);
        Swal.fire({
            title: "Voulez-vous ajouter une actualité ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post('http://localhost:8000/actualites/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        Swal.fire("Actualité ajouter ", "", "success")
                        const formData2 = new FormData();
                            formData2.append('admin_name', state.user.login);
                            formData2.append('action', 'a ajouté actualité ('+titre+')');
                            postHistorique(formData2)
                        props.onHide();
                    })
                    .catch(err => {
                    });
            }

        });

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
                    <h2>Ajouter une Actualite</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className='form-group mb-3'>
                                        <label>Titre</label>
                                        <input type='text'
                                           required
                                           className='form-control'
                                            name='titre'
                                            value={titre}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>Description</label>
                                        <textarea
                                            className='form-control'
                                            name='description'
                                            value={description}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Remarque</label>
                                        <input type='text'
                                            className='form-control'
                                            name='remarque'
                                            value={remarque}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>Fichier</label>
                                        <input type='file'
                                            className='form-control-file'
                                            name='file'

                                            onChange={(e) => handleFileChange(e)}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Soumettre</button>
                                </form>
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
    );

}

export default UploadActualite
