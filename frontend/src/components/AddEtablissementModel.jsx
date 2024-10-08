import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from "react-redux"
import { postHistorique } from '../services/service';

const AddEtablissementModel = (props) => {

    const state = useSelector(state => state.auth);

    const [etablissement, setEtablissement] = useState({
        nom: '',
        description: '',
        email: '',
        tel: '',
        fax: '',
        logo: null // Add logo field for file upload
    });

    const handleChange = (e) => {
        if (e.target.name === 'logo') {
            setEtablissement({
                ...etablissement,
                [e.target.name]: e.target.files[0]
            });
        } else {
            // Otherwise, update other fields as usual
            setEtablissement({
                ...etablissement,
                [e.target.name]: e.target.value
            });
        }
    };
    const { nom, description,  email, tel, fax , logo } = etablissement

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object to send file and other form data
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('description', description);
        formData.append('email', email);
        formData.append('tel', tel);
        formData.append('fax', fax);
        formData.append('logo', logo); // Append logo file
        Swal.fire({
            title: "Voulez-vous ajouter une Etablissement ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.post('http://localhost:8000/etablissement/details/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        props.setUpdated(true);
                        Swal.fire("Etablissement ajouté", "", "success");
                        const formData2 = new FormData();
                        formData2.append('user_admin', state.user.login);
                        formData2.append('action', 'a ajouté etablissement :' + nom);
                        postHistorique(formData2)
                        props.onHide();
                    })
                    .catch(error => {
                        Swal.fire("Veuillez vérifier vos données", "", "error");
                    });
                setEtablissement({
                    nom: '',
                    description: '',
                    email: '',
                    tel: '',
                    fax: '',
                    logo: null
                });
            }

        });
    };

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ajouter un établissement
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nom"
                            value={etablissement.nom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={etablissement.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={etablissement.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Téléphone</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="tel"
                            value={etablissement.tel}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Fax</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="fax"
                            value={etablissement.fax}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Logo</label>
                        <input
                            type="file"
                            className="form-control"
                            name="logo"
                            onChange={handleChange}
                        />
                    </div>
                    <Button variant="primary" type="submit">
                        Ajouter
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEtablissementModel;
