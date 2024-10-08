import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import { postHistorique } from '../services/service';
import { getDoctorantUser, refreshDoctorant } from '../action/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom';
import NavBar from './NavDashboard/NavBar'

const AddThese = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshDoctorant());

        }


        dispatch(getDoctorantUser())

    }, [dispatch])
    const state = useSelector(state => state.auth);

    const [listeDirecteurs, setListeDirecteurs] = useState([]);

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
        formData.append('idchercheur', state.user.login);
        formData.append('iddirecteur', iddirecteur);
        formData.append('date_soutenu', date_soutenu);
        formData.append('file', file);
        
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

                        Swal.fire("These ajouter  ", "", "success")
                        const formData2 = new FormData();
                        formData2.append('user_name', state.user.username);
                        formData2.append('action', 'a ajouté thèse ');
                        postHistorique(formData2)
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
    if (state.isLoading) {
        return <h3>Loading....</h3>;
    } else if (!state.isAuthenticated || !state.isDoctorant) {
        return <Navigate to="/login" />;
    } else {
        return (
            <div>
                <NavBar />
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

                                        <label >spécialité </label>

                                        <select   className='form-select'
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
                                        <label>chercheur</label>
                                        <input type='text'
                                            className='form-control'
                                            name='idchercheur'
                                            value={state.user.login}
                                            onChange={(e) => handleChange(e)}
                                        />
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
        );
    }
}





export default AddThese
