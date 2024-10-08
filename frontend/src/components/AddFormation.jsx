import React, { useState, } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import "./public/styles/AddFormation.css"
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'

import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom';
const AddFormation = () => {

    const state = useSelector(state => state.auth);

    const [formation, setFormation] = useState({
        nom: '',
        prenom: '',
        cin: '',
        niveau: '',
        tel: '',
        specialite: '',
        email: '',
        nom_formation: '',
        nom_formateur: '',
        lieu_formation: '',
        type: '',
        date_debut: '',
        date_fin: '',
        nombre_heure: '',
        semestre: '',
        annee_universitaire: '',
        file: ''
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormation({
            ...formation,
            file: file // Mettre à jour le fichier dans l'état avec le fichier sélectionné
        });
    };
    const handleChange = (e) => {
        if (e.target.name === 'file') {
            // Si le champ est un champ de fichier, utilisez handleFileChange
            handleFileChange(e);
        } else {
            // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
            setFormation({
                ...formation,
                [e.target.name]: e.target.value
            })
        }
    };
    const handleset = (e) => {
        setFormation({
            cin: '',
            type: '',
            nom_formation: '',
            nom_formateur: '',
            lieu_formation: '',
            date_debut: '',
            date_fin: '',
            nombre_heure: '',
            semestre: '',
            annee_universitaire: '',
            file: ''
        });
    };
    const { cin, type, nom_formation, nom_formateur, lieu_formation, date_debut, date_fin, semestre, annee_universitaire, nombre_heure, file } = formation
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('cin', state.user.login);

        formData.append('nom_formation', nom_formation);
        formData.append('nom_formateur', nom_formateur);
        formData.append('lieu_formation', lieu_formation);
        formData.append('nombre_heure', nombre_heure);
        formData.append('file', file);
        if (formation.type == 'Pédagogique') {
            formData.append('annee_universitaire', annee_universitaire);
            formData.append('semestre', semestre);

        } else {
            formData.append('date_debut', date_debut);
            formData.append('date_fin', date_fin);
            formData.append('type', type);
        }

        Swal.fire({
            title: "Voulez-vous ajouter une formation ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {
            
            if (result.isConfirmed) {
                
                if (formation.type == 'Pédagogique') {
                    axios.post('http://127.0.0.1:8000/formation/pedagogique/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(response => {
                            Swal.fire("Formation  a été ajouter ", "", "success")
                            const formData2 = new FormData();
                            formData2.append('user_name', state.user.username);
                            formData2.append('action', 'a ajouté formation pédagogique');
                            postHistorique(formData2)
                        })
                        .catch(err => {
                        });
                } else {
                    axios.post('http://127.0.0.1:8000/formation/simple/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(response => {
                            Swal.fire("Formation  a été ajouter ", "", "success")
                            const formData2 = new FormData();
                            formData2.append('user_name', state.user.username);
                            formData2.append('action', 'a ajouté formation simple');
                            postHistorique(formData2)
                        })
                        .catch(err => {
                        });
                }

                setFormation({

                    cin: '',

                    type: '',
                    nom_formation: '',
                    nom_formateur: '',
                    lieu_formation: '',
                    date_debut: '',
                    date_fin: '',
                    nombre_heure: '',
                    semestre: '',
                    annee_universitaire: '',
                    file: ''
                });
            }

        });


    };
    const linkSimple = (
        <div>
            <div className=''>
                <br /><br />
                <label >Date debut <span className='etoileimpo'>*</span></label>
                <input
                    type='date'
                    name='date_debut'
                    required
                    value={date_debut}
                    onChange={(e) => handleChange(e)}
                />
                <br /><br />
                <label >Date fin <span className='etoileimpo'>*</span></label>
                <input
                    type='date'
                    name='date_fin'
                    required
                    value={date_fin}
                    onChange={(e) => handleChange(e)}
                />
            </div>

        </div>


    )
    const linkpedagogique = (
        <div>
            <div >
                <br />
                <label >Semestre<span className='etoileimpo'>*</span></label>
                <select
                    required
                    name='semestre'
                    value={semestre}
                    style={{ borderRadius: "8px" }}
                    onChange={(e) => handleChange(e)}
                >
                    <option value=''>Choisir semestre</option>

                    <option value='S1'>S1</option>
                    <option value='S2'>S2</option>

                </select>

            </div>
            <br />
            <div>
                <label >Année Universitaire<span className='etoileimpo'>*</span></label>
                <input type='text'
                    placeholder='2023-2024'
                    name='annee_universitaire'
                    required
                    value={annee_universitaire}
                    onChange={(e) => handleChange(e)}
                />
            </div>

        </div>


    )



    if (state.isLoading) {
        return <h3>Loading....</h3>;
    } else if (!state.isAuthenticated || !state.isDoctorant) {
        return <Navigate to="/login" />;
    } else {
        return (
            <div >
                <NavBar />
                <div className='container'>

                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <div style={{
                                    margin: '1px',
                                    padding: '1px',
                                    width: '970px',
                                    height: '590px',
                                    overflowX: 'hidden',
                                    overflowY: 'auto',
                                    textAlign: 'justify'
                                }} >
                                    <div className='addformationFormContainer' style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span className='Remarque'><span className='RemarqueTitle'>Remarque :</span><span> Tous les champs ayant le symbole<span className='etoileimpo'> * </span> sont obligatoires .</span></span><br />


                                        <center>

                                            <br /><br /><br />
                                            <h2 className='TitleOfAdDFormation'>Ajouter une formation  </h2>
                                            <div className='row' style={{ marginLeft: "-10%" }}>
                                                <div className='col-md-8 mx-auto'>
                                                    <form onSubmit={e => handleSubmit(e)}>
                                                        <div className='form-group mb-3'>
                                                            <div className='form-group mb-3'>
                                                                <label>Type <span className='etoileimpo'>*</span></label>

                                                                <select
                                                                    required
                                                                    name='type'
                                                                    value={type}
                                                                    onChange={(e) => handleChange(e)}
                                                                >
                                                                    <option value=''>Choisir type </option>

                                                                    <option value='Scientifique'>Scientifique</option>
                                                                    <option value='Générale'>Générale</option>
                                                                    <option value='Pédagogique'>Pédagogique</option>

                                                                </select>
                                                            </div>
                                                            <br />
                                                        </div>


                                                        <div className='form-group mb-3'>

                                                            <label >cin<span className='etoileimpo'>*</span></label>
                                                            <input type='text'
                                                                name='cin'
                                                                readOnly
                                                                defaultValue={state.user.login}

                                                                onChange={(e) => handleChange(e)}
                                                            />


                                                        </div>

                                                        <div className='form-group mb-3'>


                                                            <label >Nom formation<span className='etoileimpo'>*</span></label>
                                                            <input type='text'
                                                                name='nom_formation'
                                                                required
                                                                value={nom_formation}
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </div>

                                                        <div className='form-group mb-3'>
                                                            <label >Nom formateur<span className='etoileimpo'>*</span></label>
                                                            <input type='text'
                                                                name='nom_formateur'
                                                                required
                                                                value={nom_formateur}
                                                                onChange={(e) => handleChange(e)}
                                                            />



                                                        </div>
                                                        <div>
                                                            <label >Lieu formation<span className='etoileimpo'>*</span></label>
                                                            <input type='text'
                                                                name='lieu_formation'
                                                                required
                                                                value={lieu_formation}
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </div>

                                                        {(formation.type == 'Pédagogique') ? linkpedagogique : linkSimple}
                                                        <br />

                                                        <div className='form-group mb-3'>

                                                            <label >Nombre heure<span className='etoileimpo'>*</span></label>
                                                            <input type='text'
                                                                name='nombre_heure'
                                                                required
                                                                value={nombre_heure}
                                                                onChange={(e) => handleChange(e)}
                                                            />



                                                        </div>
                                                        <div>
                                                            <label >Certificat :</label>
                                                            <input type='file'
                                                                required
                                                                className='form-control-file'
                                                                name='file'

                                                                onChange={(e) => handleFileChange(e)}
                                                            /> </div>
                                                        <button type="submit" style={{ background: 'green' }} className="buttonAjoutFormationStyle">Ajouter</button>
                                                        <button onClick={(e) => handleset(e)} style={{ background: 'red', marginLeft: '40px' }} className="buttonAjoutFormationStyle">Reset</button>
                                                    </form>
                                                </div>
                                            </div>

                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}



export default AddFormation
