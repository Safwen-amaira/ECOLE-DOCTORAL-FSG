import React, { useState } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postHistorique } from '../services/service';
const AddDirecteurModel = (props) => {
    const state = useSelector(state => state.auth)

    const [directeur, setDirecteur] = useState({
        nom: '',
        prenom: '',
        grade: '',
        specialite: '',

        codelabo: '',
        email: '',
        numTel: ''
    })


    const handleChange = (e) => {

        // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
        setDirecteur({
            ...directeur,
            [e.target.name]: e.target.value
        })

    };
    const { nom, prenom, grade, specialite, codelabo, email, numTel } = directeur
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('grade', grade);
        formData.append('specialite', specialite);

        formData.append('codelabo', codelabo);
        formData.append('email', email);
        formData.append('numTel', numTel);
        
        Swal.fire({
            title: "Voulez-vous ajouter  Directeur ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post('http://localhost:8000/directeur/details/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        const formData2 = new FormData();
                        formData2.append('admin_admin', state.user.login);
                        formData2.append('action', 'a ajouté Directeur ' + nom + ' ' + prenom);
                        postHistorique(formData2)
                        Swal.fire("Directeur ajouter ", "", "success")
                        props.onHide();
                    })
                    .catch(err => {
                        Swal.fire("Verifier votre données ", "", "error")
                    });
                setDirecteur({
                    nom: '',
                    prenom: '',
                    grade: '',
                    specialite: '',

                    codelabo: '',
                    email: '',
                    numTel: ''
                });

            }

        });

    };
    const [listeLabos, setListeLobos] = useState([]);

    useEffect(() => {
        // Effectue une requête GET pour récupérer la liste des directeurs

        axios.get('http://127.0.0.1:8000/Labo/details/')
            .then(response => {
                // Met à jour l'état avec la liste des directeurs récupérée depuis l'API
                setListeLobos(response.data);
            })
            .catch(error => {
            });
    }, []);

    return (

        <div className='container'>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Ajouter une Directeur</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className='form-group mb-3'>
                                        <label>Nom</label>
                                        <input type='text'
                                            className='form-control'
                                            name='nom'
                                            value={nom}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>Prenom</label>
                                        <input type='text'
                                            className='form-control'
                                            name='prenom'
                                            value={prenom}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Grade</label>
                                        <input type='text'
                                            className='form-control'
                                            name='grade'
                                            value={grade}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>

                                        <label >spécialité </label>

                                        <select className='form-select'
                                            name='specialite'
                                            value={specialite}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <option value=''>Choisir type </option>

                                            <option value='Mathématique'>Mathématique</option>
                                            <option value='Physique'>Physique</option>
                                            <option value='Chimie'>Chimie</option>
                                            <option value='Biologie'>Biologie</option>
                                            <option value='Géologie'>Géologie</option>
                                            <option value='Informatique'>Informatique</option>
                                        </select>
                                    </div>
                                   
                                    <div className='form-group mb-3'>
                                        <label>
                                        Lieu Travail :  
                                            <select className='form-select' name='codelabo' onChange={(e) => handleChange(e)}>
                                                <option value="">Sélectionnez un laboratoire</option>
                                                {listeLabos.map((labo) => (
                                                    <option key={labo.Codelabo} value={labo.Codelabo}>
                                                        {labo.Codelabo + ' /  ' + labo.Discipline}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>email</label>
                                        <input
                                            className='form-control'
                                            type='email'
                                            name='email'
                                            value={email}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>Numero Téléphone</label>
                                        <input type='text'
                                            className='form-control'
                                            name='numTel'
                                            value={numTel}
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
    );



}

export default AddDirecteurModel
