import React, { useEffect, useState } from 'react'
import { MdOutlinePersonSearch } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getAdminfUser, getAdminsUser, getAdmintUser, refreshAdminf, refreshAdmins, refreshAdmint } from '../../../action/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavBar from '../../NavDashboard/NavBar';
import DetailsChercheurModal from '../../DetailsChercheurModal';
import ListGroup from 'react-bootstrap/ListGroup';
import * as XLSX from 'xlsx';

const ListeEtudiantAdmin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(refreshAdminf());

    }


    dispatch(getAdminfUser())

  }, [dispatch])
  const state = useSelector(state => state.auth);
  const [chercheurs, setChercheurs] = useState([]);
  const [cinchercheur, setCin] = useState('');


  const [searchQuery, setSearchQuery] = useState('');
  const [DetailsMOdelShow, setDetailsMOdelShow] = useState(false)
  let DetailsModelClose = () => setDetailsMOdelShow(false)
  const handleDetails = (e, cin) => {
    e.preventDefault();
    setCin(cin)
    setDetailsMOdelShow(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api-chercheur/get_all_inscriptions/');
        setChercheurs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredChercheurs = chercheurs.filter((chercheur) =>
    chercheur.cin.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleredirect = (cin) => {
    var url = `/chercher-config-and-details-admin/${cin}/`;
    window.location.href = url;
  };
  const [chercheurlist, setChercheurlist] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api-chercheur/inscription-list/');
        setChercheurlist(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData1();
  }, []);
  const handleexport = () => {
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // Months are zero-indexed (0 = January, 11 = December)
  
    // Determine the start and end year of the current academic year
    let startYear, endYear;
    if (currentMonth >= 8) { // Assuming academic year starts in September (month index 8)
      startYear = currentYear;
      endYear = currentYear + 1;
    } else {
      startYear = currentYear - 1;
      endYear = currentYear;
    }
  
    // Filter the chercheurlist to get the data for the given conditions
    const filteredChercheurs = chercheurlist.filter(item => {
      const creationDate = new Date(item.date_creation);
      const creationYear = creationDate.getFullYear();
  
      // Check if the action is 'accepter' and the creation date is within the academic year       return item.action === 'accepter' && creationYear >= startYear && creationYear <= endYear;

      return  creationYear >= startYear && creationYear <= endYear;
    });
  
    // Map the filtered data to extract the required fields
    const excelData = filteredChercheurs.map(item => ({
      id: item.id,
      'Prenom': item.IdChercheur.Prenom,
      'Nom': item.IdChercheur.Nom,
      'Niveau': item.IdChercheur.Niveau,
      '1 er inscription': item.IdChercheur.FirstYearInscription,
      'Specialite': item.IdChercheur.specialite,
      'resultat': item.action,

    }));
  
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "MySheet");
  
    // Write the workbook to a file named "MySheet.xlsx"
    XLSX.writeFile(wb, "MySheet.xlsx");
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
          <div className="vstack gap-3" style={{
            margin: '4px',
            padding: '4px',
            width: '990px',
            height: '590px',
            overflowX: 'hidden',
            overflowY: 'auto',
            textAlign: 'justify'
          }} >
            <div className="bg-light border">
              <div className='component'>
                <div className='Search-bar'>
                  <input className='Search-input' placeholder='Chercher avec Cin/Passport' value={searchQuery} onChange={handleSearch} />
                  <span className='Search-icon'><MdOutlinePersonSearch />
                  <Button style={{marginLeft:'20px'}} variant="primary" onClick={handleShow}>
                    Historique
                  </Button>
                  <button style={{marginLeft:'20px' ,fontSize: '15px'}}  onClick={handleexport}>
                    Export Excel
                  </button></span>
                  
                </div>
              </div>
              <div className="bg-light border">

                <div className='ListeChercheur'>

                  <table style={{ marginLeft: "3%", marginTop: "3%" }}>
                    <thead>
                      <tr>
                        <th> Nom et Prénom</th>

                        <th scope="col">Cin/Passport</th>
                        <th scope="col">Email</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Directeur thèse</th>
                        <th scope="col">prémiere inscription</th>
                        <th scope="col">action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {filteredChercheurs.map((chercheur) =>
                        <tr key={chercheur.id} >
                          <td>{chercheur.Nom} {chercheur.Prenom}

                          </td>
                          <td>{chercheur.cin}</td>

                          <td>{chercheur.email} </td>
                          <td>{chercheur.tel}</td>
                          <td>{chercheur.FirstDirTheseGrade}  {chercheur.FirstDirTheseName} </td>
                          <td>{chercheur.FirstYearInscription}</td>
                          <td>  <FaEye
                            className="eyes-icon"
                            size={15}
                            onClick={event => handleDetails(event, chercheur.cin)}
                          />
                            <DetailsChercheurModal show={DetailsMOdelShow} cin={cinchercheur} onHide={DetailsModelClose}></DetailsChercheurModal>

                          </td>

                        </tr>
                      )}
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Historique </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup>
              {chercheurlist && chercheurlist.map((chercheur) =>
                <div key={chercheur.id}>

                  <ListGroup.Item key={chercheur.id}>
                    {chercheur.IdAdmin && <div>Administrateur: {chercheur.IdAdmin.username}</div>}
                    {chercheur.IdChercheur && <div>Cheurcheur: {chercheur.IdChercheur.Nom}{'  '}{chercheur.IdChercheur.Prenom}</div>}
                    <div>Action: {chercheur.action}</div>
                    <div>Date: {chercheur.date_creation}</div>
                  </ListGroup.Item>
                </div>
              )}

            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    )
  }
}

export default ListeEtudiantAdmin