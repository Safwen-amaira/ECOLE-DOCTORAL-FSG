import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { getdirecteurs } from '../services/service';
import AddDirecteurModel from './AddDirecteurModel';
import UpdateModelDirecteur from './UpdateModelDirecteur';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { getAdminfUser, getAdminsUser, getAdmintUser, refreshAdminf, refreshAdmins, refreshAdmint } from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'
import Labo from './Labo';


const GererDirecteur = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshAdminf());

        }


        dispatch(getAdminfUser())

    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [directeurs, setDirecteurs] = useState([]);
    const [addModelShow, setAddMOdelShow] = useState(false)
    const [updateModelShow, setUpdateMOdelShow] = useState(false)
    const [updateDirecteur, setUpdateDircteur] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)
    //this for componnent Labo by houssam
    const [DetailsLModelShow, setdetailsLMOdelShow] = useState(false)
    const [laboid, setlaboId] = useState(false)
    const handleDetailsL = (e, lb) => {
        e.preventDefault();
        setdetailsLMOdelShow(true);
        setlaboId(lb);
    };


    let DetailsLModelClose = () => setdetailsLMOdelShow(false)
    

    const handleDelete = (e, email) => {
        //if(window.confirm('Are you sure ?')){
        e.preventDefault();
        Swal.fire({
            title: "Voulez-vous supprimer cette directeur ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/directeur/details/' + email + '/')
                    .then((result) => {
                        Swal.fire("supprimer  avec success", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé directeur ');
                        postHistorique(formData2)
                        setIsUpdated(true);
                    },
                        (error) => {
                            Swal.fire("echec !!! ");
                        })
                    .then(response => {
                    })
                    .catch(err => {
                    });
            }

        });


    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddMOdelShow(true);
    };
    const handleUpdate = (e, Art) => {
        e.preventDefault();
        setUpdateMOdelShow(true);
        setUpdateDircteur(Art);
    };
    let addModelClose = () => setAddMOdelShow(false)
    let updateModelClose = () => setUpdateMOdelShow(false)
    useEffect(() => {
        let mounted = true;
        if (directeurs.length && !isUpdated) {
            return
        }
        getdirecteurs().then(data => {
            if (mounted) {
                setDirecteurs(data)
            }
        })
        return () => {
            mounted = false
            setIsUpdated(false)
        };
    }, [isUpdated, directeurs]);
    const [listeLabos, setListeLobos] = useState([]);


    if (state.isLoading) {
        return <h3>Loading....</h3>;
    } else if (!state.isAuthenticated || !state.isAdminf) {
        return <Navigate to="/login" />;
    } else {

        return (
            <div>
                <NavBar />

                <div className='d-flex p-2'>
                    <div className="vstack gap-3">
                        <h2 className="alert alert-success">Liste des Directeurs</h2>
                        <div className="bg-light border">
                            <table style={{ marginLeft: '10px' }} >
                                <thead>
                                    <tr>

                                        <th scope="col">Nom</th>
                                        <th scope="col">Prenom</th>
                                        <th scope="col">Grade</th>
                                        <th scope="col">Specialité</th>
                                        <th scope="col">Laboratoire/Unité</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Nmero Téléphone</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {directeurs && directeurs.map((directeur) => {

                                        return (
                                            <tr key={directeur.email}>
                                                <td>{directeur.nom}</td>
                                                <td>{directeur.prenom}</td>
                                                <td>{directeur.grade}</td>
                                                <td>{directeur.specialite}</td>

                                                <td>
                                                    {<p>
                                                        {directeur.lieuTravail ? (
                                                            <p>{directeur.lieuTravail.Codelabo} / {directeur.lieuTravail.Discipline}</p>
                                                        ) : null}
                                                        <FaEdit
                                                            className="edit-icon"
                                                            size={15}
                                                            onClick={event => handleDetailsL(event, directeur.lieuTravail)} />


                                                        <Labo show={DetailsLModelShow} labo={laboid} onHide={DetailsLModelClose}></Labo>

                                                    </p>}

                                                </td>
                                                <td>{directeur.email}</td>
                                                <td>{directeur.numTel}</td>
                                                <td> <FaTrash
                                                    className="trash-icon"
                                                    size={15}
                                                    onClick={event => handleDelete(event, directeur.email)}
                                                />
                                                    <br />
                                                    <br />
                                                    <FaEdit
                                                        className="edit-icon"
                                                        size={15}
                                                        onClick={event => handleUpdate(event, directeur)}
                                                    />



                                                    <UpdateModelDirecteur show={updateModelShow} setUpdated={setIsUpdated} updateddirecteur={updateDirecteur} onHide={updateModelClose}></UpdateModelDirecteur>


                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table> </div>
                        <button style={{ marginTop: '5px' }} type="button" onClick={handleAdd} className="btn btn-success">Ajouter</button>
                        <AddDirecteurModel show={addModelShow} setUpdated={setIsUpdated} onHide={addModelClose}></AddDirecteurModel>
                    </div>
                </div>
            </div>
        );
    }
};

export default GererDirecteur;
