import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useSelector } from "react-redux"

import { FaDownload } from 'react-icons/fa';
import { FcCheckmark } from "react-icons/fc";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate, useParams } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { MdOutlineVerified } from "react-icons/md";
import { create_doctorantuser } from '../../../action/auth'
import Swal from 'sweetalert2';
import { PropTypes } from 'prop-types'


const DemandePreInscriptionAdminDetails = ({ create_doctorantuser ,cin}) => {
  //generate password

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let generatedPassword = '';
  for (let i = 0; i < 10; i++) {
    generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  ///here


  const [demande, setDemande] = useState({});

  const navigate = useNavigate()
  const [id, setId] = useState('');



  useEffect(() => {
    const fetchDemandeDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api-chercheur/api/get_inscription/${cin}/`);
        setDemande(response.data);
        console.log('demande:', response.data);
        setId(response.data.id);
      } catch (error) {
        console.error('Error fetching demand details:', error);
      }
    };

    fetchDemandeDetails();
  }, []);
  console.log('demande 2222222:', demande.Etablissement, demande.Nom + ' ' + demande.Prenom, demande.cin, demande.email);


  const handleShowConfirmDialog = () => {
    confirmAlert({
      title: "Confirmation ",
      message: 'est-ce-que vous avez vraiment traité  cette demande?',
      buttons: [
        {
          label: 'oui',
          onClick: handleAccept
        },
        {
          label: 'Non',
          onClick: () => { }
        }
      ]
    });
  };
  const handleShowConfirmRefuse = () => {
    confirmAlert({
      title: "Confirmation ",
      message: 'est-ce-que vous êtes sure de refuser cette demande?',
      buttons: [
        {
          label: 'Oui',
          onClick: handleRefuse
        },
        {
          label: 'Non',
          onClick: () => { }
        }
      ]
    });
  };
  const state = useSelector(state => state.auth);

  const handleRefuse = () => {
    axios.put(`http://127.0.0.1:8000/api-chercheur/update_inscription/${id}/`, { State: 'Refused' ,admin:state.user.login,action:'refuser'})
      .then(response => {
        console.log('Demande state updated successfully');
        Swal.fire("Refusé avec success","","error")
      })
      .catch(error => {
        console.error('Error updating demande state:', error);

      });
  }
  const handleAccept = () => {
    axios.put(`http://127.0.0.1:8000/api-chercheur/update_inscription/${id}/`, { State: 'Accepted' ,admin:state.user.login,action:'accepter' })
      .then(() => {
        const { Etablissement, Nom, Prenom, cin, email } = demande;
        const username = `${Nom} ${Prenom}`; // Créer un nom d'utilisateur à partir du nom et du prénom
        // Définir les données du nouvel utilisateur avec les informations nécessaires
        const newuser = {
          etablissement: Etablissement,
          username: username,
          email: email,
          login: cin,
          password: generatedPassword,
          password2: generatedPassword
        };

        console.log('newUser', newuser)
        // Appeler la fonction pour créer le nouvel utilisateur avec les données directement
        create_doctorantuser(newuser);
        Swal.fire('Accepté avec success', '', 'success')
      }).catch(error => {
        console.error('Error updating demande state:', error);
      });


  };
  const forceDownload = (file) => {
    window.open('http://127.0.0.1:8000/' + file, '_blank');
};
  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <div className='component'>


      <div>
        <h2>Demande Details</h2><br /><br></br>
        <button className='Gobackbuttonere' onClick={handleGoBack}> Arrière</button>


       
          <div>

            <div className='Details'>


              <table className='content-Tables' style={{ marginLeft: '20px' }}>
                <tr>
                  <th>Nom de chercheur</th>
                  <td>{demande.Nom}</td>
                </tr>
                <tr>
                  <th>Prénom de chercheur</th>
                  <td>{demande.Prenom}</td>
                </tr>
                <tr>
                  <th>Cin / Passport de chercheur</th>
                  <td>{demande.cin}</td>
                </tr>
                <tr>
                  <th>Email de chercheur</th>
                  <td>{demande.email}</td>
                </tr>
                <tr>
                  <th>Numéro de Téléphone de chercheur</th>
                  <td>{demande.tel}</td>
                </tr>
                <tr>
                  <th>Date de naissance</th>
                  <td>{demande.dateNaissance}</td>
                </tr>
                <tr>
                  <th>Lieu de naissance</th>
                  <td>{demande.lieuNaissance}</td>
                </tr>
                <tr>
                  <th>Addresse de chercheur</th>
                  <td>{demande.Address}</td>
                </tr>
                <tr>
                  <th>Structure de Recherche</th>
                  <td>{demande.StructureRecherche}</td>
                </tr>
                <tr>
                  <th>Spécialité de chercheur</th>
                  <td>{demande.specialite}</td>
                </tr>
                <tr>
                  <th>Niveau de chercheur</th>
                  <td>{demande.Niveau}</td>
                </tr>
                <tr>
                  <th>Sujet de thèse de chercheur</th>
                  <td>{demande.SujetThese}</td>
                </tr>
                <tr>
                  <th>Type de thèse</th>
                  <td>{demande.TypeThese}</td>
                </tr>

                <tr>
                  <th>État de demande</th>
                  <td>{demande.State}</td>
                </tr>
                <tr>
                  <th>Premier Directeur de Thèse - Nom</th>
                  <td>{demande.FirstDirTheseName}</td>
                </tr>
                <tr>
                  <th>Premier Directeur de Thèse - Grade</th>
                  <td>{demande.FirstDirTheseGrade}</td>
                </tr>
                <tr>
                  <th>Premier Directeur de Thèse - Lieu de Travail</th>
                  <td>{demande.FirstDirTheseLieuTravail}</td>
                </tr>
                <tr>
                  <th>Premier Directeur de Thèse - Email</th>
                  <td>{demande.FirstDirTheseEmail}</td>
                </tr>
                <tr>
                  <th>Premier Directeur de Thèse - Téléphone</th>
                  <td>{demande.FirstDirThesePhone}</td>
                </tr>

                {((demande.SecondDirTheseName !== 'null') && (demande.SecondDirTheseName !== null)) && (
                  <>
                    <tr>
                      <th>Deuxième Directeur de Thèse - Nom</th>
                      <td>{demande.SecondDirTheseName}</td>
                    </tr>
                    <tr>
                      <th>Deuxième Directeur de Thèse - Grade</th>
                      <td>{demande.SecondDirTheseGrade}</td>
                    </tr>
                    <tr>
                      <th>Deuxième Directeur de Thèse - Lieu de Travail</th>
                      <td>{demande.SecondDirTheseLieuTravail}</td>
                    </tr>
                    <tr>
                      <th>Deuxième Directeur de Thèse - Email</th>
                      <td>{demande.SecondDirTheseEmail}</td>
                    </tr>
                    <tr>
                      <th>Deuxième Directeur de Thèse - Téléphone</th>
                      <td>{demande.SecondDirThesePhone}</td>
                    </tr>

                  </>)}
                {((demande.CoEncadrantName !== 'null') && (demande.CoEncadrantName !== null)) && (
                  <>
                    <tr>
                      <th>Co-Encadrant   - Nom</th>
                      <td>{demande.CoEncadrantName}</td>
                    </tr>
                    <tr>
                      <th>Co-Encadrant    - Grade</th>
                      <td>{demande.CoEncadrantGrade}</td>
                    </tr>
                    <tr>
                      <th>Co-Encadrant   - Lieu de Travail</th>
                      <td>{demande.CoEncadrantLieuTravail}</td>
                    </tr>
                    <tr>
                      <th>Co-Encadrant    - Email</th>
                      <td>{demande.CoEncadrantEmail}</td>
                    </tr>
                    <tr>
                      <th>Co-Encadrant    - Téléphone</th>
                      <td>{demande.CoEncadrantPhone}</td>
                    </tr>

                  </>)}
                {demande.convention !== 'null' && demande.convention !== null && (
                  <tr>
                    <th>Convention </th>
                    <td><FaDownload
                      className="download-icon"
                      onClick={() => forceDownload(demande.convention, demande.title)}
                    /></td>
                  </tr>
                )}
                <tr>
                  <th>Action</th>
                  <td>{demande.State === 'En attente' && (
                    <div>
                      <div className='buttonaccepting'>
                        <span onClick={handleAccept} style={{ backgroundColor: 'green', padding: '5px', borderRadius: '5px' }}>
                          <MdOutlineVerified size={24} className='iconYes' />
                          Accepter
                        </span>                      </div><br />
                      <div className='buttonRefus'>
                        <span onClick={handleRefuse} style={{ backgroundColor: 'red', padding: '5px', borderRadius: '5px' }}>
                          <RxCross2 size={24} className='iconNo' />
                          Refuser
                        </span>                      </div>

                    </div>

                  )}
                 
                
                  </td>
                </tr>
              </table>
              <br></br>

            </div>
          </div></div>
    </div>
  );
};

DemandePreInscriptionAdminDetails.propTypes = {
  create_doctorantuser: PropTypes.func.isRequired,



}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdminf: state.auth.isAdminf,
  isAdmins: PropTypes.bool,
  isAdmint: PropTypes.bool,
  isDoctorant: PropTypes.bool
})
export default connect(mapStateToProps, { create_doctorantuser })(DemandePreInscriptionAdminDetails)