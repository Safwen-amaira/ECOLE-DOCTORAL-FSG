import React from 'react'
import { getFormationsSimple, getFormationsPedagogique } from '../services/service'
import '../App.css'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaDownload } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { getAdminfUser, getAdminsUser, getAdmintUser, refreshAdminf, refreshAdmins, refreshAdmint } from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import FormationSimpleModal from './FormationSimpleModal'
import FormationPedaModel from './FormationPedaModel';
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'


const GererFormation = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshAdminf());

        }


        dispatch(getAdminfUser())

    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [updatefor, setUpdateFor] = useState([]);
    const [detailsSimpleModelShow, setdetailsSimpleModelShow] = useState(false)
    const [detailsPedaModelShow, setdetailsPedaModelShow] = useState(false)


    const [formationsSimple, setFormationsSimple] = useState([]);
    const [formationsPeda, setFormationsPeda] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)



    useEffect(() => {
        let mounted = true;
        if (formationsSimple.length && formationsPeda.length && !isUpdated) {
            return
        }
        getFormationsSimple().then(data => {
            if (mounted) {
                setFormationsSimple(data)
            }
        })
        getFormationsPedagogique().then(data => {
            if (mounted) {
                setFormationsPeda(data)
            }
        })
        return () => {
            mounted = false
            setIsUpdated(false)
        };
    }, [isUpdated, formationsPeda, formationsSimple]);
    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };
    const handleDeleteSimple = (e, id) => {
        //if(window.confirm('Are you sure ?')){
        e.preventDefault();
        Swal.fire({
            title: "Voulez-vous supprimer cette formation ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/formation/simple/' + id + '/')
                    .then((result) => {
                        Swal.fire("Supptimer avec success","","success")
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé formation ');
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
    const handleDeletePeda = (e, id) => {
        //if(window.confirm('Are you sure ?')){
        e.preventDefault();
        Swal.fire({
            title: "Voulez-vous supprimer cette formation ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/formation/pedagogique/' + id + '/')
                    .then((result) => {
                        Swal.fire("supprimer  avec success","","success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.username);
                        formData2.append('action', 'a supprimé formation ');
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
    const handleUpdateSimple = (e, formation) => {
        e.preventDefault();
        const formData = new FormData();
        if (formation.state == 'Validé') {
            formData.append('state', 'Non-Validé');
        } else {
            formData.append('state', 'Validé');
        }





        Swal.fire({
            title: "Voulez-vous modifier  State de cette formation ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://127.0.0.1:8000/formation/simple/' + formation.id + '/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        Swal.fire("modifier avec success ", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.username);
                        formData2.append('action', 'a modifié status de formation (' + formation.titre + ')');
                        postHistorique(formData2)
                        setIsUpdated(true);
                    })
                    .catch(err => {
                    });
            }

        });


    };
    const handleDetailsSimple = (e, fr) => {
        e.preventDefault();
        setdetailsSimpleModelShow(true);
        setUpdateFor(fr);
    };
    const handleDetailsPeda = (e, fr) => {
        e.preventDefault();
        setdetailsPedaModelShow(true);
        setUpdateFor(fr);
    };

    let detailsSimpleModelClose = () => setdetailsSimpleModelShow(false)
    let detailsPedaModelClose = () => setdetailsPedaModelShow(false)


    const handleUpdatePeda = (e, formation) => {
        e.preventDefault();
        const formData = new FormData();
        if (formation.state == 'Validé') {
            formData.append('state', 'Non-Validé');
        } else {
            formData.append('state', 'Validé');
        }
        setIsUpdated(true);





        Swal.fire({
            title: "Voulez-vous modifier  State de cette formation Pédagogique?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://127.0.0.1:8000/formation/pedagogique/' + formation.id + '/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        Swal.fire("modifier avec success ", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.username);
                        formData2.append('action', 'a modifié status de formation (' + formation.titre + ')');
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

                <div className='d-flex p-2' style={{
            margin: '4px',
            padding: '4px',
            width: '1000px',
            height: '690px',
            overflowX: 'hidden',
            overflowY: 'auto',
            textAlign: 'justify'
          }} >
                    <div className="vstack gap-3">
                        <div className="bg-light border"><h2 className="alert alert-success">Liste des Formation Scientifique et Generale</h2></div>
                        <div className="bg-light border">
                            <table style={{ marginLeft: '10px' }}>

                                <thead>
                                    <tr>
                                        <th>nom</th>
                                        <th>prenom</th>

                                        <th> nom_formation</th>

                                        <th>type</th>

                                        <th>date_creation </th>
                                        <th> state</th>
                                        <th>Certificat</th>
                                        <th>action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {formationsSimple.map((formation) =>
                                        <tr key={formation.id}>
                                            {formation.chercheur ? (
                                           <> <td>{formation.chercheur.Nom}</td>
                                            <td>{formation.chercheur.Prenom}</td>
                                         </>) : null}
                                            <td>{formation.nom_formation}</td>

                                            <td>{formation.type}</td>

                                            <td>{formation.date_creation}</td>
                                            <td> {formation.state}</td>
                                            <td>{formation.file && (
                                                <FaDownload
                                                    className="download-icon"
                                                    onClick={() => forceDownload(formation.file)}
                                                />
                                            )} </td>
                                            <td>
                                                <FaTrash
                                                    className="trash-icon"
                                                    size={15}
                                                    onClick={event => handleDeleteSimple(event, formation.id)}
                                                />
                                                <br />
                                                <br />
                                                <FaEdit
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleUpdateSimple(event, formation)}
                                                />
                                                <br />
                                                <FaEye
                                                    className="eyes-icon"
                                                    size={15}
                                                    onClick={event => handleDetailsSimple(event, formation)}
                                                />
                                                <FormationSimpleModal show={detailsSimpleModelShow} setUpdated={setIsUpdated} updatedformation={updatefor} onHide={detailsSimpleModelClose}></FormationSimpleModal>


                                            </td>


                                        </tr>)}
                                </tbody>

                            </table></div>
                        <div className="bg-light border">   <h2 className="alert alert-success">Liste des Formation Pédagogique</h2>
                        </div>
                        <div className="bg-light border">
                            <table style={{ marginLeft: '9px' }}>

                                <thead>
                                    <tr>
                                        <th>nom</th>
                                        <th>prenom</th>

                                        <th> nom_formation</th>

                                        <th>date creation </th>
                                        <th> state</th>
                                        <th>Certificat</th>
                                        <th>action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {formationsPeda.map((formationPeda) =>
                                        <tr key={formationPeda.id}>
                                   {formationPeda.chercheur?(
                                           <> 
                                           <td>{formationPeda.chercheur.Nom}</td>
                                            <td>{formationPeda.chercheur.Prenom}</td>
                                         </>) : <><td></td><td></td></>}
                                            <td>{formationPeda.nom_formation}</td>

                                            <td>{formationPeda.date_creation}</td>
                                            <td> {formationPeda.state}</td>
                                            <td>{formationPeda.file && (
                                                <FaDownload
                                                    className="download-icon"
                                                    onClick={() => forceDownload(formationPeda.file)}
                                                />
                                            )} </td>
                                            <td>
                                                <FaTrash
                                                    className="trash-icon"
                                                    size={15}
                                                    onClick={event => handleDeletePeda(event, formationPeda.id)}
                                                />
                                                <br />
                                                <br />
                                                <FaEdit
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleUpdatePeda(event, formationPeda)}
                                                />
                                                <br />
                                                <FaEye
                                                    className="eyes-icon"
                                                    size={15}
                                                    onClick={event => handleDetailsPeda(event, formationPeda)}
                                                />
                                                <FormationPedaModel show={detailsPedaModelShow} setUpdated={setIsUpdated} updatedformation={updatefor} onHide={detailsPedaModelClose}></FormationPedaModel>


                                            </td>


                                        </tr>)}
                                </tbody>

                            </table></div>
                    </div>



                </div>
            </div>
        )
    }

}
export default GererFormation
