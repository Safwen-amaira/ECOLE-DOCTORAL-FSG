import React, { useState } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { postHistorique } from '../services/service';

import { useSelector } from "react-redux"
const UpdateModelDirecteur = (props) => {
    
    const state = useSelector(state => state.auth);

    const [directeur, setdirecteur] = useState({
        nom: '',
        prenom: '',
        grade: '',
        specialite: '',
        lieuTravail: '',
        email: '',
        numTel: ''    
    })
 
    const handleChange = (e) => {
        
            // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
            setdirecteur({
                ...directeur,
                [e.target.name]: e.target.value
            })
        
    };
    const {nom, prenom, grade,specialite, lieuTravail, email, numTel  } = directeur
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (nom !== '') {
            formData.append('nom', nom);
        }

        if (prenom !== '') {
            formData.append('prenom', prenom);
        }
        if (grade !== '') {
            formData.append('grade', grade);
        }
        if (specialite !== '') {
            formData.append('specialite', specialite);
        }
        if (lieuTravail !== '') {
            formData.append('lieuTravail', lieuTravail);
        }
        if (email) {
            formData.append('email', email);
        }

        if (numTel !=='') { 
            formData.append('numTel', numTel);
        }

        
        Swal.fire({
            title: "Voulez-vous modifier cette Directeur ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://127.0.0.1:8000/directeur/details/' + props.updateddirecteur.email + '/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        Swal.fire("modifier avec success ","","success");
                        const formData2 = new FormData();
                            formData2.append('admin_name', state.user.login);
                            formData2.append('action', 'a modifié directeur ('+props.updateddirecteur.nom+' '+props.updateddirecteur.prenom+')');
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
                        Fill In Directeur Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='container'>
                        <h2>Modifier une Directeur</h2>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className='form-group mb-3'>
                                        <label>Nom</label>
                                        <input type='text'
                                            className='form-control'
                                            name='nom'
                                            defaultValue={props.updateddirecteur.nom}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>Prenom</label>
                                        <input
                                            className='form-control'
                                            name='prenom'
                                            defaultValue={props.updateddirecteur.prenom}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Grade</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            name='grade'
                                            defaultValue={props.updateddirecteur.grade}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>specialite</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            name='specialite'
                                            defaultValue={props.updateddirecteur.specialite}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            name='email'
                                            defaultValue={props.updateddirecteur.email}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>Numero Téléphone</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            name='numTel'
                                            defaultValue={props.updateddirecteur.numTel}
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
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}




export default UpdateModelDirecteur
