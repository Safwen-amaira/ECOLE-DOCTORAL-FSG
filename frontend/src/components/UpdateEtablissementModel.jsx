import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { postHistorique } from '../services/service';

import { useSelector } from "react-redux"
const UpdateEtablissementModel = (props) => {
    
    const state = useSelector(state => state.auth);

    const [etablissement, setEtablissement] = useState({
        nom: '',
        description: '',
        email: '',
        tel: '',
        fax: '',
        logo: null
    });

    const handleChange = (e) => {
        if (e.target.name === 'logo') {
            setEtablissement({
                ...etablissement,
                [e.target.name]: e.target.files[0]
            });
        } else {
            // Otherwise, update other fields as usual
            setEtablissement({
                ...etablissement,
                [e.target.name]: e.target.value
            });
        }
    };
    const { nom, description, logo, email, tel, fax } = etablissement

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a FormData object to send file and other form data
        const formData = new FormData();
        if (nom.trim() !== '') {
            formData.append('nom', etablissement.nom);
        }

        if (description.trim() !== '') {
            formData.append('description', etablissement.description);
        }

        if (email.trim() !== '') {
            formData.append('email', etablissement.email);
        }

        if (tel.trim() !== '') {
            formData.append('tel', etablissement.tel);
        }

        if (fax.trim() !== '') {
            formData.append('fax', etablissement.fax);
        }

        if (logo !== null) {
            formData.append('logo', etablissement.logo); 
        }
        axios.put('http://127.0.0.1:8000/etablissement/details/' + props.updatedEtablissement.id + '/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            props.setUpdated(true);
            Swal.fire("Modifié avec succès", "", "success");
            const formData2 = new FormData();
                            formData2.append('admin_name', state.user.login);
                            formData2.append('action', 'a modifié etablissement ('+props.updatedEtablissement.nom+')');
                            postHistorique(formData2)
            props.onHide();
        })
        .catch(error => {
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
                        Remplir les informations de l'établissement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <h2>Modifier un établissement</h2>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className='form-group mb-3'>
                                        <label>Nom</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='nom'
                                            defaultValue={props.updatedEtablissement.nom}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Description</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='description'
                                            defaultValue={props.updatedEtablissement.description}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input
                                            type='email'
                                            className='form-control'
                                            name='email'
                                            defaultValue={props.updatedEtablissement.email}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Téléphone</label>
                                        <input
                                            type='tel'
                                            className='form-control'
                                            name='tel'
                                            defaultValue={props.updatedEtablissement.tel}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Fax</label>
                                        <input
                                            type='tel'
                                            className='form-control'
                                            name='fax'
                                            defaultValue={props.updatedEtablissement.fax}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Logo</label>
                                        <input
                                            type='file'
                                            className='form-control-file'
                                            name='logo'
                                            onChange={(e) => handleChange(e)}
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
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UpdateEtablissementModel;
