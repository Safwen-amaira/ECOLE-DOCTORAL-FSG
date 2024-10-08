import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './public/styles/profile.css'
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom';

import SuccessPreInscription from '../components/SuccessPreinscription'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const ChecheurProfile = (props) => {
    const cin = props.cin
 

    const [chercheur, setChercheur] = useState(null)
 
    const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
  
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }
    useEffect(() => {
        const fetchchercheurDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api-chercheur/api/get_inscription/${cin}/`);
                setChercheur(response.data);
            } catch (error) {
            }
        };

        fetchchercheurDetails();
    }, [cin]);
    const forceDownload = (file) => {
        window.open('http://127.0.0.1:8000/' + file, '_blank');
    };
    const [image,setimage]=useState('')
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setimage(file);
    };
    const [clicked,setclicked]=useState(false)

   const handleclickeked=()=>{
if (clicked==true){setclicked(false)}
if (clicked==false){setclicked(true)}
   }

const handleUpdate = (e) => {
    const formData = new FormData();
   if (image) {
    formData.append('image', image);
}
    Swal.fire({
        title: "Voulez-vous modifier une actualité ?",
        showDenyButton: true,
        //showCancelButton: true,
        confirmButtonText: "Confirmer",
        denyButtonText: "Annuler"
    }).then((result) => {

        if (result.isConfirmed) {
            axios.put('http://127.0.0.1:8000/api-chercheur/chercheur-id/' + cin + '/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    Swal.fire("modifier avec success ","","success");
                    
                })
                .catch(err => {
                });
        }

    });


};
const navigate = useNavigate();

  const handleClick = () => {
    navigate('/change-password');
  };
   

return (

        <div className='chercheur-content'>
            <button
        style={{ margin: '-1px', float: 'right',background:'green' ,fontSize: '11px'}}
        onClick={handleClick}
      >
    Change Password
      </button>
        {chercheur !== null && (
            <div>
                <div className='profile-section'>
                    <div className='profile-item'>
                        <p><strong>Image:</strong></p>
                        
                        {chercheur.image ? (
                           <img src={`http://127.0.0.1:8000${chercheur.image}`} alt="Non-ajouté" />
                        
                        ) : <p>Non-ajouté</p>}
                  <br /> <button style={{background:'green',marginLeft:'-10px',marginTop:'-1px',marginBottom:'-1px',fontSize: '11px'}} onClick={handleclickeked} >Modifier Image</button>
                   {clicked ? (
                            <div className='form-group mb-3'>
                            <label></label>
                            <label>image    :</label>
                            <input
                                type='file'
                                className='form-control-file'
                                name='logo'
                                onChange={(e) => handleFileChange(e)}
                            />
                            {image ? (
                            <div className='form-group mb-3'>
                           
                            <button className="btn btn-success" onClick={(e) => handleUpdate(e)}>Confirmer</button>
                        </div>
                        
                        ) : ""}
                        </div>
                        
                        ) : ""}
                        <>
  {!show && (
    <Button   onClick={() => setShow(true)}>
      Reçu
    </Button>
  )}
  <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
    <Modal.Title>Réçu d'inscription - EDSEN </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <SuccessPreInscription cin={cin}/>
    </Modal.Body>
    <Modal.Footer><Button onClick={()=>setShow(false)}>Fermer</Button></Modal.Footer>
  </Modal>
</>
                        <p><strong>Nom de chercheur:</strong> {chercheur.Nom}</p>
                        <p><strong>Prénom de chercheur:</strong> {chercheur.Prenom}</p>
                        <p><strong>Cin / Passport :</strong> {chercheur.cin}</p>
                        <p><strong>Email :</strong> {chercheur.email}</p>
                        <p><strong>Numéro de Téléphone :</strong> {chercheur.tel}</p>
                        <p><strong>Date de naissance:</strong> {chercheur.dateNaissance}</p>
                        <p><strong>Lieu de naissance:</strong> {chercheur.lieuNaissance}</p>
                        <p><strong>Addresse :</strong> {chercheur.Address}</p>
                        <p><strong>Structure :</strong> {chercheur.StructureRecherche}</p>
                        <p><strong>Spécialité :</strong> {chercheur.specialite}</p>
                        <p><strong>Niveau :</strong> {chercheur.Niveau}</p>
                        <p><strong>Sujet de thèse :</strong> {chercheur.SujetThese}</p>
                        <p><strong>Type de thèse:</strong> {chercheur.TypeThese}</p>
                        <p><strong>État :</strong> {chercheur.State}</p>
                        <p><strong>Premier Directeur de Thèse - Nom:</strong> {chercheur.FirstDirTheseName}</p>
                        <p><strong>Premier Directeur de Thèse - Grade:</strong> {chercheur.FirstDirTheseGrade}</p>
                        <p><strong>Premier Directeur de Thèse - Lieu de Travail:</strong> {chercheur.FirstDirTheseLieuTravail}</p>
                        <p><strong>Premier Directeur de Thèse - Email:</strong> {chercheur.FirstDirTheseEmail}</p>
                        <p><strong>Premier Directeur de Thèse - Téléphone:</strong> {chercheur.FirstDirThesePhone}</p>
                        {chercheur.SecondDirTheseName && (
                            <>
                                <p><strong>Deuxième Directeur de Thèse - Nom:</strong> {chercheur.SecondDirTheseName}</p>
                                <p><strong>Deuxième Directeur de Thèse - Grade:</strong> {chercheur.SecondDirTheseGrade}</p>
                                <p><strong>Deuxième Directeur de Thèse - Lieu de Travail:</strong> {chercheur.SecondDirTheseLieuTravail}</p>
                                <p><strong>Deuxième Directeur de Thèse - Email:</strong> {chercheur.SecondDirTheseEmail}</p>
                                <p><strong>Deuxième Directeur de Thèse - Téléphone:</strong> {chercheur.SecondDirThesePhone}</p>
                            </>
                        )}
                        {chercheur.CoEncadrantName && (
                            <>
                                <p><strong>Co-Encadrant   - Nom:</strong> {chercheur.CoEncadrantName}</p>
                                <p><strong>Co-Encadrant    - Grade:</strong> {chercheur.CoEncadrantGrade}</p>
                                <p><strong>Co-Encadrant   - Lieu de Travail:</strong> {chercheur.CoEncadrantLieuTravail}</p>
                                <p><strong>Co-Encadrant    - Email:</strong> {chercheur.CoEncadrantEmail}</p>
                                <p><strong>Co-Encadrant    - Téléphone:</strong> {chercheur.CoEncadrantPhone}</p>
                            </>
                        )}
                        {chercheur.convention && (
                            <>
                                <p><strong>Convention:</strong></p>
                                <button className='download-button' onClick={() => forceDownload(chercheur.file)}>Télécharger</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
    )
}

export default ChecheurProfile
