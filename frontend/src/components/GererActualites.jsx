import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { getactualites } from '../services/service';
import UploadActualite from './UploadActualite'
import UpdateModelActualite from './UpdateModelActualite';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { getAdminfUser, getAdminsUser, getAdmintUser, refreshAdminf, refreshAdmins, refreshAdmint } from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'

const GererActualite = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshAdminf());
            dispatch(refreshAdmins());


        }


        dispatch(getAdminfUser())
        dispatch(getAdminsUser())


    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [actualites, setActualites] = useState([]);
    const [addModelShow, setAddMOdelShow] = useState(false)
    const [updateModelShow, setUpdateMOdelShow] = useState(false)
    const [updateAct, setUpdateAct] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)
    
   
    const handleDelete = (e, id) => {
        //if(window.confirm('Are you sure ?')){
        e.preventDefault();
       

        Swal.fire({
            title: "Voulez-vous supprimer cette Actualité ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
               
                axios.delete('http://127.0.0.1:8000/actualites/' + id + '/'
                )
                    .then((result) => {
                        Swal.fire("supprimer  avec success", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé actualite ');
                        postHistorique(formData2)
                        setIsUpdated(true);
                    },
                        (error) => {
                            Swal.fire("Il y a probléme", "", "error");
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
    const handleUpdate = (e, Act) => {
        e.preventDefault();
        setUpdateMOdelShow(true);
        setUpdateAct(Act);
    };
    let addModelClose = () => setAddMOdelShow(false)
    let updateModelClose = () => setUpdateMOdelShow(false)
    useEffect(() => {
        let mounted = true;
        if (actualites.length && !isUpdated) {
            return
        }
        getactualites().then(data => {
            if (mounted) {
                setActualites(data)
            }
        })
        return () => {
            mounted = false
            setIsUpdated(false)
        };
    }, [isUpdated, actualites]);

    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };
    if (state.isLoading) {
        return <h3>Loading....</h3>;
    } else if (!state.isAuthenticated || state.isAdmint || state.isDoctorant ) {
        return <Navigate to="/login" />;
    } else {
        return (
            <div>
                <NavBar />

                <div className='d-flex p-2'>
                    <div className="vstack gap-3">
                        <h2 className="alert alert-success" style={{marginBottom:"-8%"}}>Liste des actualités</h2>
                        <div>
                        <button type="button" onClick={handleAdd} className="btn btn-success" style={{marginBottom:"4%"}}>Ajouter</button>

                            <table style={{ marginLeft: '10px' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Titre</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Remarque</th>

                                        <th scope="col">Date</th>
                                        <th scope="col">Télécharger</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {actualites && actualites.map((actualite) =>
                                        <tr key={actualite.id}>
                                            <td>{actualite.titre}</td>
                                            <td>{actualite.description.substring(0,30)}</td>
                                            <td>{actualite.remarque.substring(0,30)}</td>

                                            <td>{actualite.date_creation}</td>
                                            <td>
                                                {actualite.file && (
                                                    <FaDownload
                                                        className="download-icon"
                                                        onClick={() => forceDownload(actualite.file)}
                                                    />
                                                )} </td>
                                            <td> <FaTrash
                                                className="trash-icon"
                                                size={15}
                                                onClick={event => handleDelete(event, actualite.id)}
                                            />
                                                <br />
                                                <br />
                                                <FaEdit
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleUpdate(event, actualite)}
                                                />

                                                <UpdateModelActualite show={updateModelShow} setUpdated={setIsUpdated} updatedact={updateAct} onHide={updateModelClose}></UpdateModelActualite>

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table></div>
                        <UploadActualite show={addModelShow} setUpdated={setIsUpdated} onHide={addModelClose}></UploadActualite>
                    </div>
                </div>        </div>

        );
    }
};

export default GererActualite;
