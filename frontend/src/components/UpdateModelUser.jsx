import React, { useState } from 'react'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { postHistorique } from '../services/service';

import { useSelector } from "react-redux"
const UpdateModelUser = (props) => {
    
    const state = useSelector(state => state.auth);

    const [user, setUser] = useState({
        etablissement: '',
        username: '',
        email: '',
        login: ''
    })
    
    const handleChange = (e) => {
            // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        
    };
    const { etablissement, username, email, login } = user
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (etablissement !== '') {
            formData.append('etablissement', etablissement);
        }

        if (username!== '') {
            formData.append('username', username);
        }
        if (email !== '') {
            formData.append('email', email);
        }
        if (login !== '') {
            formData.append('login', login);
        }
       

        Swal.fire({
            title: "Voulez-vous modifier cette user ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://127.0.0.1:8000/auth/user/' + props.updateduser.login + '/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true)
                        Swal.fire("modifier avec success ", "", "success");
                        const formData2 = new FormData();
                            formData2.append('admin_name', state.user.login);
                            formData2.append('action', 'a modifié utilisateur ('+props.updateduser.username+')');
                            postHistorique(formData2)

                        
                        props.onHide();
                    })
                    .catch(err => {
                    });
            }

        });


    };
    return (
        <div className='container'>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Fill In User Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <h2>Modifier une User</h2>
                        <div className='row'>
                            <div className='col-md-8 mx-auto'>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className='form-group mb-3'>
                                        <label>etablissement</label>
                                        <input type='text'
                                            className='form-control'
                                            name='etablissement'
                                            defaultValue={props.updateduser.etablissement}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>username</label>
                                        <textarea
                                            className='form-control'
                                            name='username'
                                            defaultValue={props.updateduser.username}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>email</label>
                                        <input type='text'
                                            className='form-control'
                                            name='email'
                                            defaultValue={props.updateduser.email}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>login</label>
                                        <input type='text'
                                            className='form-control'
                                            name='login'
                                            defaultValue={props.updateduser.login}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Soumettre</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}





export default UpdateModelUser
