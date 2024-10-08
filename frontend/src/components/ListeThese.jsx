import React, { useState, useEffect } from 'react';
import { getTheses } from '../services/service';
import { FaDownload } from 'react-icons/fa';
import Header from './public/Header';
import Footer from './public/Footer';
import axios from 'axios'; // Import axios for file download
import '../components/public/styles/ListeThese.css';
import { FaEdit } from 'react-icons/fa';
import Directeur from './Directeur';
import Chercheur from './Chercheur';
const ListeThese = () => {
    const [filteredTheses, setFilteredTheses] = useState([]);
    const [theses, setTheses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);

    const [DetailsDModelShow, setdetailsDMOdelShow] = useState(false)
    const [dirid, setdirId] = useState(false)
    const [DetailsCModelShow, setdetailsCMOdelShow] = useState(false)
    const [cherid, setcherId] = useState(false)

    let DetailsDModelClose = () => setdetailsDMOdelShow(false)
    let DetailsCModelClose = () => setdetailsCMOdelShow(false)
    const handleDetailsD = (e, dir) => {
        e.preventDefault();
        setdetailsDMOdelShow(true);
        setdirId(dir);
    };
    const handleDetailsC = (e, cher) => {
        e.preventDefault();
        setdetailsCMOdelShow(true);
        setcherId(cher);
    };



    useEffect(() => {
        getTheses().then(data => {
            setTheses(data);
        });
    }, []);

    useEffect(() => {
        const doFilter = () => {
            const filtered = theses.filter(th => th.state === 'Validé');
            // Sort by date_soutenu in descending order
            filtered.sort((a, b) => new Date(b.date_soutenu) - new Date(a.date_soutenu));
            setFilteredTheses(filtered);
        };
        doFilter();
    }, [theses]);

    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTheses.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='ListeTheseContainerForStyling'>
            <Header />
            <br /><br />
            <div className="vstack gap-3">
                <center>
                    <h2 className="ListeTheseTitleForStyling">Liste des Thèses</h2>
                    <div className="TablecontainerForStylingListeThese">
                        <table style={{ marginLeft: '10px' }}>
                            <thead>
                                <tr>
                                    <th scope="col">titre</th>
                                    <th scope="col">specialite</th>
                                    <th scope="col">chercheur</th>
                                    <th scope="col">directeur</th>
                                    <th scope="col">date_soutenu</th>
                                    <th scope="col">Télécharger</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((these) =>{
           
                                    return(
                                    <tr key={these.id}>
                                        <td>{these.titre}</td>
                                        <td>{these.specialite}</td>
                                        <td>
                                        { <p>
                                                {these.chercheur.Nom} {these.chercheur.Prenom}
                                                <FaEdit
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleDetailsC(event, these.chercheur)} />
                                                    </p>}                                               
                                             
                                                <Chercheur show={DetailsCModelShow} chercheur={cherid} onHide={DetailsCModelClose}></Chercheur>

                                        </td>
                                        <td>
                                             {<p>
                                                {these.directeur.nom} {these.directeur.prenom}
                                                 <FaEdit
                                                    className="edit-icon"
                                                    size={15}
                                                    onClick={event => handleDetailsD(event, these.directeur)} />
                                                    </p>}   
                                                
                                                <Directeur show={DetailsDModelShow} directeur={dirid} onHide={DetailsDModelClose}></Directeur>


                                        </td>
                                        <td>{these.date_soutenu}</td>
                                        <td>
                                            {these.file && (
                                                <FaDownload
                                                    className="download-icon"
                                                    onClick={() => forceDownload(these.file)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                               ) })}
                            </tbody>
                        </table>
                    

                    {/** Pagination Holder */}
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(filteredTheses.length / itemsPerPage) }).map((_, index) => (
                                <li key={index} className="page-item">
                                    <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </center>
            </div>
            <br /><br />
            <Footer />
        </div>
    );
}

export default ListeThese;
