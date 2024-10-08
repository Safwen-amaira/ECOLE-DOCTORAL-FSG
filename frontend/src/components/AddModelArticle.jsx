import React, { useState,useEffect } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { postHistorique } from '../services/service';

import { useSelector } from "react-redux"
const AddModelArticle = (props) => {
   
    const state = useSelector(state => state.auth);
    const [listeDirecteurs, setListeDirecteurs] = useState([]);
    const [listeChercheurs, setListeChercheurs] = useState([]);


    const [article, setArticle] = useState({
        titre: '',
        description: '',
        idchercheur: '',
        iddirecteur: '',
        date_depot: '',
        file: ''
    })
    useEffect(() => {

        axios.get('http://127.0.0.1:8000/directeur/details/')
            .then(response => {
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArticle({
            ...article,
            file: file // Mettre à jour le fichier dans l'état avec le fichier sélectionné
        });
    };
    const handleChange = (e) => {
        if (e.target.name === 'file') {
            // Si le champ est un champ de fichier, utilisez handleFileChange
            handleFileChange(e);
        } else {
            // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
            setArticle({
                ...article,
                [e.target.name]: e.target.value
            })
        }
    };
    const { titre, description, idchercheur, iddirecteur, date_depot, file  } = article
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('idchercheur', idchercheur);
        formData.append('iddirecteur', iddirecteur);
        formData.append('date_depot', date_depot);
        formData.append('file', file);
        Swal.fire({
            title: "Voulez-vous ajouter une Article ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post('http://localhost:8000/bibliotheque/article/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        Swal.fire("Article ajouter ", "", "success")
                        const formData2 = new FormData();
                            formData2.append('admin_admin', state.user.login);
                            formData2.append('action', 'a ajouté article');
                            postHistorique(formData2)
                        props.onHide();
                    })
                    .catch(err => {
                    });
                setArticle({
                    titre: '',
                    description: '',
                    idchercheur: '',
                    iddirecteur: '',
                    date_depot: '',
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
                       Remplir les informations d'une article 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                    
                       
                        <div>
               

                <div className='container'>

                    <div className='container'>
                        <h2>Ajouter une Article</h2>
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
                                        <label>date_depot</label>
                                        <input
                                            className='form-control'
                                            type='date'
                                            name='date_depot'
                                            value={date_depot}
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



export default AddModelArticle
