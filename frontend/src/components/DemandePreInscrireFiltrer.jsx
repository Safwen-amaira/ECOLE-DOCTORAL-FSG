import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { getAdminfUser, getAdminsUser, getAdmintUser, refreshAdminf, refreshAdmins, refreshAdmint } from '../action/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavDashboard/NavBar';
import DetailsDemandeInscriptionModel from './DetailsDemandeInscriptionModel';
const DemandePreInscrireFiltrer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(refreshAdmint());

    }


    dispatch(getAdmintUser())

  }, [dispatch])
  const state = useSelector(state => state.auth);
  const [demandes, setDemandes] = useState([]);
  const [filter, setFilter] = useState('En attente');

  const [cinchercheur, setCinChercheur] = useState('')

  const [addModelShow, setAddMOdelShow] = useState(false)
  const handleAdd = (cin) => {
    setCinChercheur(cin)
    setAddMOdelShow(true);
  };
  let addModelClose = () => setAddMOdelShow(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api-chercheur/get_all_inscriptions/');
        setDemandes(response.data);
      } catch (error) {
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const doFilter = () => {
      const filtered = demandes.filter(demande => demande.Etablissement === state.user.etablissement);
      // Sort by date_soutenu in descending order
      setDemandes(filtered);
    };
    doFilter();
  }, []);
  const handleredirect = (cin) => {
    var url = `/get-more-info-about-pre-inscription-demande/${cin}/`;
    window.location.href = url;
  };
  if (state.isLoading) {
    return <h3>Loading....</h3>;
  } else if (!state.isAuthenticated || !state.isAdmint) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <NavBar />
        <div className='d-flex p-2'>
          <div className="vstack gap-3">
            <div className="bg-light border">
              <p>filtrer selon</p>
              <select on onChange={(e) => setFilter(e.target.value)}>
                <option value='En attente'>En attente</option>
                <option value='Accepted'>Acceptées</option>
                <option value='Refused'>Refusées</option>
              </select>
            </div>


            <div className="bg-light border">
              <table style={{ marginLeft: '10px' }}>
                <thead>
                  <tr>
                    <th scope="col">Nom de chercheur</th>
                    <th scope="col">Cin / passport de chercheur</th>
                    <th scope="col">Sujet de thèse</th>
                    <th scope="col">Structure de recherche </th>
                    <th scope="col">Specialité</th>
                    <th scope="col">Etat de demande</th>
                    <th scope="col">Action</th>



                  </tr>
                </thead>
                {demandes.map((demande) => (
                  ((demande.State === 'En attente') && (filter === 'En attente')) &&
                  (


                    <tbody>

                      <tr key={demande.id} >

                        <td >{demande.Nom} {demande.Prenom}
                        </td>
                        <td>{demande.cin}</td>

                        <td>{demande.SujetThese} </td>
                        <td>{demande.StructureRecherche}</td>
                        <td>{demande.specialite}</td>
                        <td>{demande.State} </td>
                        <td>  <FaEye
                          className="eyes-icon"
                          size={15}
                          onClick={() => handleAdd(demande.cin)}
                        />                          <DetailsDemandeInscriptionModel show={addModelShow} cin={cinchercheur} onHide={addModelClose}></DetailsDemandeInscriptionModel>
                        </td>


                      </tr>

                    </tbody>
                  )
                ))}
                {demandes.map((demande) => (
                  ((demande.State === 'Accepted') && (filter === 'Accepted')) &&
                  (


                    <tbody>
                      <tr className='Table-Content' key={demande.id} >
                        <td>{demande.Nom} {demande.Prenom} </td>
                        <td>{demande.cin}</td>

                        <td>{demande.SujetThese} </td>
                        <td>{demande.StructureRecherche}</td>
                        <td>{demande.specialite}</td>
                        <td>{demande.State} </td>
                        <td><FaEye
                          className="eyes-icon"
                          size={15}
                          onClick={() => handleAdd(demande.cin)} />
                          <DetailsDemandeInscriptionModel show={addModelShow} cin={cinchercheur} onHide={addModelClose}></DetailsDemandeInscriptionModel>

                        </td>


                      </tr>
                    </tbody>
                  )
                ))}
                {demandes.map((demande) => (
                  ((demande.State === 'Refused') && (filter === 'Refused')) &&
                  (


                    <tbody>
                      <tr className='Table-Content' key={demande.id} >
                        <td>{demande.Nom} {demande.Prenom}</td>
                        <td>{demande.cin}</td>

                        <td>{demande.SujetThese} </td>
                        <td>{demande.StructureRecherche}</td>
                        <td>{demande.specialite}</td>
                        <td>{demande.State} </td>
                        <td><FaEye
                          className="eyes-icon"
                          size={15}
                          onClick={() => handleAdd(demande.cin)} />
                          <DetailsDemandeInscriptionModel show={addModelShow} cin={cinchercheur} onHide={addModelClose}></DetailsDemandeInscriptionModel>

                        </td>


                      </tr>
                    </tbody>
                  )
                ))}
              </table>

            </div>
          </div>
        </div>

      </div>
    )
  }
};

export default DemandePreInscrireFiltrer
