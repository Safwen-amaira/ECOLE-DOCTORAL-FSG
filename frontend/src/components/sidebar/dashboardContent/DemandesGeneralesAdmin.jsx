import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import {  getAdminfUser,getAdminsUser,getAdmintUser,refreshAdminf,refreshAdmins,refreshAdmint} from '../../../action/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import NavBar from '../../NavDashboard/NavBar';
const DemandesGeneralesAdmin = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshAdminf());
            dispatch(refreshAdmins());


        }


        dispatch(getAdminfUser())
        dispatch(getAdminsUser())


    }, [dispatch])
    const state = useSelector(state => state.auth);
    const [demandes, setDemandes] = useState([]);
    const [selectedDemande, setSelectedDemande] = useState(null);
    const [chercher, setChercher] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api-demandes/get_all_demandes/');
                setDemandes(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        fetchData();
        fetchData();


    }, []);

    const handleViewDetails = async (demande) => {
        setSelectedDemande(demande);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api-chercheur/api/get_inscription/${selectedDemande.chercheur.cin}`);
            setChercher(response.data);

            Swal.fire({
                title: 'Détails de la demande',
                html: `
                    <div>
                        <p><strong>Nom:</strong> ${chercher.Nom}</p>
                        <p><strong>Prénom:</strong> ${chercher.Prenom}</p>
                        <p><strong>CIN:</strong> ${chercher.cin}</p>
                        <p><strong>Type de these:</strong> ${chercher.TypeThese}</p>
                        <p><strong>Sujet de these:</strong> ${chercher.SujetThese}</p>
                        <p><strong>Spécialité:</strong> ${chercher.specialite}</p>
                        <p><strong>Date de naissance:</strong> ${chercher.dateNaissance}</p>
                        <p><strong>Lieu de naissance:</strong> ${chercher.lieuNaissance}</p>
                        <p><strong>Adresse:</strong> ${chercher.Address}</p>
                        <p><strong>Type de demande:</strong> ${demande.typeDemande}</p>
                        <p><strong>Date de dépot de demande :</strong> ${demande.DateDepot}</p>
                        <p><strong>Etat de demande:</strong> ${chercher.State}</p>
                        <p><strong>Nombres des copies:</strong> ${demande.nbCopie}</p>
                        <p><strong>Langage des copies:</strong> ${demande.Langue}</p

                    </div>
                `,
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: demande.state === 'en attente' ? 'Traité' : 'Ok .',
                cancelButtonText: 'Annuler',
                cancelButtonColor: '#d33',

                reverseButtons: true, // To swap confirm and cancel buttons
            }).then((result) => {
                if (result.isConfirmed) {
                  
                    // If the user confirms, show another confirmation


                    Swal.fire({
                        title: 'Êtes-vous sûr?',
                        text: 'Voulez-vous vraiment traité cette demande ?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Oui',
                        cancelButtonText: 'Non',
                        cancelButtonColor: '#d33',
                    }).then((result) => {
                        if (result.isConfirmed) {
                       
                          handleAccept(selectedDemande.id)
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error fetching chercher data:', error);
            Swal.fire('Erreur !', 'Une erreur s\'est produite lors de la récupération des données.', 'error');
        }
    };


    const handleAccept = (id) => {
      axios.put(`http://127.0.0.1:8000/api-demandes/update_demande_state/${id}/`, { new_state: 'Traité' })
          .then(response => {
              console.log('Demande state updated successfully');


              
              // Refresh the list of demandes after updating
              fetchData();
          })
          .catch(error => {
              console.error('Error updating demande state:', error);
          });
  };
  if (state.isLoading) {
    return <h3>Loading....</h3>;
} else if (!state.isAuthenticated || state.isAdmint || state.isDoctorant ) {
    return <Navigate to="/login" />;
} else {
    return (
        <div>
                <NavBar />
        <div className='d-flex p-2'>
            <div className="vstack gap-3">
                <div className="bg-light border"><h2 className="alert alert-success">Liste des demandes </h2></div>
                <div className="bg-light border">
                    <table style={{ marginLeft: '10px' }}>
                        <thead>
                            <tr>
                                <th>type de demande</th>
                                <th>cin</th>
                                <th>date_creation</th>
                                <th>state</th>
                                <th>Nombre des copies</th>
                                <th>Langue des copies</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandes.map((demande) => (
                                <tr key={demande.id}>
                                    <td>{demande.typeDemande}</td>
                                    <td>{demande.chercheur && demande.chercheur.cin}</td>
                                    <td>{demande.DateDepot}</td>
                                    <td>{demande.State}</td>
                                    <td>{demande.nbCopie}</td>
                                    <td>{demande.Langue}   </td>
                                    <td>
                                        <FaEye
                                            className="eyes-icon"
                                            size={15}
                                            onClick={() => handleViewDetails(demande)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
}
};

export default DemandesGeneralesAdmin;
