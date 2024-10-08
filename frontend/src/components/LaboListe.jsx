import React from 'react'
import { getlabos } from '../services/service'
import '../App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaDownload } from 'react-icons/fa';
import Header from './public/Header'
import Footer from './public/Footer' ;


const LaboListe = () => {
    const [Labos, setLabos] = useState([]);
    useEffect(() => {
        let mounted = true;
        getlabos().then(data => {
            if (mounted) {
                setLabos(data)
            }
        })
        return () => mounted = false;
    }, []);
    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };

    return (
        <div className='d-flex p-2' style={{display:'flex', width:"100%",flexDirection:'column'}}>
        <Header/>
        <br/><br/><br/><br/><br/>
            <div className="vstack gap-3">

                <div > <h2 className="alert alert-success"> <center>Liste des laboratoires</center></h2></div>
                <div className="bg-light border">
                <center>
                    <table style={{ marginLeft: '10px' }} >

                        <thead>
                            <tr>
                                <th>Codelabo</th>
                                <th>Directeur</th>
                                <th> Discipline</th>
                                <th>Etablissement </th>
                                <th>fiche</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Labos.map((labo) =>
                                <tr key={labo.id}>
                                    <td>{labo.Codelabo}</td>
                                    <td>{labo.Directeur}</td>
                                    <td>{labo.Discipline}</td>
                                    <td>{labo.Etablissement}</td>
                                    <td>{labo.fiche && (
                                        <FaDownload
                                            className="download-icon"
                                            onClick={() => forceDownload(labo.fiche)}
                                        />
                                    )}</td>

                                </tr>)}
                        </tbody>

                    </table>
                    </center>
                </div>
            </div>
            <br/><br/><br/><br/>
                                
                                    <Footer/>
        </div>

    )
}

export default LaboListe
