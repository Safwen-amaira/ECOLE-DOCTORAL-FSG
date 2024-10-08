import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './public/Header';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from './public/Footer';
import '../components/public/styles/ActualiteDisplay.css'
import FSGLOGO from '../Assets/logoFSG.jpg'
import { FaDownload } from 'react-icons/fa';

const ListActualite = () => {
    const [actualites, setActualites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [actualitesPerPage] = useState(10); // Limit to 10 actualites per page

    useEffect(() => {
        const getActualites = async () => {
            try {
                const response = await axios.get('http://localhost:8000/actualites/');
                // Sort actualités from newest to oldest 
                const sortedActualites = response.data.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
                setActualites(sortedActualites);
            } catch (error) {
            }
        };

        getActualites();
    }, []);

    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };

    // Get current actualites for the current page
    const indexOfLastActualite = currentPage * actualitesPerPage;
    const indexOfFirstActualite = indexOfLastActualite - actualitesPerPage;
    const currentActualites = actualites.slice(indexOfFirstActualite, indexOfLastActualite);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const renderCards = () => {
        
        return currentActualites.map(actualite => (
            <Row key={actualite.id} style={{ marginBottom: '45px' }}>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '24rem' }} className='CardActualiteHolderLIST'>
                        <Card.Img variant="top" style={{ width: '65%', alignSelf: 'center' }} src={FSGLOGO} />
                        <Card.Body>
                            <Card.Title className='TitleOFActualite'>{actualite.titre}</Card.Title>
                            <Card.Text style={{ color: 'gray'}}>
                                {actualite.description}
                            </Card.Text>
                            {/* Check if remark is a link */}
                            {actualite.remarque.startsWith("http://") || actualite.remarque.startsWith("https://") ? (
                                <a href={actualite.remarque} className='RemarqueContainer'>Cliquez ici pour voir la lien jointe </a>
                            ) : (
                                <p className='RemarqueContainer'>{actualite.remarque}</p>
                            )}
                        </Card.Body>
                        <p className='DateContainerForActualite'>Date : {actualite.date_creation}</p>
                        <Button onClick={() => forceDownload(actualite.fichier, actualite.titre)} className="btnGetMoreInfoForActualite">
                        {actualite.file && (
                                                    <FaDownload
                                                        className="download-icon"
                                                        onClick={() => forceDownload(actualite.file)}
                                                    />
                                                )}
                        </Button>
                    </Card>
                </Col>
            </Row>
        ));
    };
    return (
        <div className='ContainerOfActualite'>
            <Header />
            <br/><br/>
            <div className='TitleForTheActualiteContainer'>
                    Actualités
            </div>
            <br/><br/>
            <center>
                {renderCards()}
                {/* Paging for actualités */}
                <nav className='PagingStyling'>
                    <ul className="pagination">
                        {[...Array(Math.ceil(actualites.length / actualitesPerPage)).keys()].map(number => (
                            <li key={number + 1} className="page-item">
                                <a onClick={() => paginate(number + 1)} href="#/" className="page-link">
                                    {number + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </center>
            <Footer />
        </div>
    );
};

export default ListActualite;
