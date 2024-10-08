import React from 'react';
import './styles/Footer.css'
import FooterLogo from '../../Assets/whitelogoedsen.png'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className='FooterContainer'>

    <div className='Footer'>
    <div className='Logo-container'>
    <img style={{width:'40%',height:'40%' }} src={FooterLogo} alt='fsg logo pour le footer' className='logoFooter'/>
    <div className='developperpar'> developped by Safwen Amaira & Houssem Sghaier
    <br/> 
        
        <p style={{color:"white",fontSize:'11px',marginLeft:"14%"}}>© 2024 , All rights are reserved </p>  </div>
    
    </div>

<div className='contactinginfocontainer'>
    <Link to={'https://www.google.com/maps/place/Facult%C3%A9+des+sciences+de+Gab%C3%A8s/@33.8544288,10.0969364,15.54z/data=!4m14!1m7!3m6!1s0x12556fc4d60cee7f:0x819c74577b97539c!2sInstitut+Sup%C3%A9rieur+des+Langues+Gab%C3%A8s!8m2!3d33.8858191!4d10.0923187!16s%2Fg%2F123073bn!3m5!1s0x12556e1623754479:0x9756ae423fc4b53c!8m2!3d33.8462814!4d10.097872!16s%2Fg%2F122fjn_d?hl=fr-FR&entry=ttu'}  className='LinkStylesEnabler'>
   <p> Cité Erriadh 6072 </p>
    Zrig Gabès-Tunisie
    </Link>
<Link to={'#'} className='LinkStylesEnabler'>
<p>+ 216 75 392 600 /</p>
+ 216 75 392 080
</Link>
<Link to={"#"} className='LinkStylesEnabler'>
<p> + 216 75 392 421</p>
</Link>
<Link to={'#'} className='LinkStylesEnabler'>mail@fsg.rnu.tn</Link>
</div>

<div className='OtherPagesContainer'>
    <Link className='LinkStylesEnabler2' to={'/'}>Acceuil</Link>
    <Link className='LinkStylesEnabler2' to={'/presentation'}>Présentation</Link>
    <Link className='LinkStylesEnabler2' to={'/inscription'}>inscription</Link>
    <Link className='LinkStylesEnabler2' to={'/add-formation'}>Formation</Link>
    <Link className='LinkStylesEnabler2' to={'/list-actualite'}>Actualités</Link>
</div>
<div className='OtherPagesContainer'> 
<Link className='LinkStylesEnabler2' to={'http://www.fsg.rnu.tn/'}>Faculté des Sciences Gabes</Link>
<Link className='LinkStylesEnabler2' to={'/list-article'}>Bibliotéque</Link>
</div>
    <div className='OtherPagesContainer'>
    <Link   style={{marginRight:'50px'}}to={'/login'} className='LinkStylesEnabler3'> S'identifier</Link>
    </div>

      </div>
      
    <div className='LASTLEVEL'>
    <br/>
    <hr className='ENDPOINT'/>
    
    <br/>
    <center>
        <Link className='LinkStylesEnabler4' to={'/'}> ACCEUIL</Link>
        <span className='Separateur'> | </span>
        <Link className='LinkStylesEnabler4' to={'/list-actualite'}> ACTUALITES</Link>
        <span className='Separateur'> | </span>
        <Link className='LinkStylesEnabler4'>PAQ </Link>
        <span className='Separateur'> | </span>
        <Link className='LinkStylesEnabler4' to={'http://www.univgb.rnu.tn/'}>UNIVERSITE DE GABES </Link>
        
        <br/> 
        <br/> 

        </center>
    <br/></div>
  </footer>
  );
};
export default Footer;