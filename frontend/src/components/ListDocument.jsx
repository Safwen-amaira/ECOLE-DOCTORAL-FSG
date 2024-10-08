import React, { useState, useEffect } from 'react';
import { getDocuments } from '../services/service';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';
import Header from './public/Header';
import Footer from './public/Footer';
import "./public/styles/ListeDocument.css" ;

const ListDocument = () => {
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);

    useEffect(() => {
        getDocuments().then(data => {
            setDocuments(data);
        });
    }, []);

    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDocuments = documents.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='ListeDocumentContainerStyling'>
            <Header />
            <center>
                <br/><br/>
                <div className="vstack gap-3">
                    <div className="TitleTitleForListeDocument">
                        <h2 className="TitleForListeDesDocumentsStyle">Liste des Documents</h2>
                    </div>
                    <div className="TitleTitleForListeDocument">
                        <center>
                            <table style={{ marginLeft: '10px' }} >
                                <thead>
                                    <tr>
                                        <th scope="col">titre</th>
                                        <th scope="col">description</th>
                                        <th scope="col">Télécharger</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentDocuments.map((document) =>
                                        <tr key={document.id}>
                                            <td>{document.titre}</td>
                                            <td>{document.description}</td>
                                            <td>
                                                {document.file && (
                                                    <FaDownload
                                                        className="download-icon"
                                                        onClick={() => forceDownload(document.file)}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(documents.length / itemsPerPage) }).map((_, index) => (
                                    <li key={index} className="page-item">
                                        <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                                    </li>
                                ))}
                            </ul>
                        </center>
                    </div>
                </div>
                <br/><br/>
                <Footer/>
            </center>
        </div>
    );
}

export default ListDocument;
