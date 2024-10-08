import React, { useState,useEffect } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { postHistorique } from '../services/service';

import { useSelector } from "react-redux"
const AddLaboModel = (props) => {
   
    const state = useSelector(state => state.auth);
    const [labo, setLabo] = useState({
        type: '',
        Codelabo: '',
        Directeur: '',
        Discipline: '',
        Etablissement: '',
        fiche: ''
    })
    const handleFileChange = (e) => {
        const fiche = e.target.files[0];
        setLabo({
            ...labo,
            fiche: fiche // Mettre à jour le fichier dans l'état avec le fichier sélectionné
        });
    };
    const handleChange = (e) => {
        if (e.target.name === 'fiche') {
            // Si le champ est un champ de fichier, utilisez handleFileChange
            handleFileChange(e);
        } else {
            // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
            setLabo({
                ...labo,
                [e.target.name]: e.target.value
            })
        }
    };
    const { type, Codelabo, Directeur, Discipline, Etablissement, fiche } = labo
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('type', type);
        formData.append('Codelabo', Codelabo);
        formData.append('Directeur', Directeur);
        formData.append('Discipline', Discipline);
        formData.append('Etablissement', Etablissement);
        formData.append('fiche', fiche);
        Swal.fire({
            title: "Voulez-vous ajouter une labo ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post('http://127.0.0.1:8000/Labo/details/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        Swal.fire("labo ajouter avec success", "", "success")
                        const formData2 = new FormData();
                            formData2.append('admin_name', state.user.login);
                            formData2.append('action', 'a ajouté unité de recherche ('+type+')');
                            postHistorique(formData2)
                        props.onHide();
                    })
                    .catch(err => {
                    });
                setLabo({
                    type: '',
                    Codelabo: '',
                    Directeur: '',
                    Discipline: '',
                    Etablissement: '',
                    fiche: ''
                });
            }

        });


    };
    const [listeEtabs, setListeEtabs] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/etablissement/details/')
            .then(response => {
                setListeEtabs(response.data);
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
                    Remplir les informations d'une Centre de recherche                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <h2>Ajouter une Centre de recherche</h2>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <form onSubmit={e => handleSubmit(e)}>

                                    <div className='form-group mb-3'>
                                        <select
                                            className="form-select"
                                            name='type'
                                            value={type}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <option value="">type</option>
                                            <option value="Labo">laboratoire</option>
                                            <option value="Unite">Unité</option>
                                            <option value="USCR">USCR</option>
                                            <option value="LaboR">laboratoire Rattaché</option>
                                            <option value="UniteR">Unité Rattachée</option>

                                        </select>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Codelabo</label>
                                        <input type='text'
                                            className='form-control'
                                            name='Codelabo'
                                            value={Codelabo}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Directeur</label>
                                        <input type='text'
                                            className='form-control'
                                            name='Directeur'
                                            value={Directeur}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Discipline</label>
                                        <input type='text'
                                            className='form-control'
                                            name='Discipline'
                                            value={Discipline}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                   
                                    <div className='form-group mb-3'>
                                        <label>
                                            Nom Etablissement :
                                            <select name='Etablissement' onChange={(e) => handleChange(e)}>
                                                <option value="">Sélectionnez une établissement</option>
                                                {listeEtabs.map((etab) => (
                                                    <option key={etab.id} value={etab.id}>
                                                        {etab.nom }
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>Fichier</label>
                                        <input type='file'
                                            className='form-control-file'
                                            name='fiche'

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

export default AddLaboModel

