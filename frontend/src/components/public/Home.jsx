import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { HiOutlineUserGroup } from "react-icons/hi";
import './styles/Home.css'
import { Card, Button } from 'react-bootstrap';
import logoFSG from '../../Assets/logoFSG.jpg'
import { GiTeacher } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { GiTestTubes } from "react-icons/gi";
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getEtablissement ,getchercheurcount,getdirecteurcount,getetabcount,getlabocount} from '../../services/service';
const Home = () => {
  const [actualites, setActualites] = useState([]);
  const [counted, setCounted] = useState(false);
  const [etablissements, setEtablissements] = useState([]);
  const [counteretab, setcounteretab] = useState({});
  const [countercher, setcountercher] = useState({});
  const [counterdir, setcounterdir] = useState({});
  const [counterlabo, setcounterlabo] = useState({});

  useEffect(() => {
    let mounted = true;

    Promise.all([
        getchercheurcount(),
        getdirecteurcount(),
        getetabcount(),
        getlabocount()
    ]).then(([chercheurCount, directeurCount, etabCount, laboCount]) => {
        if (mounted) {
            setcountercher(chercheurCount);
            setcounterdir(directeurCount);
            setcounteretab(etabCount);
            setcounterlabo(laboCount);
        }
    });

    return () => {
        mounted = false;
    };
}, []);
  useEffect(() => {
    let mounted = true;
    
    getEtablissement().then(data => {
        if (mounted) {
            setEtablissements(data)
        }
    })
    return () => {
        mounted = false
    };
}, []);
  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/actualites/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Sort actualites by date_creation in descending order
        const sortedActualites = data.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
        // Get the newest 3 actualites
        const newestActualites = sortedActualites.slice(0, 3);
        setActualites(newestActualites);
      } catch (error) {
      }
    };

    fetchActualites();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const simplePresentation = document.querySelector('.SimplePresentation');
      const cards = document.querySelectorAll('.CardsHomeSelf');

      if (simplePresentation) {
        const rect = simplePresentation.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        const isInViewport = rect.top >= 0 && rect.bottom <= windowHeight;

        if (isInViewport) {
          simplePresentation.classList.add('animate');
        } else {
          simplePresentation.classList.remove('animate');
        }
      }

      if (cards) {
        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;

          const isInViewport = rect.top >= 0 && rect.bottom <= windowHeight;

          if (isInViewport) {
            card.classList.add('animate');
          } else {
            card.classList.remove('animate');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.CountUp');

      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const isInViewport = rect.top >= 0 && rect.bottom <= windowHeight;

        if (isInViewport && !counted) {
          const start = 0;
          const end = parseInt(element.textContent, 10);
          const duration = 3000; // Animation duration in milliseconds
          const range = end - start;
          let currentCount = start;
          const stepTime = Math.abs(Math.floor(duration / range));
          
          const timer = setInterval(() => {
            currentCount += 1;
            element.textContent = currentCount;
            if (currentCount === end) {
              clearInterval(timer);
            }
          }, stepTime);
          
          setCounted(true);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [counted]);

  return (
    <div>
    
  <Header/>

 <div className='SimplePresentation'>
        <center>
          <br />
          <div className='ENCHIFFRETITLES '>
        <br/>
          <h1> École Doctorale De Science Exactes Et Naturel - EDSEN </h1>
          <hr/>
          </div>
          <br />
          <br/>
          Une école doctorale dans le domaine des "Sciences Exactes et Naturelles" (EDSEN)à la Faculté des Sciences de Gabès
          <br/>Elle a été créée en vertu de la loi N°40 du 15 Mars 2024. Elle relève aujourd'hui de l'Université de Gabès
        </center>
        <br />
        <br/>
      </div>
      <div className='LastFetchedAvis'>
        <center><div className='ENCHIFFRETITLES '>
        <br/>
          <h1> Derniieres actualités</h1>
          <hr/>
          </div></center>
          <br/>
        <div className='CardsHomeContainer'>
          {actualites.map(actualite => (
            <Card key={actualite.id} className='CardsHomeSelf' style={{ width: '18rem', height: 'auto' }}>
            <center>
              <Card.Img variant="top" style={{width:'12rem',height:'5rem',marginTop:"5%"}}  src={logoFSG} />
              <Card.Body>
             
                <Card.Title style={{textAlign:'center' , color:'rgb(34, 34, 78)',fontFamily:"monospace"}} >{actualite.titre}</Card.Title>
              <br/>
                <Card.Text style={{fontFamily:"cursive"}}>{actualite.description}</Card.Text>
             <Link to='/list-actualite/'> <Button   style={{marginLeft:'50%',marginBottom:"10px" , marginTop:'23px' , backgroundColor:'rgb(34, 34, 78)',border:'none'}} variant="primary" >Voir plus</Button></Link>  
              </Card.Body>
              </center>
            </Card>
          ))}
        </div>
      </div>
   <div className='StatistiqueLEVEL'>
        <center>
        <div className='ENCHIFFRETITLES '>
        <br/>
        <br/>
          <h1> EDSEN EN CHIFFRES</h1>
          <hr/>
          </div>
          </center>
          <br/><br/>
    <div className='ENCHIFFRECONTENT'>
        <div className='NBETUDIANTFORHEADER ' >
        <HiOutlineUserGroup  size={75} />
                <br/>
                <br/>

           <h5  className='CountUp'>     {countercher.count} </h5> Chercheurs       
           
             </div>
      <div className='TeacherNumberFORHEADER '>
      <GiTeacher size={75}/>
        <br/>
        <br/>
        <h5  className='CountUp'>{counterdir.count}</h5>
        Enseignants
      </div>
      <div className='TeacherNumberFORHEADER '>
      <FaUniversity  size={75}/>
      <br/><br/>
      <h5  className='CountUp'>{counteretab.count}</h5>
      Universités partenaires
      </div>
    {/*  <div className='TeacherNumberFORHEADER '>
      <FaUserGraduate size={75} />
     <br/><br/>
         <h5  className='CountUp'>  2000 </h5>
        Diplomes
        </div> diplome thing*/}
      <div className='TeacherNumberFORHEADER '>
      <GiTestTubes  size={75}/>
      <br/><br/>
      <h5 className='CountUp'>{counterlabo.count}</h5>
          Laboratoires
      </div>

    </div>
    <br/><br/><br/><br/>
    <br/>

      </div>
      <div className='LastFetchedAvis'>
        <center><div className='ENCHIFFRETITLES '>
        <br/>
          <h1> Etablissement</h1>
          <hr/>
          </div></center>
          <br/>
        <div className='CardsHomeContainer'>
          {etablissements.map(etablissement => (
            <Card key={etablissement.id} className='CardsHomeSelf' style={{ width: '18rem', height: 'auto' }}>
            <center>
              <Card.Img variant="top" style={{width:'20%',height:'20%',marginTop:"5%"}}  src={`http://127.0.0.1:8000${etablissement.logo}`} />
              <Card.Body>
             
                <Card.Title style={{textAlign:'center' , color:'rgb(34, 34, 78)',fontFamily:"monospace"}} ><span style={{fontSize:'20px'}}>Nom:</span>{etablissement.nom}</Card.Title>
              <br/>
                <Card.Text style={{fontFamily:"cursive",float:'left'}}><span style={{fontSize:'15px'}}>Email:</span>{etablissement.email}</Card.Text>
                <Card.Text style={{fontFamily:"cursive",float:'left'}}><span style={{fontSize:'15px'}}>Téléphone:</span>{etablissement.tel}</Card.Text>
                <Card.Text style={{fontFamily:"cursive",float:'left'}}><span style={{fontSize:'15px'}}>Fax:</span>{etablissement.fax}</Card.Text>

              </Card.Body>
              </center>
            </Card>
          ))}
        </div>
      </div>
  <Footer/>
    
    </div>
  )
}

export default Home