import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getEtablissement } from '../services/service';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import AddEtablissementModel from './AddEtablissementModel';
import UpdateEtablissementModel from './UpdateEtablissementModel';
import {  getAdminfUser,getAdminsUser,getAdmintUser,refreshAdminf,refreshAdmins,refreshAdmint} from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'


const GererEtablissement = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(refreshAdminf());
  
    }
  
  
      dispatch(getAdminfUser())
        
    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [etablissements, setEtablissements] = useState([]);
    const [addModelShow, setAddMOdelShow] = useState(false)
    const [updateModelShow, setUpdateMOdelShow] = useState(false)
    const [updateEtab, setUpdateEtab] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)


    const handleDelete = (e, id) => {
        //if(window.confirm('Are you sure ?')){
        e.preventDefault();
        Swal.fire({
            title: "Voulez-vous supprimer cette Etablissement ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/etablissement/details/' + id + '/')
                    .then((result) => {
                        Swal.fire("supprimer  avec success", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé etablissement ');
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
    const handleUpdate = (e, etablissement) => {
        e.preventDefault();
        setUpdateMOdelShow(true);
        setUpdateEtab(etablissement);
    };
    let addModelClose = () => setAddMOdelShow(false)
    let updateModelClose = () => setUpdateMOdelShow(false)
    useEffect(() => {
        let mounted = true;
        if (etablissements.length && !isUpdated) {
            return
        }
        getEtablissement().then(data => {
            if (mounted) {
                setEtablissements(data)
            }
        })
        return () => {
            mounted = false
            setIsUpdated(false)
        };
    }, [isUpdated]);

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
                <div className="bg-light border"> <h2 className="alert alert-success">Liste des Etablissements</h2></div>
                <div className="bg-light border">
                    <table style={{ marginLeft: '10px' }} >
                        <thead>
                            <tr>

                                <th scope="col">Logo</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Description</th>
                                <th scope="col">Email</th>
                                <th scope="col">Téléphone</th>
                                <th scope="col">Fax</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {etablissements && etablissements.map((etablissement) =>
                                <tr key={etablissement.id}>
                                    <td><img style={{width:'50%',height:'50%'}}src={`http://127.0.0.1:8000${etablissement.logo}`} alt="alternate-text"></img></td>
                                    <td>{etablissement.nom}</td>
                                    <td>{etablissement.description}</td>
                                    <td>{etablissement.email}</td>
                                    <td>{etablissement.tel}</td>
                                    <td>{etablissement.fax}</td>
                                    <td><FaTrash
                                        className="trash-icon"
                                        size={15}
                                        onClick={event => handleDelete(event, etablissement.id)} />
                                        <br />
                                        <br />
                                        <FaEdit
                                            className="edit-icon"
                                            size={15}
                                            onClick={event => handleUpdate(event, etablissement)} />
                                        <UpdateEtablissementModel show={updateModelShow} setUpdated={setIsUpdated} updatedEtablissement={updateEtab} onHide={updateModelClose}></UpdateEtablissementModel>



                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <button  style={{margin:'10px'}}type="button" onClick={handleAdd} className="btn btn-success">Ajouter</button>
                <AddEtablissementModel show={addModelShow} setUpdated={setIsUpdated} onHide={addModelClose}></AddEtablissementModel>

            </div>
        </div>
        </div>
    );
}};





export default GererEtablissement
