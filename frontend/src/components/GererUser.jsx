import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getUsers } from '../services/service';
import AddUserModel from './AddUserModel';
import UpdateModelUser from './UpdateModelUser';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { getAdminfUser, getAdminsUser, getAdmintUser, refreshAdminf, refreshAdmins, refreshAdmint } from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'


const GererUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshAdminf());
            dispatch(refreshAdminf());


        }


        dispatch(getAdminfUser())

    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [etablissementFilter, setEtablissementFilter] = useState('');
    const [addModelShow, setAddMOdelShow] = useState(false)
    const [updateModelShow, setUpdateMOdelShow] = useState(false)
    const [updateuser, setUpdateUser] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)


    const handleDelete = (e, login) => {
        //if(window.confirm('Are you sure ?')){
        e.preventDefault();
        Swal.fire({
            title: "Voulez-vous supprimer cette User ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/auth/user/' + login + '/')
                    .then((result) => {
                        Swal.fire("supprimer  avec success", "", "success");
                        const formData2 = new FormData();
                        formData2.append('admin_name', state.user.login);
                        formData2.append('action', 'a supprimé utilisateur ');
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

    const handleUpdate = (e, user) => {
        e.preventDefault();
        setUpdateMOdelShow(true);
        setUpdateUser(user);
    };
    let addModelClose = () => setAddMOdelShow(false)
    let updateModelClose = () => setUpdateMOdelShow(false)
    useEffect(() => {
        let mounted = true;
        if (users.length && !isUpdated) {
            return
        }
        getUsers().then(data => {
            if (mounted) {
                setUsers(data)
            }
        })
        return () => {
            mounted = false
            setIsUpdated(false)
        };
    }, [isUpdated, users]);

    const handleFilter = (e) => {
        const { value } = e.target;
        setEtablissementFilter(value);
        if (value) {
            const filtered = users.filter(user => user.etablissement.toLowerCase().includes(value.toLowerCase()));
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
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
                        <h2 className="alert alert-success">Liste des Users</h2>
                        <div className="w-25 p-3">
                            <select
                                className="form-select"
                                value={etablissementFilter}
                                onChange={handleFilter}
                            >
                                <option value="">Tous les établissements</option>
                                <option value="FSG">FSG</option>
                                <option value="ISSTEG">ISSTEG</option>
                                <option value="IRA">IRA</option>
                                <option value="ISBAM">ISBAM</option>
                            </select>
                        </div>
                        <div className="bg-light border">
                            <table style={{ marginLeft: '10px' }} >
                                <thead>
                                    <tr>

                                        <th scope="col">username</th>
                                        <th scope="col">login</th>
                                        <th scope="col">etablissement</th>
                                        <th scope="col">email</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {(etablissementFilter ? filteredUsers : users).map((user) =>
                                        <tr key={user.login}>
                                            <td>{user.username}</td>
                                            <td>{user.login}</td>
                                            <td>{user.etablissement}</td>
                                            <td>{user.email}</td>
                                            <td><FaTrash
                                                className="trash-icon"
                                                size={15}
                                                onClick={event => handleDelete(event, user.login)} />
                                                <br />
                                                <br />
                                                <FaEdit
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleUpdate(event, user)} />

                                                <UpdateModelUser show={updateModelShow} setUpdated={setIsUpdated} updateduser={updateuser} onHide={updateModelClose}></UpdateModelUser>

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <button style={{margin:'20px'}} type="button" onClick={handleAdd} className="btn btn-success">Ajouter</button>
                        <AddUserModel show={addModelShow} setUpdated={setIsUpdated} onHide={addModelClose}></AddUserModel>
                    </div>
                </div>
            </div>
        );
    }
};


export default GererUser
