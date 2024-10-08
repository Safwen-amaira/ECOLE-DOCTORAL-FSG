import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import { postHistorique } from '../services/service';

import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom';
import NavBar from './NavDashboard/NavBar'

const AddArticle = () => {

    const state = useSelector(state => state.auth);
    const [listeDirecteurs, setListeDirecteurs] = useState([]);

    const [article, setArticle] = useState({
        titre: '',
        description: '',
        idchercheur: '',
        iddirecteur: '',
        date_depot: '',
        file: ''
    })
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArticle({
            ...article,
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
            setArticle({
                ...article,
                [e.target.name]: e.target.value
            })
        }
    };
    const { titre, description, idchercheur, iddirecteur, date_depot, file } = article
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('idchercheur', state.user.login);
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
                        const formData2 = new FormData();
                        formData2.append('user_name', state.user.username);
                        formData2.append('action', 'a ajouté article ');
                        postHistorique(formData2)
                        Swal.fire("Article ajouter  ", "", "success")

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
        );
    }
}







export default AddArticle
