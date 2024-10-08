import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getDoctorantUser, getAdminfUser, getAdminsUser, getAdmintUser, refreshDoctorant, refreshAdminf, refreshAdmins, refreshAdmint } from '../action/auth';
import './public/styles/changepassword.css';

const ChangePassword = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshDoctorant());
            dispatch(refreshAdminf());
            dispatch(refreshAdmins());
            dispatch(refreshAdmint());
        }
        dispatch(getDoctorantUser());
        dispatch(getAdminfUser());
        dispatch(getAdminsUser());
        dispatch(getAdmintUser());
    }, [dispatch]);

    const state = useSelector(state => state.auth);
    const [user, setUser] = useState({
        login: '',
        Npassword1: '',
        Npassword2: '',
        Apassword: ''
    });

    const handleChange = (e) => setUser({
        ...user,
        [e.target.name]: e.target.value
    });

    const { login, Npassword1, Npassword2, Apassword } = user;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Npassword1 !== Npassword2) {
            Swal.fire("Mot de passe n'est pas confirmé correctement");
        } else {
            const formData = new FormData();
            formData.append('login', state.user.login);
            formData.append('Npassword1', Npassword1);
            formData.append('Apassword', Apassword);

            Swal.fire({
                title: "Voulez-vous changer votre mot de passe ?",
                showDenyButton: true,
                confirmButtonText: "Confirmer",
                denyButtonText: "Annuler"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put('http://localhost:8000/auth/change-pwd/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        Swal.fire("Changé avec succès", "", "success");
                    })
                    .catch(err => {
                    });
                }
            });
        }
    };

    if (!state.isAuthenticated) {
        return <Navigate to={'/login'} />;
    } else {
        return (
            <div className="jjjcontainer">
                <div className="jjjform-container">
                    <h2>Changer le mot de passe</h2>
                    <div className="user-info">
                        <p>Utilisateur: {state.user.username}</p>
                        <p>Email: {state.user.email}</p>
                        <p>Login: {state.user.login}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="jjjform-group">
                            <label>Ancien mot de passe</label>
                            <input
                                type="password"
                                name="Apassword"
                                value={Apassword}
                                required
                                placeholder="Ancien mot de passe"
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="jjjform-group">
                            <label>Nouvelle mot de passe</label>
                            <input
                                type="password"
                                name="Npassword1"
                                value={Npassword1}
                                required
                                placeholder="Nouvelle mot de passe"
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="jjjform-group">
                            <label>Confirmer nouvelle mot de passe</label>
                            <input
                                type="password"
                                name="Npassword2"
                                required
                                value={Npassword2}
                                placeholder="Confirmer nouvelle mot de passe"
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <button className='jjjbutton' style={{margin:'-1px'}} type="submit">Comfirmer</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default ChangePassword;
