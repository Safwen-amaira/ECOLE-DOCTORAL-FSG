import React, { useEffect, useState } from "react";
import Header from "./public/Header";
import Footer from "./public/Footer";
import axios from "axios";
import { getTheses } from "../services/service";
import { getDocuments } from "../services/service";
import { getArticles } from "../services/service";
import { getlabos } from '../services/service'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import logo from '../Assets/logoFSG.jpg';
import './public/styles/Recherche.css';
const Recherche = () => {
  const [laboratoires, setLabos] = useState([]);
  const [searchSubject, setSearchSubject] = useState("");
  const [actualites, setActualites] = useState([]);
  const [theses, setTheses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [inputContent,setInputContent] = useState('');
  const handleSearchClick = () =>{
    setSearchSubject(inputContent)  ;
  }
  useEffect(() => {
    getlabos().then((data) => {
      setLabos(data);
    });
  }, []);

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data);
    });
  }, []);

  useEffect(() => {
    getDocuments().then((data) => {
      setDocuments(data);
    });
  }, []);

  useEffect(() => {
    getTheses().then((data) => {
      setTheses(data);
    });
  }, []);

  useEffect(() => {
    const getActualites = async () => {
      try {
        const response = await axios.get("http://localhost:8000/actualites/");
        // actualités from newest to oldest
        const sortedActualites = response.data.sort(
          (a, b) => new Date(b.date_creation) - new Date(a.date_creation)
        );
        setActualites(sortedActualites);
      } catch (error) {
      }
    };

    getActualites();
  }, []);

  // Function to filter results based on search query
  const filterResults = (query) => {
    const filteredTheses = theses.filter((thesis) =>
      JSON.stringify(thesis).toLowerCase().includes(query.toLowerCase())
    );
    const filteredDocuments = documents.filter((document) =>
      JSON.stringify(document).toLowerCase().includes(query.toLowerCase())
    );
    const filteredArticles = articles.filter((article) =>
      JSON.stringify(article).toLowerCase().includes(query.toLowerCase())
    );
    const filteredActualites = actualites.filter((actualite) =>
      JSON.stringify(actualite).toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults([
      ...filteredTheses,
      ...filteredDocuments,
      ...filteredArticles,
      ...filteredActualites,
    ]);
  };

  // Update search results as user types
  useEffect(() => {
    filterResults(searchSubject);
  }, [searchSubject, theses, documents, articles, actualites,laboratoires]);
// Function to render cards grouped into rows
const renderRows = () => {
    const rows = [];
    for (let i = 0; i < searchResults.length; i += 3) {
      rows.push(
        <Row key={i}>
          {searchResults.slice(i, i + 3).map((result, index) => (
            <Col key={index}>
              <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <center>
              <Card.Img variant="top" src={logo} style={{width:'60%'}} />
</center>
                <Card.Body>
        
                  <center> <Card.Title>{result.titre}</Card.Title>  </center>

                  <Card.Text>
                
  
                   {result.description}
                    <br/>{result.chercheur}
                  <br/>  {result.state}
                  </Card.Text>
                  <br/><br/>
                  <Link to={getLinkPath(result)} className="StylingLinkForSearch">Go to {getSourceLabel(result)}</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      );
    }
    return rows;
  };
  

// Function to get the link path based on the source
const getLinkPath = (result) => {
    if ("date_creation" in result) {
      return "/list-actualite";
    } else if ("date_depot" in result) {
      return "/list-article";
    } else if ("date_soutenu" in result) {
      return "/list-these";
    } else if ("title" in result) {
      return "/list-document";
    } else {
        return "/list-labo" ;
    }
  };



  const getSourceLabel = (result) => {
    if ("date_creation" in result) {
      return "Actualites";
    } else if ("date_depot" in result) {
      return "Articles";
    } else if ("date_soutenu" in result) {
      return "Theses";
    } else {
      return "Documents";
    }
  };

  return (
    <div className="SearchComponent" >
      <Header />
      <div>
        <center>
          <br />
          <br />
          <br/><br></br>
        <h2>Entrer des mots clé pour faire votre recherche sur le site de  <br/>  L'Ecole Doctorale - EDSEN : </h2>
      <br/><br/><br/>
          <input 
            placeholder="Recherche . . . "
            className="RechercheInputForVisiteur"
            onChange={(e) => setInputContent(e.target.value)} 
      
          />
      <br/><br/>
        <br/>
      <button style={{margin:"0%" , width:"15%"}} onClick={handleSearchClick}>Chercher</button>
        </center>
      <br/><br/><br/>
 
      </div>
      {/* Display search results */}
      { searchResults && (searchSubject !== '') &&(
      <div>
        <center>
        <br/><br/><br/>
        {renderRows()}
        </center>
      </div>
          )}    <Footer />
    </div>
  );
};

export default Recherche;
