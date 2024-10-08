import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { getTheses } from '../services/service';
import AddModelThese from './AddModelThese';
import UpdateModelThese from './UpdateModelThese';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaPen, FaUser } from 'react-icons/fa';
import { getAdminfUser, getAdminsUser, getAdmintUser, refreshAdminf, refreshAdmins, refreshAdmint } from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'
import Directeur from './Directeur';
import Chercheur from './Chercheur';


const GererTheses = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshAdminf());

        }


        dispatch(getAdminfUser())

    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [theses, setTheses] = useState([]);
    const [addModelShow, setAddMOdelShow] = useState(false)
    const [updateModelShow, setUpdateMOdelShow] = useState(false)
    const [updatethese, setUpdateThese] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)
    const [DetailsDModelShow, setdetailsDMOdelShow] = useState(false)
    const [dirid, setdirId] = useState(false)
    const [DetailsCModelShow, setdetailsCMOdelShow] = useState(false)
    const [cherid, setcherId] = useState(false)

  

    const handleDelete = (e, id) => {
        //if(window.confirm('Are you sure ?')){
        e.preventDefault();
        Swal.fire({
            title: "Voulez-vous supprimer une Articles ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/bibliotheque/these/' + id + '/')
                    .then((result) => {
                        Swal.fire("supprimer  avec success", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé thèse ');
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
        setUpdateThese(Art);
    };
    const handleDetailsD = (e, dir) => {
        e.preventDefault();
        setdetailsDMOdelShow(true);
        setdirId(dir);
    };
    const handleDetailsC = (e, cher) => {
        e.preventDefault();
        setdetailsCMOdelShow(true);
        setcherId(cher);
    };
    let addModelClose = () => setAddMOdelShow(false)
    let updateModelClose = () => setUpdateMOdelShow(false)
    let DetailsDModelClose = () => setdetailsDMOdelShow(false)
    let DetailsCModelClose = () => setdetailsCMOdelShow(false)

    useEffect(() => {
        let mounted = true;
        if (theses.length && !isUpdated) {
            return
        }
        getTheses().then(data => {
            if (mounted) {
                setTheses(data)
            }
        })
        return () => {
            mounted = false
            setIsUpdated(false)
        };
    }, [isUpdated]);

    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };
    const handleUpdatetheseState = (e, these) => {
        e.preventDefault();
        const formData = new FormData();
        if (these.state == 'Validé') {
            formData.append('state', 'Non-Validé');
        } else {
            formData.append('state', 'Validé');
        }
        setIsUpdated(true);




        Swal.fire({
            title: "Voulez-vous modifier  State de cette Thèse?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://localhost:8000/bibliotheque/these/' + these.id + '/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        Swal.fire("modifier avec success ", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.username);
                        formData2.append('action', 'a modifié status de thhèse (' + these.titre + ')');
                        postHistorique(formData2)
                        setIsUpdated(true);
                    })
                    .catch(err => {
                    });
            }

        });


    };
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
                        <h2 className="alert alert-success">Liste des These</h2>
                        <div className="bg-light border">
                            <table style={{ marginLeft: '10px' }}>
                                <thead>
                                    <tr>

                                        <th scope="col">titre</th>
                                        <th scope="col">specialite</th>
                                        <th scope="col">chercheur</th>
                                        <th scope="col">directeur</th>
                                        <th scope="col">date soutenu</th>
                                        <th scope="col">State</th>

                                        <th scope="col">Télécharger</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {theses && theses.map((these) =>{
                                    

                                    return (
                                        <tr key={these.id}>
                                            <td>{these.titre}</td>
                                            <td>{these.specialite}</td>
                                            <td>
                                            { <p>
                                                {these.chercheur.Nom} {these.chercheur.Prenom}
                                                <FaEdit
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleDetailsC(event, these.chercheur)} />
                                                    </p>}                                               
                                             
                                                <Chercheur show={DetailsCModelShow} chercheur={cherid} onHide={DetailsCModelClose}></Chercheur>

                                            </td>
                                            <td>{ <p>
                                                {these.directeur.nom} {these.directeur.prenom}
                                                 <FaEdit
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleDetailsD(event, these.directeur)} />
                                                    </p>}   
                                                
                                                <Directeur show={DetailsDModelShow} directeur={dirid} onHide={DetailsDModelClose}></Directeur>

                                            </td>
                                            <td>{these.date_soutenu}</td>
                                            <td> {these.state}</td>


                                            <td>
                                                {these.file && (
                                                    <FaDownload
                                                        className="download-icon"
                                                        onClick={() => forceDownload(these.file)}
                                                    />
                                                )} </td>
                                            <td><FaTrash
                                                className="trash-icon"
                                                size={15}
                                                onClick={event => handleDelete(event, these.id)} />
                                                <br />
                                                <br />
                                                <FaEdit
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleUpdate(event, these)} />

                                                <UpdateModelThese show={updateModelShow} setUpdated={setIsUpdated} updatedthese={updatethese} onHide={updateModelClose}></UpdateModelThese>
                                                <br />
                                                <FaPen
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleUpdatetheseState(event, these)}
                                                />
                                            </td>
                                        </tr>
                                    )
     } )}
                                </tbody>
                            </table></div>
                        <button type="button" onClick={handleAdd} className="btn btn-success">Ajouter</button>
                        <AddModelThese show={addModelShow} setUpdated={setIsUpdated} onHide={addModelClose}></AddModelThese>
                    </div>
                </div>
            </div>
        );
    }
};


export default GererTheses
