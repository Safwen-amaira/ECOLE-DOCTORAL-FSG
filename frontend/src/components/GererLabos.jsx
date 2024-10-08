import React from 'react'
import { getlabos } from '../services/service'
import '../App.css'
import Swal from 'sweetalert2'
import { Button } from 'bootstrap'
import { useState, useEffect } from 'react'
import AddLaboModel from './AddLaboModel'
import axios from 'axios'
import { FaDownload } from 'react-icons/fa';
import UpdateLaboModel from './UpdateLaboModel';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import {  getAdminfUser,getAdminsUser,getAdmintUser,refreshAdminf,refreshAdmins,refreshAdmint} from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'


const GererLabos = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(refreshAdminf());
  
    }
  
  
      dispatch(getAdminfUser())
        
    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [Labos, setLabos] = useState([]);
    const [addModelShow, setAddMOdelShow] = useState(false)
    const [updateModelShow, setUpdateMOdelShow] = useState(false)
    const [updateLabo, setUpdateLabo] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)
    useEffect(() => {
        let mounted = true;
        if (Labos.length && !isUpdated) {
            return
        }
        getlabos().then(data => {
            if (mounted) {
                setLabos(data)
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
    const handleDelete = (e, codelabo) => {
        //if(window.confirm('Are you sure ?')){
        e.preventDefault();
        Swal.fire({
            title: "Voulez-vous supprimer une labo ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/Labo/details/' + codelabo + '/')
                    .then((result) => {
                        Swal.fire("supprimer avec success","","success")
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé entité de recherche ');
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
    const handleUpdate = (e, labo) => {
        e.preventDefault();
        setUpdateMOdelShow(true);
        setUpdateLabo(labo);
    };
    let addModelClose = () => setAddMOdelShow(false)
    let updateModelClose = () => setUpdateMOdelShow(false)
    if (state.isLoading) {
        return <h3>Loading....</h3>;
    } else if (!state.isAuthenticated || !state.isAdminf  ) {
        return <Navigate to="/login" />;
    } else {
    return (
        <div>
                            <NavBar />

        <div className='d-flex p-2'>
            <div className="vstack gap-3">
            <h2 className="alert alert-success">Liste des Centre de recherche</h2>
            <div className="bg-light border">
                <table style={{ marginLeft: '10px' }}>

                    <thead>
                        <tr>
                            <th>Codelabo</th>
                            <th>Directeur</th>
                            <th> Discipline</th>
                            <th>Etablissement </th>
                            <th>fiche</th>
                            <th>action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Labos.map((labo) =>
                            <tr key={labo.id}>
                                <td>{labo.Codelabo}</td>
                                <td>{labo.Directeur}</td>
                                <td>{labo.Discipline}</td>
                                <td>{labo.Etablissement}</td>
                                <td>{labo.fiche && (
                                    <FaDownload
                                        className="download-icon"
                                        onClick={() => forceDownload(labo.fiche)}
                                    />
                                )} </td>
                                <td><FaTrash
                                            className="trash-icon"
                                            size={15}
                                            onClick={event => handleDelete(event, labo.Codelabo)}     />
                                        <br />
                                        <br />
                                        <FaEdit
                                            className="edit-icon"
                                            size={15}
                                            onClick={event => handleUpdate(event, labo)}/>
                                    
                                    
                                    <UpdateLaboModel show={updateModelShow} setUpdated={setIsUpdated} updatedlabo={updateLabo} onHide={updateModelClose}></UpdateLaboModel>
                                </td>


                            </tr>)}
                    </tbody>

                </table></div>
                <button type="button" onClick={handleAdd} className="btn btn-success">Ajouter</button>
                <AddLaboModel show={addModelShow} setUpdated={setIsUpdated} onHide={addModelClose}></AddLaboModel>

            </div>

        </div>
        </div>

    )
}};

export default GererLabos
