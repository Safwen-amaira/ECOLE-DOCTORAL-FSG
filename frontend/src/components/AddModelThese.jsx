import React, { useState, useEffect } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from "react-redux"
import { postHistorique } from '../services/service';

const AddModelThese = (props) => {
    const state = useSelector(state => state.auth);

    const [listeDirecteurs, setListeDirecteurs] = useState([]);
    const [listeChercheurs, setListeChercheurs] = useState([]);

    useEffect(() => {
        // Effectue une requête GET pour récupérer la liste des directeurs

        axios.get('http://127.0.0.1:8000/directeur/details/')
            .then(response => {
                // Met à jour l'état avec la liste des directeurs récupérée depuis l'API
                setListeDirecteurs(response.data);
            })
            .catch(error => {
            });
    }, []);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api-chercheur/chercheur-id/')
            .then(response => {
                setListeChercheurs(response.data);
            })
            .catch(error => {
            });
    }, []);
    const [these, setThese] = useState({
        titre: '',
        specialite: '',
        idchercheur: '',
        iddirecteur: '',
        date_soutenu: '',
        file: ''
    })
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setThese({
            ...these,
            file: file // Mettre à jour le fichier dans l'état avec le fichier sélectionné
        });
    };
    const handleChange = (e) => {
        if (e.target.name === 'file') {
            // Si le champ est un champ de fichier, utilisez handleFileChange
            handleFileChange(e);
        } else {
            // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
            setThese({
                ...these,
                [e.target.name]: e.target.value
            })
        }
    };
    const { titre, specialite, idchercheur, iddirecteur, date_soutenu, file } = these
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('specialite', specialite);
        formData.append('idchercheur', idchercheur);
        formData.append('iddirecteur', iddirecteur);
        formData.append('date_soutenu', date_soutenu);
        formData.append('file', file);
        formData.append('state', 'Validé');
        Swal.fire({
            title: "Voulez-vous ajouter une these ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post('http://localhost:8000/bibliotheque/these/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        Swal.fire("These ajouter  ", "", "success")
                        const formData2 = new FormData();

                        formData2.append('user_admin', state.user.login);
                        formData2.append('action', 'a ajouté thèse ');
                        postHistorique(formData2)
                        props.onHide();
                    })
                    .catch(err => {
                    });
                setThese({
                    titre: '',
                    specialite: '',
                    idchercheur: '',
                    iddirecteur: '',
                    date_soutenu: '',
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
                        Remplir les information d'une thèse
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='container'>

                            <div className='container'>
                                <h2>Ajouter une These</h2>
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
                                                <label>specialite</label>
                                                <input type='text'
                                                    className='form-control'
                                                    name='specialite'
                                                    value={specialite}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>
                                                    Nom du Chercheur :
                                                    <select name='idchercheur' onChange={(e) => handleChange(e)}>
                                                        <option value="">Sélectionnez un chercheur</option>
                                                        {listeChercheurs.map((chercheur) => (
                                                            <option key={chercheur.cin} value={chercheur.cin}>
                                                                {chercheur.Nom + ' ' + chercheur.Prenom}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>
                                                    Nom du Directeur :
                                                    <select name='iddirecteur' onChange={(e) => handleChange(e)}>
                                                        <option value="">Sélectionnez un directeur</option>
                                                        {listeDirecteurs.map((directeur) => (
                                                            <option key={directeur.email} value={directeur.email}>
                                                                {directeur.nom + ' ' + directeur.prenom}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>date_soutenu</label>
                                                <input
                                                    className='form-control'
                                                    type='date'
                                                    name='date_soutenu'
                                                    value={date_soutenu}
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





export default AddModelThese
