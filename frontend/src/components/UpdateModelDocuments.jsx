import React, { useState,useEffect } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { postHistorique } from '../services/service';
import {  getAdminfUser,getAdminsUser,getAdmintUser,refreshAdminf,refreshAdmins,refreshAdmint} from '../action/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
const UpdateModelDocuments = (props) => {
    
    const state = useSelector(state => state.auth);

    const [document, setDocument] = useState({
        titre: '',
        description: '',
        file:  ''       
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
    const {titre, description, file } = document
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (titre !== '') {
            formData.append('titre', titre);
        }

        if (description !== '') {
            formData.append('description', description);
        }
      

        if (file) { // Check if file is selected (not empty)
            formData.append('file', file);
        }

        
        Swal.fire({
            title: "Voulez-vous modifier une Document ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://127.0.0.1:8000/bibliotheque/document/' + props.updateddoc.id + '/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        Swal.fire("modifier avec success ","","success");
                        const formData2 = new FormData();
                            formData2.append('admin_name', state.user.login);
                            formData2.append('action', 'a modifié document ('+props.updateddoc.titre+')');
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
                        Fill In Document Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='container'>
                        <h2>Modifier une Document</h2>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className='form-group mb-3'>
                                        <label>Titre</label>
                                        <input type='text'
                                            className='form-control'
                                            name='titre'
                                            defaultValue={props.updateddoc.titre}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>Description</label>
                                        <textarea
                                            className='form-control'
                                            name='description'
                                            defaultValue={props.updateddoc.description}
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




export default UpdateModelDocuments
