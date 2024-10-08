import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Header from './public/Header';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom';
import { getDoctorantUser, refreshDoctorant } from '../action/auth'
import { postHistorique } from '../services/service';
import NavBar from './NavDashboard/NavBar'


const DemandeChercheur = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(refreshDoctorant());

    }


    dispatch(getDoctorantUser())
  }, [dispatch])

  const state = useSelector(state => state.auth);


  const [addNewDemande, setAddNewDemande] = useState(false)
  const [demandes, setDemandes] = useState([{}])
  const [demande, setDemande] = useState({
    typeDemande: '',
    Langue: '',
    nbCopie: '',
    cin: ''

  })



  const handleChange = (e) => {


    // Sinon, mettez à jour l'état directement avec la valeur du champ de texte
    setDemande({
      ...demande,
      [e.target.name]: e.target.value
    })

  };

  const { typeDemande, cin, Langue, nbCopie } = demande
  const down = useRef(null)
  const up = useRef(null)

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const handleSubmit = (e) => {
    e.preventDefault();



    const dataForm = new FormData()
    dataForm.append('typeDemande', typeDemande);
    dataForm.append('cin', state.user.login);
    dataForm.append('Langue', Langue);
    dataForm.append('nbCopie', nbCopie);

    Swal.fire({
      title: "Voulez-vous ajouter une Demande ?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Confirmer",
      denyButtonText: "Annuler"
    }).then((result) => {

      if (result.isConfirmed) {
        axios.post('http://127.0.0.1:8000/api-demandes/create_new_demande/', dataForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {

            Swal.fire("Demande ajouter  ", "", "success")
            const formData2 = new FormData();
            formData2.append('user_name', state.user.username);
            formData2.append('action', 'a ajouté Demande ');
            postHistorique(formData2)
          })
          .catch(err => {
          });
        setDemande({
          typeDemande: '',

          Langue: '',
          nbCopie: ''

        });
      }

    });




  }



  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const responseDemandes = await axios.get(`http://127.0.0.1:8000/api-demandes/get_users_demande/${state.user.login}`)
        setDemandes(responseDemandes.data)
        console.log(demandes)
      } catch (error) {
        console.error('error while fetchig data : ', error);


      }
    };
    fetchDemandes();


    const interval = setInterval(() => {
      fetchDemandes()
    }, 15000) /* kol 1000 = 1 second ta9riban (overloading server mais perfermance extreme)  */


    return () => clearInterval(interval)
  }, [cin]);


  const Ajout = async () => {
    setAddNewDemande(true)
    await timeout(100)
    down.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const Annule = async () => {
    setAddNewDemande(false)
    setDemande({
      typeDemande: '',

      Langue: '',
      nbCopie: ''

    });
    await timeout(100)
    up.current.scrollIntoView({ behavior: "smooth" });
  }

  if (state.isLoading) {
    return <h3>Loading....</h3>;
  } else if (!state.isAuthenticated || !state.isDoctorant) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
              <NavBar/>

      <div className='d-flex p-2' ref={up}>

        <div className="vstack gap-3">

          <div className="bg-light border">
            {demandes[1] === null && (<div >
              <table style={{ marginLeft: '10px' }}>
                <tr>
                  <th style={{ textAlign: 'center' }}> pas de demandes  pour l'instant </th>
                </tr>
              </table>
            </div>)}
            {demandes[1] !== null && (<div >
              <h5>
              </h5>
              <table style={{ marginLeft: '10px' }}>
                <thead>
                  <tr>
                    <th>Date de Depot</th>
                    <th> Type de demande</th>
                    <th>Etat de demande</th>
                    <th>Nombre des copies</th>
                    <th>langue des copies</th>
                  </tr>
                </thead>
                <tbody>
                  {demandes && demandes.map((demande, index) => (
                    <tr key={index} >
                      <td>{demande.DateDepot}</td>
                      <td>{demande.typeDemande}</td>
                      <td>{demande.State}</td>
                      <td>{demande.nbCopie}</td>
                      <td>{demande.Langue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>)}
            {addNewDemande === false && (
              <div>
                <button  className='btn btn-success' onClick={Ajout}>Ajouter </button>
              </div>
            )}

          </div>


          {addNewDemande === true && (
            <div className="bg-light border"> <center>
              <button style={{background:'red',margin:'10px',marginRight:'-500px'}} onClick={Annule}>Annuler</button>
              <form onSubmit={handleSubmit}>
                <span style={{ fontSize: '20px' }}> Pour passer votre demande merci de remplir les champs suivants :  </span> <br />
                <label>
                  <br></br><span style={{ fontSize: '19px', fontWeight: "400" }}> <br /><br></br>
                    Type de demande :
                  </span> <br /> <br />
                  <select required={true} name='typeDemande' value={typeDemande} onChange={(e) => handleChange(e)} >
                    <option value=''> Type de demande</option>
                    <option value='attestation de présence'> Attestation de présence</option>
                    <option value='attestation de inscription'>Attestation d'inscription</option>
                  </select>
                </label>
                <label>
                  <input placeholder='Nb. des copies' name='nbCopie' value={nbCopie} type='text' onChange={(e) => handleChange(e)} />
                </label>
                <label>
                  <select name='Langue' value={Langue} onChange={(e) => handleChange(e)}>
                    <option value=''>Lang</option>
                    <option value='Arabe'>Arabe</option>
                    <option value='français'> français</option>
                  </select>
                </label> <br></br>
                <button style={{ width: '14%', marginLeft: '-10px',background:'green' ,fontSize:'10px'}} type='submit'>Deposer le demande</button>
              </form>
            </center>
            </div>
          )}
          <div ref={down}></div>
        </div>
      </div>
    </div>
    )
  }
}

export default DemandeChercheur;
