import React, { useEffect, useState } from 'react';
import './styles/Header.css';
import TnFlag from '../../Assets/tn-flag.png';
import EDSENLogo from '../../Assets/logo-no-background.png'
import MESLOGO from '../../Assets/MESLOGO.jpg';
import FSGLOGO from '../../Assets/logoFSG.jpg';
import FSGIMG from '../../Assets/facultepic.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { HiBars4 } from "react-icons/hi2";
import Dropdown from 'react-bootstrap/Dropdown';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';


const NHeader = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAcceuil = () => {
    navigate('/');
  };



  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='container'>
      <div className='First-Level'>
        <div className='MES-LOGO-container'>
          <img src={MESLOGO} alt='MES LOGO' className='MES-LOGO' />
        </div>
        <div className='Tnflag-container'>
          <img style={{ height: '60px', width: '300px' }} src={EDSENLogo} alt='tunisian flag' className='Tnflag' />
          <div className='TextHeaders1stLevel'>

          </div>
        </div>
        <div className='FSGLOGO-container'>
          <img src={FSGLOGO} alt='FSG LOGO' className='FSGLOGO' />
        </div>
      </div>
      <div style={{ marginLeft: '-5%' }} className='Second-Level'>
        <div className='dropdown-wrapper'>
          <button className='dropdown-button' onClick={handleToggleDropdown}><HiBars4 size={40} />
          </button>
          {showDropdown && (
            <div className='dropdown-content'>
              <Link to='/'>
                <button className='Buttons-Headers-Nav'>Acceuil</button>
              </Link>
              <Dropdown style={{ position: 'relative' }}>
                <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative' }} id="dropdown-basic">
                  Ecole doctorale
                </Dropdown.Toggle>

                <Dropdown.Menu  >
                  <Dropdown.Item href='/list-actualite'>Actualités</Dropdown.Item>
                  <Dropdown.Item href="/presentation">Présentation</Dropdown.Item>
                  <Dropdown.Item href="/public/files/chartedesétudesdoctorales.pdf">Charte des etudes doctorales</Dropdown.Item>

                </Dropdown.Menu>

              </Dropdown>
              <Dropdown style={{ position: 'relative' }}>
                <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative' }} id="dropdown-basic">
                  Rcherche et developpement
                </Dropdown.Toggle>

                <Dropdown.Menu  >
                  <Dropdown.Item href="/labo-list">Laboratoires FSG </Dropdown.Item>
                  <Dropdown.Item href="/unite-list">unités FSG</Dropdown.Item>
                  <Dropdown.Item href="/labo-rattache-list">Laboratoires rattachés </Dropdown.Item>
                  <Dropdown.Item href="/unite-rattache-list">Unités rattachés </Dropdown.Item>
                  <Dropdown.Item href="/uscr-list">Unités des services commun </Dropdown.Item>
                  <Dropdown.Item href="/centre-recherche">Tous</Dropdown.Item>


                </Dropdown.Menu>

              </Dropdown>

              <Dropdown style={{ position: 'relative' }}>
                <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative' }} id="dropdown-basic">
                  Formations
                </Dropdown.Toggle>

                <Dropdown.Menu  >
                  <Dropdown.Item href="/action-1">Avis de validation de formations </Dropdown.Item>

                  <Dropdown.Item href="/add-formation"> Ajouter Formations </Dropdown.Item>


                </Dropdown.Menu>
              </Dropdown>


              <Dropdown style={{ position: 'relative' }}>
                <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative' }} id="dropdown-basic">
                  Habilitation universitaire
                </Dropdown.Toggle>

      <Dropdown.Menu  >
        <Dropdown.Item href="#/action-1">Procédure de Habilitation  </Dropdown.Item>
        <Dropdown.Item href="#/action-1">Decret AR et Habilitation </Dropdown.Item>
        <Dropdown>
          <Dropdown.Toggle className='Buttons-Headers-Nav' style={{margin:"0%",backgroundColor:'transparent',color:"black",width:"fit-content",border:'none'}}>
           Critères d'admissibilité d'une Habilitation
           </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='/Action3'>
                  Grille de dépot : Mathématique
            </Dropdown.Item>
            <Dropdown.Item href='/Action3'>
                  Grille de dépot : Beologie
            </Dropdown.Item>
            <Dropdown.Item href='/Action3'>
                  Grille de dépot : Physique
            </Dropdown.Item>
            <Dropdown.Item href='/Action3'>
                  Grille de dépot : Geologie
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>  
        
      </Dropdown.Menu>
    </Dropdown>                
              <Dropdown style={{ position: 'relative' }}>
                <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative' }} id="dropdown-basic">
                  Thèse
                </Dropdown.Toggle>

                <Dropdown.Menu  >
                  <Dropdown.Item href="/resultats-demandes-d-inscriptions">Resultats des inscriptions</Dropdown.Item>
                  <Dropdown.Item href="/inscription">inscription / Pré-inscription</Dropdown.Item>


                </Dropdown.Menu>
              </Dropdown>
              <Dropdown style={{ position: 'relative' }}>
                <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative', width: "fit-content" }} id="dropdown-basic">
                  Bibliotheque
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/list-these"> liste de thèses </Dropdown.Item>

                  <Dropdown.Item href="/list-article">liste d'articles</Dropdown.Item>
                  <Dropdown.Item href="/list-document">liste de documents</Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
              <Link to='/login'>
                <button className='Buttons-Headers-Nav'>S'identifier</button>

              </Link>
            </div>
          )}
        </div>
        <div className='forPcOrBigScreenOnly' style={{ width: 'fit-content' }}>
          <button className='Buttons-Headers-Nav' onClick={handleAcceuil}>Acceuil</button>

          <Dropdown style={{ position: 'relative' }}>
            <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', width: "fit-content", position: 'relative' }} id="dropdown-basic">
              Ecole doctorale
            </Dropdown.Toggle>

            <Dropdown.Menu >
              <Dropdown.Item href='/list-actualite'>Actualités</Dropdown.Item>

              <Dropdown.Item href="/presentation">Présentation</Dropdown.Item>
              <Dropdown.Item href="/public/files/chartedesétudesdoctorales.pdf">Charte des etudes doctorales</Dropdown.Item>

            </Dropdown.Menu>

          </Dropdown>
          <Dropdown style={{ position: 'relative' }}>
            <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative', width: "fit-content" }} id="dropdown-basic">
              Rcherche et developpement
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/labo-list">Laboratoires FSG </Dropdown.Item>
              <Dropdown.Item href="/unite-list">unités FSG</Dropdown.Item>
              <Dropdown.Item href="/labo-rattache-list">Laboratoires rattachés </Dropdown.Item>
              <Dropdown.Item href="/unite-rattache-list">Unités rattachés </Dropdown.Item>
              <Dropdown.Item href="/uscr-list">Unités des services commun </Dropdown.Item>
              <Dropdown.Item href="/centre-recherche">Tous</Dropdown.Item>


            </Dropdown.Menu>

          </Dropdown>

          <Dropdown style={{ position: 'relative' }}>
            <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative', width: "fit-content" }} id="dropdown-basic">
              Formations
            </Dropdown.Toggle>

            <Dropdown.Menu >
              <Dropdown.Item href="/public/files/chartedesétudesdoctorales.pdf">Avis de validation de formations </Dropdown.Item>
              <Dropdown.Item href="/add-formation"> Ajouter Formations </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>


          <Dropdown style={{ position: 'relative' }}>
            <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', width: "fit-content", position: 'relative' }} id="dropdown-basic">
              Habilitation universitaire
            </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/public/files/chartedesétudesdoctorales.pdf">Procédure de Habilitation  </Dropdown.Item>
        <Dropdown.Item href="/public/files/chartedesétudesdoctorales.pdf">Decret AR et Habilitation </Dropdown.Item>
        <Dropdown>
          <Dropdown.Toggle className='Buttons-Headers-Nav' style={{margin:"0%",backgroundColor:'transparent',color:"black",width:"fit-content",border:'none'}}>
           Critères d'admissibilité d'une Habilitation
           </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='/public/files/chartedesétudesdoctorales.pdf'>
                  Grille de dépot : Mathématique
            </Dropdown.Item>
            <Dropdown.Item href='/public/files/chartedesétudesdoctorales.pdf'>
                  Grille de dépot : Beologie
            </Dropdown.Item>
            <Dropdown.Item href='/public/files/chartedesétudesdoctorales.pdf'>
                  Grille de dépot : Physique
            </Dropdown.Item>
            <Dropdown.Item href='/public/files/chartedesétudesdoctorales.pdf'>
                  Grille de dépot : Geologie
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>  
        
      </Dropdown.Menu>
    </Dropdown>             

          <Dropdown style={{ position: 'relative' }}>
            <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative', width: "fit-content" }} id="dropdown-basic">
              Thèse
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/inscription">inscription / Pré-inscription</Dropdown.Item>
              <Dropdown.Item href="/resultats-demandes-d-inscriptions">Resultats des inscriptions</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{ position: 'relative' }}>
            <Dropdown.Toggle className='Buttons-Headers-Nav' style={{ backgroundColor: 'rgb(34, 34, 78)', border: 'none', position: 'relative', width: "fit-content" }} id="dropdown-basic">
              Bibliotheque
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/list-these"> liste de thèses </Dropdown.Item>

              <Dropdown.Item href="/list-article">liste d'articles</Dropdown.Item>
              <Dropdown.Item href="/list-document">liste de documents</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
          <Link to='/Recherche'>
            <button className='Buttons-Headers-Nav' style={{ backgroundColor: 'transparent', border: 'none', marginLeft: '1%' }}>Recherche
            </button></Link>
        </div>
      </div>

     
  </div>
  );
};


export default NHeader ;

