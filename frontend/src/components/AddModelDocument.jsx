import React, { useState } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from "react-redux"
import { postHistorique } from '../services/service';

const AddModelDocument = (props) => {
    const state = useSelector(state => state.auth);

    const [document, setDocument] = useState({
        titre: '',
        description: '',
        admin:'',
        file: ''
    })
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setDocument({
            ...document,
            file: file // Mettre à jour le fichier dans l'état avec le fichier sélectionné
        });
    };
    const handleChange = (e) => {
        if (e.target.name === 'file') {
            // Si le champ est un champ de fichier, utilisez handleFileChange
            handleFileChange(e);
        } else {
            // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
            setDocument({
                ...document,
                [e.target.name]: e.target.value
            })
        }
    };
    const { titre, admin,description, file } = document
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('admin', state.user.login);

        formData.append('file', file);
        Swal.fire({
            title: "Voulez-vous ajouter une Document ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post('http://localhost:8000/bibliotheque/document/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        Swal.fire("Document ajouter ", "", "success")
                        const formData2 = new FormData();
                        formData2.append('user_admin', state.user.login);
                        formData2.append('action', 'a ajouté document :'+titre);
                        postHistorique(formData2)
                        props.onHide();
                    })
                    .catch(err => {
                    });
                setDocument({
                    titre: '',
                    description: '',
                    file: ''
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
                    Remplir les information d'une Document
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <h2>Ajouter une Document</h2>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className='form-group mb-3'>
                                        <label>Titre</label>
                                        <input type='text'
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





export default AddModelDocument
