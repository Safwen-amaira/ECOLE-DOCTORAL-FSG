import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { getDocuments } from '../services/service';
import UpdateModelDocuments from './UpdateModelDocuments'
import AddModelDocument from './AddModelDocument';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import {  getAdminfUser,getAdminsUser,getAdmintUser,refreshAdminf,refreshAdmins,refreshAdmint} from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'


const GererDocument = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(refreshAdminf());
  
    }
  
  
      dispatch(getAdminfUser())
        
    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [documents, setDocuments] = useState([]);
    const [addModelShow, setAddMOdelShow] = useState(false)
    const [updateModelShow, setUpdateMOdelShow] = useState(false)
    const [updateDoc, setUpdateDoc] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)


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
                axios.delete('http://127.0.0.1:8000/bibliotheque/document/' + id + '/')
                    .then((result) => {
                        Swal.fire("supprimer  avec success", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé document ');
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
    const handleUpdate = (e, doc) => {
        e.preventDefault();
        setUpdateMOdelShow(true);
        setUpdateDoc(doc);
    };
    let addModelClose = () => setAddMOdelShow(false)
    let updateModelClose = () => setUpdateMOdelShow(false)
    useEffect(() => {
        let mounted = true;
        if (documents.length && !isUpdated) {
            return
        }
        getDocuments().then(data => {
            if (mounted) {
                setDocuments(data)
            }
        })
        return () => {
            mounted = false
            setIsUpdated(false)
        };
    }, [isUpdated, documents]);

    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };
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
                <div className="bg-light border"> <h2 className="alert alert-success">Liste des Documents</h2></div>
                <div className="bg-light border">
                    <table style={{ marginLeft: '10px' }} >
                        <thead>
                            <tr>

                                <th scope="col">titre</th>
                                <th scope="col">description</th>
                                <th scope="col">Télécharger</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {documents && documents.map((document) =>
                                <tr key={document.id}>
                                    <td>{document.titre}</td>
                                    <td>{document.description}</td>



                                    <td>
                                        {document.file && (
                                            <FaDownload
                                                className="download-icon"
                                                onClick={() => forceDownload(document.file)}
                                            />
                                        )} </td>
                                    <td><FaTrash
                                            className="trash-icon"
                                            size={15}
                                            onClick={event => handleDelete(event, document.id)}                                         />
                                        <br />
                                        <br />
                                        <FaEdit
                                            className="edit-icon"
                                            size={15}
                                            onClick={event => handleUpdate(event, document)}                                         />
                                        
                                        
                                        <UpdateModelDocuments show={updateModelShow} setUpdated={setIsUpdated} updateddoc={updateDoc} onHide={updateModelClose}></UpdateModelDocuments>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <button style={{margin:'10px'}} type="button" onClick={handleAdd} className="btn btn-success">Ajouter</button>
                <AddModelDocument show={addModelShow} setUpdated={setIsUpdated} onHide={addModelClose}></AddModelDocument>
            </div>
        </div>
        </div>
    );
}};



export default GererDocument
