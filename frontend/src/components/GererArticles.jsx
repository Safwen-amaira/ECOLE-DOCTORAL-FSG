import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { getArticles } from '../services/service';
import AddModelArticle from './AddModelArticle';
import UpdateModelArticle from './UpdateModelArticle';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaPen, FaUser } from 'react-icons/fa';
import { getAdminfUser, getAdminsUser, getAdmintUser, refreshAdminf, refreshAdmins, refreshAdmint } from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'
import back from '../Assets/white.jpg'
import Directeur from './Directeur';
import Chercheur from './Chercheur';
const GererArticles = () => {
    const [DetailsDModelShow, setdetailsDMOdelShow] = useState(false)
    const [dirid, setdirId] = useState(false)
    const [DetailsCModelShow, setdetailsCMOdelShow] = useState(false)




    const [cherid, setcherId] = useState(false)
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
    let DetailsDModelClose = () => setdetailsDMOdelShow(false)
    let DetailsCModelClose = () => setdetailsCMOdelShow(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshAdminf());

        }


        dispatch(getAdminfUser())

    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [articles, setArticles] = useState([]);
    const [addModelShow, setAddMOdelShow] = useState(false)
    const [updateModelShow, setUpdateMOdelShow] = useState(false)
    const [updateArt, setUpdateArt] = useState([]);
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
                axios.delete('http://127.0.0.1:8000/bibliotheque/article/' + id + '/')
                    .then((result) => {
                        Swal.fire("supprimer  avec success", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé article ');
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
        setUpdateArt(Art);
    };
    let addModelClose = () => setAddMOdelShow(false)
    let updateModelClose = () => setUpdateMOdelShow(false)
    useEffect(() => {
        let mounted = true;
        if (articles.length && !isUpdated) {
            return
        }
        getArticles().then(data => {
            if (mounted) {
                setArticles(data)
            }
        })
        return () => {
            mounted = false
            setIsUpdated(false)
        };
    }, [isUpdated, articles]);

    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };
    const handleUpdateArticleState = (e, article) => {
        e.preventDefault();
        const formData = new FormData();
        if (article.state == 'Validé') {
            formData.append('state', 'Non-Validé');
        } else {
            formData.append('state', 'Validé');
        }
        setIsUpdated(true);





        Swal.fire({
            title: "Voulez-vous modifier  State de cette Article?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://localhost:8000/bibliotheque/article/' + article.id + '/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        Swal.fire("modifier avec success ", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.username);
                        formData2.append('action', 'a modifié status d\'article (' + article.titre + ')');
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
            <div >
                <NavBar />

                <div className='d-flex p-2'>
                    <div className="vstack gap-3">
                        <h2 className="alert alert-success">Liste des Articles</h2>
                        <div  className="">
                            <table style={{ marginLeft: '10px' }}>
                                <thead>
                                    <tr>

                                        <th scope="col">titre</th>
                                        <th scope="col">description</th>
                                        <th scope="col">chercheur</th>
                                        <th scope="col">directeur</th>
                                        <th scope="col">date depot</th>
                                        <th scope="col">State</th>

                                        <th scope="col">Télécharger</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody >
                                    {articles && articles.map((article) => {

                                        return (
                                            <tr key={article.id}>
                                                <td>{article.titre}</td>
                                                <td>{article.description}</td>
                                                <td>
                                                    {<p>
                                                        {article.chercheur.Nom} {article.chercheur.Prenom}
                                                        <FaEdit
                                                            className="edit-icon"
                                                            size={15}
                                                            onClick={event => handleDetailsC(event, article.chercheur)} />
                                                    </p>}

                                                    <Chercheur show={DetailsCModelShow} chercheur={cherid} onHide={DetailsCModelClose}></Chercheur>

                                                </td>
                                                <td>
                                                    {<p>
                                                        {article.directeur.nom} {article.directeur.prenom}
                                                        <FaEdit
                                                            className="edit-icon"
                                                            size={15}
                                                            onClick={event => handleDetailsD(event, article.directeur)} />
                                                    </p>}

                                                    <Directeur show={DetailsDModelShow} directeur={dirid} onHide={DetailsDModelClose}></Directeur>

                                                </td>
                                                <td>{article.date_depot}</td>
                                                <td>{article.state}</td>


                                                <td>
                                                    {article.file && (
                                                        <FaDownload
                                                            className="download-icon"
                                                            onClick={() => forceDownload(article.file)}
                                                        />
                                                    )} </td>
                                                <td>
                                                    <FaTrash
                                                        className="trash-icon"
                                                        size={15}
                                                        onClick={event => handleDelete(event, article.id)}
                                                    />
                                                    <br />
                                                    <br />
                                                    <FaEdit
                                                        className="edit-icon"
                                                        size={15}
                                                        onClick={event => handleUpdate(event, article)}
                                                    />


                                                    <UpdateModelArticle show={updateModelShow} setUpdated={setIsUpdated} updatedart={updateArt} onHide={updateModelClose}></UpdateModelArticle>
                                                    <br />
                                                    <FaPen
                                                        className="edit-icon"
                                                        size={15}
                                                        onClick={event => handleUpdateArticleState(event, article)}
                                                    />
                                                </td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                            <button style={{marginTop:'5px'}} type="button" onClick={handleAdd} className="btn btn-success">Ajouter</button>
                        <AddModelArticle show={addModelShow} setUpdated={setIsUpdated} onHide={addModelClose}></AddModelArticle>
                  </div>
                         </div>
                </div>
            </div>
        );
    }
};

export default GererArticles;
