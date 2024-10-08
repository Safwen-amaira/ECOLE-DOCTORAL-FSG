import React, { useState,useEffect } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { postHistorique } from '../services/service';

import { useSelector } from "react-redux"
const UpdateModelActualite = (props) => {
    
    const state = useSelector(state => state.auth);

    const [actualite, setActualite] = useState({
        titre: '',
        description: '',
        remarque:'',
        file:  ''       
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
    const { titre, description, remarque,file} = actualite
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (titre.trim() !== '') {
            formData.append('titre', titre);
        }
        if (remarque.trim() !== '') {
            formData.append('remarque', remarque);
        }

        if (description.trim() !== '') {
            formData.append('description', description);
        }

        if (file) { // Check if file is selected (not empty)
            formData.append('file', file);
        }
        formData.append('admin', state.user.login);
        
        Swal.fire({
            title: "Voulez-vous modifier cette actualité ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put('http://127.0.0.1:8000/actualites/' + props.updatedact.id + '/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        Swal.fire("modifier avec success ","","success");
                        const formData2 = new FormData();
                            formData2.append('admin_name', state.user.login);
                            formData2.append('action', 'a modifié actualité ('+props.updatedact.titre+')');
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
                    <h2>Modifier une Actualite</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className='form-group mb-3'>
                                        <label>titre</label>
                                        <input type='text'
                                            className='form-control'
                                            name='titre'
                                            defaultValue={props.updatedact.titre}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Remarque</label>
                                        <input type='text'
                                            className='form-control'
                                            name='remarque'
                                            defaultValue={props.updatedact.remarque}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>description</label>
                                        <input type='text'
                                            className='form-control'
                                            name='description'
                                            defaultValue={props.updatedact.description}
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
    )
}






export default UpdateModelActualite
