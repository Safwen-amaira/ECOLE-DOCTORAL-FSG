import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import DashboardHeader from '../DashboardHeader';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import { MdOutlineVerified } from "react-icons/md";
import Navigation from '../../Navigation';

const DemandesGeneralesAdminDetails = () => {

  const [demande, setDemande] = useState(null);
    const navigate=useNavigate()
    const { id } = useParams(); 

  useEffect(() => {
    const fetchDemandeDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api-demandes/get_demande_using_id/${id}/`); 
        setDemande(response.data);
      } catch (error) {
        console.error('Error fetching demand details:', error);
      }
    };

    fetchDemandeDetails();
  }, [id]); 

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
          label: 'pas encore',
          onClick: () => {} 
        }
      ]
    });
  };
  const handleAccept = () => {
    axios.put(`http://127.0.0.1:8000/api-demandes/update_demande_state/${id}/`, { new_state: 'Traité' })
      .then(response => {
        console.log('Demande state updated successfully');
      })
      .catch(error => {
        console.error('Error updating demande state:', error);
      });
  };
  const handleGoBack = () =>{
    navigate(-1)
  }
  return (
    <div  className='component'>
         
   
                    <div>
 <center>     <h2>Demande Details</h2>
 </center>
 <br/><br></br>
      <button className='Goback' onClick={handleGoBack}> Arrière</button>
      
      
      {demande ? (
<div>
        {demande.State==='En attente' && (<div> <div className='buttonaccept'>      <button onClick={handleShowConfirmDialog}> 
        
        <MdOutlineVerified className='yesIcon' size={19}/>Accepter</button></div></div>)}
        <div className='DetailsDemandesGenerales'>
    
                <table>
                    <tr>
                        <th>Nom de chercheur </th>
                        <td>{demande.nomChercheur}</td>
                    </tr>
                    <tr>
                        <th>Prenom de chercheur</th>
                        <td>{demande.prenomChercheur}</td>
                    </tr>
                    <tr>
                        <th>Cin / Passport de chercheur </th>
                        <td>{demande.cin}</td>
                    </tr>
                    <tr>
                        <th>   Date de naissance                 </th>
                        <td> {demande.dateNaissance}</td>
                    </tr>
                    <tr><th>Lieu de naissance</th> <td>{demande.lieuNaissance}</td></tr>
                    <tr>
                        <th> Type de demande </th>
                        <td>{demande.typeDemande}</td>
                    </tr>
                    <tr>
                        <th>Structure de Recherche </th>
                        <td>{demande.StructureRecherche}</td>
                    </tr>
                    <tr>
                        <th>Specialité de chercheur</th>
                        <td>{demande.specialite}</td>

                    </tr>
                    <tr>
                        <th>Niveau de chercheur</th>
                        <td>{demande.niveau}</td>
                    </tr>
                    <tr>
                        <th>Sujet de thèse de chercheur</th>
                        <td>{demande.SujetThese}</td>
                    </tr>           
                    <tr><th>Type de thèse</th><td>{demande.TypeThese}</td></tr>
                    <tr><th>Date de dépot de demande</th>
                    <td>{demande.DateDepot}</td></tr>
                    <tr><th>Etat de demande</th>
                    <td>{demande.State}</td></tr>
                </table>
            <br></br>

        </div>
    </div>  ) : ( 
        <p>Loading...</p>
      )}</div>
</div>    
  );
};

export default DemandesGeneralesAdminDetails;
