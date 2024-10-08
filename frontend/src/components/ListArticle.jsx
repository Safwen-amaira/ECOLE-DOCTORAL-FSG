import React, { useState, useEffect } from 'react';
import { getArticles } from '../services/service';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';
import Header from './public/Header';
import Footer from './public/Footer';
import "./public/styles/ListeArticle.css"
import { FaEdit } from 'react-icons/fa';
import Directeur from './Directeur';
import Chercheur from './Chercheur';
const ListArticle = () => {
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [articles, setArticles] = useState([]);
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
        getArticles().then(data => {
            setArticles(data);
        });
    }, []);
    useEffect(() => {
        const doFilter = () => {
            const filtered = articles.filter(ar => ar.state === 'Validé');
            // Sort by date_depot in descending order
            filtered.sort((a, b) => new Date(b.date_depot) - new Date(a.date_depot));
            setFilteredArticles(filtered);
        };
        doFilter();
    }, [articles]);

    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='ListeArticleContainerStylings'>
            <Header />
            <center>
                <br /><br />
                <div className="vstack gap-3">
                    <br /><br /><br /><br />
                    <h2 className="TitleOfListeArticleStyling"><center>Liste des Articles</center></h2>
                    <div className="TableForListeArticleHolderStyling">
                        <table style={{ marginLeft: '10px' }} >
                            <thead>
                                <tr>
                                    <th scope="col">titre</th>
                                    <th scope="col">description</th>
                                    <th scope="col">chercheur</th>
                                    <th scope="col">directeur</th>
                                    <th scope="col">date_depot</th>
                                    <th scope="col">Télécharger</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((article) => {

                                    return (
                                        <tr key={article.id}>
                                            <td>{article.titre}</td>
                                            <td>{article.description}</td>
                                            <td>
                                                {  <p>
                                                    {article.chercheur.Nom} {article.chercheur.Prenom}
                                                    <FaEdit
                                                        className="edit-icon"
                                                        size={15}
                                                        onClick={event => handleDetailsC(event, article.chercheur)} />
                                                </p>}

                                                <Chercheur show={DetailsCModelShow} chercheur={cherid} onHide={DetailsCModelClose}></Chercheur>

                                            </td>
                                            <td>
                                                { <p>
                                                    {article.directeur.nom} {article.directeur.prenom}
                                                    <FaEdit
                                                        className="edit-icon"
                                                        size={15}
                                                        onClick={event => handleDetailsD(event, article.directeur)} />
                                                </p>}

                                                <Directeur show={DetailsDModelShow} directeur={dirid} onHide={DetailsDModelClose}></Directeur>


                                            </td>
                                            <td>{article.date_depot}</td>
                                            <td>
                                                {article.file && (
                                                    <FaDownload
                                                        className="download-icon"
                                                        onClick={() => forceDownload(article.file)}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {/* Pagination */}
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(filteredArticles.length / itemsPerPage) }).map((_, index) => (
                                <li key={index} className="page-item">
                                    <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <br /><br />
                <Footer />
            </center>
        </div>
    );
}

export default ListArticle;
