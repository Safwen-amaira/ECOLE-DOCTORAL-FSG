import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { FaUserEdit } from "react-icons/fa";
import axios from 'axios';
import { useState, useEffect } from 'react'
import UpdateChercheurModel from './UpdateChercheurModel';
import { node } from 'prop-types';
const DetailsChercheurModal = (props) => {
    const [chercheur, setChercheur] = useState(null)
    const navigate = useNavigate()
    const cin = props.cin
    useEffect(() => {
        const fetchchercheurDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api-chercheur/api/get_inscription/${cin}/`);
                setChercheur(response.data);
            } catch (error) {
            }
        };

        fetchchercheurDetails();
    }, [cin]);
    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };
    const [cinchercheur, setCin] = useState('');

    const [DetailsMOdelShow, setDetailsMOdelShow] = useState(false)
  let DetailsModelClose = () => setDetailsMOdelShow(false)
  const handleDetails = (e,cin) => {
    e.preventDefault();
    setCin(cin)
    setDetailsMOdelShow(true);
};
    return (
        <div className='container'>

        <Modal {...props} 
        size="lg" 
        aria-labelledby="contained-modal-title-vcenter"

        centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details Chercheur
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='EditButton'>
                    <button onClick={event => handleDetails(event,chercheur.cin)}>
                        <FaUserEdit style={{
                            position: 'absolute', marginLeft: '-19px',
                            marginTop: '2px'
                        }} /> Modifier
                    </button>
                </div>
                <div className='chercheurcontent'>


                    {chercheur !== null && (
                        <div>

                            <table style={{ marginLeft: "5%" }} className='chercher-table'>
                            <tr>
                                    <th>Image</th>
                                    <td>
                                    {chercheur.image ? (
                           <img height={100} width={90} src={`http://127.0.0.1:8000${chercheur.image}`} alt="Non-ajouté" />
                        
                        ) : <p>Non-ajouté</p>}                                        </td>
                                </tr>
                                <tr>
                                    <th>Nom de chercheur</th>
                                    <td>{chercheur.Nom}</td>
                                </tr>

                                <tr>
                                    <th>Prénom de chercheur</th>
                                    <td>{chercheur.Prenom}</td>
                                </tr>
                                <tr>
                                    <th>Cin / Passport de chercheur</th>
                                    <td>{chercheur.cin}</td>
                                </tr>
                                <tr>
                                    <th>Email de chercheur</th>
                                    <td>{chercheur.email}</td>
                                </tr>
                                <tr>
                                    <th>Numéro de Téléphone de chercheur</th>
                                    <td>{chercheur.tel}</td>
                                </tr>
                                <tr>
                                    <th>Date de naissance</th>
                                    <td>{chercheur.dateNaissance}</td>
                                </tr>
                                <tr>
                                    <th>Lieu de naissance</th>
                                    <td>{chercheur.lieuNaissance}</td>
                                </tr>
                                <tr>
                                    <th>Addresse de chercheur</th>
                                    <td>{chercheur.Address}</td>
                                </tr>
                                <tr>
                                    <th>Structure de Recherche</th>
                                    <td>{chercheur.StructureRecherche}</td>
                                </tr>
                                <tr>
                                    <th>Spécialité de chercheur</th>
                                    <td>{chercheur.specialite}</td>
                                </tr>
                                <tr>
                                    <th>Niveau de chercheur</th>
                                    <td>{chercheur.Niveau}</td>
                                </tr>
                                <tr>
                                    <th>Sujet de thèse de chercheur</th>
                                    <td>{chercheur.SujetThese}</td>
                                </tr>
                                <tr>
                                    <th>Type de thèse</th>
                                    <td>{chercheur.TypeThese}</td>
                                </tr>

                                <tr>
                                    <th>État de chercheur</th>
                                    <td>{chercheur.State}</td>
                                </tr>
                                <tr>
                                    <th>Premier Directeur de Thèse - Nom</th>
                                    <td>{chercheur.FirstDirTheseName}</td>
                                </tr>
                                <tr>
                                    <th>Premier Directeur de Thèse - Grade</th>
                                    <td>{chercheur.FirstDirTheseGrade}</td>
                                </tr>
                                <tr>
                                    <th>Premier Directeur de Thèse - Lieu de Travail</th>
                                    <td>{chercheur.FirstDirTheseLieuTravail}</td>
                                </tr>
                                <tr>
                                    <th>Premier Directeur de Thèse - Email</th>
                                    <td>{chercheur.FirstDirTheseEmail}</td>
                                </tr>
                                <tr>
                                    <th>Premier Directeur de Thèse - Téléphone</th>
                                    <td>{chercheur.FirstDirThesePhone}</td>
                                </tr>

                                {((chercheur.SecondDirTheseName !== 'null') && (chercheur.SecondDirTheseName !== null)) && (
                                    <>
                                        <tr>
                                            <th>Deuxième Directeur de Thèse - Nom</th>
                                            <td>{chercheur.SecondDirTheseName}</td>
                                        </tr>
                                        <tr>
                                            <th>Deuxième Directeur de Thèse - Grade</th>
                                            <td>{chercheur.SecondDirTheseGrade}</td>
                                        </tr>
                                        <tr>
                                            <th>Deuxième Directeur de Thèse - Lieu de Travail</th>
                                            <td>{chercheur.SecondDirTheseLieuTravail}</td>
                                        </tr>
                                        <tr>
                                            <th>Deuxième Directeur de Thèse - Email</th>
                                            <td>{chercheur.SecondDirTheseEmail}</td>
                                        </tr>
                                        <tr>
                                            <th>Deuxième Directeur de Thèse - Téléphone</th>
                                            <td>{chercheur.SecondDirThesePhone}</td>
                                        </tr>

                                    </>)}
                                {((chercheur.CoEncadrantName !== 'null') && (chercheur.CoEncadrantName !== null)) && (
                                    <>
                                        <tr>
                                            <th>Co-Encadrant   - Nom</th>
                                            <td>{chercheur.CoEncadrantName}</td>
                                        </tr>
                                        <tr>
                                            <th>Co-Encadrant    - Grade</th>
                                            <td>{chercheur.CoEncadrantGrade}</td>
                                        </tr>
                                        <tr>
                                            <th>Co-Encadrant   - Lieu de Travail</th>
                                            <td>{chercheur.CoEncadrantLieuTravail}</td>
                                        </tr>
                                        <tr>
                                            <th>Co-Encadrant    - Email</th>
                                            <td>{chercheur.CoEncadrantEmail}</td>
                                        </tr>
                                        <tr>
                                            <th>Co-Encadrant    - Téléphone</th>
                                            <td>{chercheur.CoEncadrantPhone}</td>
                                        </tr>

                                    </>)}

                                {chercheur.convention && (
                                    <>
                                        <th>Convention </th>
                                        <td><button onClick={() => forceDownload(chercheur.file)}>Télécharger</button></td>
                                    </>
                                )}
                            </table>
                        </div>
                    )}
                    <br></br>
                    <br /><br /><br />
                    <UpdateChercheurModel show={DetailsMOdelShow} cin={cinchercheur} onHide={DetailsModelClose}></UpdateChercheurModel>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}

export default DetailsChercheurModal
