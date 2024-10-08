import React,{useRef, useState ,useEffect}from 'react'
import './public/styles/Inscription.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './public/Header';
import Footer from './public/Footer';
import { MdDeleteForever } from "react-icons/md";
import { BsFillSendCheckFill } from "react-icons/bs";
import { VscDebugBreakpointUnsupported } from "react-icons/vsc";


import { MdOutlinePersonAdd } from "react-icons/md";
import Swal from 'sweetalert2';

const Inscription = () => {


    const navigate = useNavigate();
    const [Nom , setNom]= useState('');
    const  [Prenom , setPrenom]= useState('');
    const [email , setEmail] = useState('')
    const [cin, setCin ]=useState('');
    const [tel,setTel]=useState('');
    const[SujetThese,SetSujetThese]=useState('');
    const[Address,setAddress] =useState('');
    const[dateNaissance, SetDateNaissances]=useState(new Date());
    const [lieuNaissance,setLieuNaissance]=useState('');
    const [StructureRecherche,setStructureRecherche] = useState('');
  const [specialite, setSpecialite] = useState("");
  const [FirstYearInscription,setFirstYearInscription]=useState('')
  const [FirstDirTheseName,setFirstDirTheseName] = useState('');
  const [FirstDirTheseGrade,setFirstDirTheseGrade]=useState('');
  const [FirstDirTheseLieuTravail,setFirstDirTheseLieuTravail]=useState('');
  const[FirstDirTheseEmail,setFirstDirTheseEmail]=useState('');
  const [FirstDirThesePhone,setFirstDirThesePhone]=useState('');
  const [TypeThese,setTypeThese] = useState('');
  const [SecondDirTheseName , setSecondDirTheseName]=useState('')
  const[SecondDirTheseGrade , setSecondDirTheseGrade] =useState('');
  const [SecondDirTheseLieuTravail,setSecondDirTheseLieuTravail]=useState('');
  const [SecondDirTheseEmail, setSecondDirTheseEmail]=useState('none@none.com');
  const [SecondDirTheseStructureRecherche,setSecondDirTheseStructureRecherche]=useState('');
  const[SecondDirThesePhone,setSecondDirThesePhone]=useState('');
  const[convention,setConvention]=useState('');
  const [AddNewDirThese , setAddNewDirThese] = useState(false);
  const[AddNewCoEncadrant ,setAddNewCoEncadrant]=useState(false);
  const[CoEncadrantName,setCoEncadrantName]=useState('');
  const[CoEncadrantGrade,setCoEncadrantGrade]=useState('');
  const [CoEncadrantLieuTravail,setCoEncadrantLieuTravail]=useState('');
  const[CoEncadrantEmail,setCoEncadrantEmail]=useState('none@none.com');
  const[CoEncadrantPhone,setCoEncadrantPhone]=useState('');
  const State = 'En attente';
  const is_inscrit=0;
  const Niveau = '1ere année';
  const [Etablissement, setEtablissement]=useState('')
  const coEncadrantRef = useRef(null);

  const [OpenPreInscription,setOpenPreInscription] = useState(false)
  const handleCoEncadrantClick = () => {
    if (coEncadrantRef.current) {
      coEncadrantRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setAddNewCoEncadrant(true);
  };
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/controlling/preinscription/preinscription/api/getter') 
      .then(response => {
        const data = response.data;
        setOpenPreInscription(data.is_open);
      })
      .catch(error => {
      });
  }, []); 



    const  handleInscription =async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('Nom', Nom);
        formData.append('Prenom', Prenom);
        formData.append('email', email);
        formData.append('cin', cin);
        formData.append('tel', tel);
        formData.append('SujetThese', SujetThese);
        formData.append('Address', Address);
        formData.append('dateNaissance', dateNaissance);
        formData.append('lieuNaissance', lieuNaissance);
        formData.append('StructureRecherche', StructureRecherche);
        formData.append('specialite', specialite);
        formData.append('FirstDirTheseName', FirstDirTheseName);
        formData.append('FirstDirTheseGrade', FirstDirTheseGrade);
        formData.append('FirstDirTheseLieuTravail', FirstDirTheseLieuTravail);
        formData.append('FirstDirTheseEmail', FirstDirTheseEmail);
        formData.append('FirstDirThesePhone', FirstDirThesePhone);
        formData.append('TypeThese', TypeThese);
        formData.append('SecondDirTheseName', SecondDirTheseName);
        formData.append('SecondDirTheseGrade', SecondDirTheseGrade);
        formData.append('SecondDirTheseLieuTravail', SecondDirTheseLieuTravail);
        formData.append('SecondDirTheseEmail', SecondDirTheseEmail);
        formData.append('SecondDirTheseStructureRecherche', SecondDirTheseStructureRecherche);
        formData.append('SecondDirThesePhone', SecondDirThesePhone);
        formData.append('convention', convention); 
        formData.append('CoEncadrantName', CoEncadrantName);
        formData.append('CoEncadrantGrade', CoEncadrantGrade);
        formData.append('CoEncadrantLieuTravail', CoEncadrantLieuTravail);
        formData.append('CoEncadrantEmail', CoEncadrantEmail);
        formData.append('CoEncadrantPhone', CoEncadrantPhone);
        formData.append('State',State);
        formData.append('Niveau',Niveau);
        formData.append('is_inscrit',is_inscrit);
        formData.append('Etablissement',Etablissement)
        formData.append('FirstYearInscription',FirstYearInscription);

        
        

        
        axios.post('http://127.0.0.1:8000/api-chercheur/create_inscription/', formData)
        .then(response => {
              if ((response.status === 200 ) & (!response.data.CinExist===false)) {
                // Handle success (status code 200)
                navigate(`/success/${cin}`);
                
              } 
              else {
              }
              if (response.data.CinExist === true) {
                  Swal.fire('cin existe deja')
              }
            })
        .catch(error => {
          // Handle error
        });
      



    }
 
    return (
    <div className=''>
    <Header/>
    <br/>
    {(((OpenPreInscription ===true) || (OpenPreInscription==='True' ))||( (OpenPreInscription ===1 )||(OpenPreInscription ==='true'))) &&(
      <div>
    <center>
    <br/>
    <h3 className='etoileimpo' >
      Remarque :
      <br/>
      <br/>
      <h5 style={{marginBottom:'10px'}}><VscDebugBreakpointUnsupported style={{marginTop:'-4px'}}/> L'étudiant doit vérifie les  informations fournies avant de s'inscrire   . 
      <br/> <VscDebugBreakpointUnsupported style={{marginTop:'-4px'}}/> Tous les champs ayant le symbole (*) sont des  champs obligatoires  . </h5>
    </h3>
    <br/><br/><br/>
    <form onSubmit={handleInscription} className='FormStyling'>
    <div className='Informationpersofnellesholder'>
    <br/><br/>
    <hr className='ENDPOINT'/>
        <h4><center>Informations personnelles </center></h4>
        <hr className='ENDPOINT'/>
          <br/><br/>
      <div className='NameAndPrenomInputHolder'>
      <hr/>
    <label className='NomHolderInput'>
    <span>Nom <span className='etoileimpo'>* </span> :  </span> 
        <input type='text' value={Nom} required  onChange={(e) =>setNom(e.target.value)} placeholder='Nom' />
    </label>
    
    <label className='PrenomHolderInput'>
    <span>Prénom <span className='etoileimpo'>* </span> :  </span> 

        <input type='text' value={Prenom}  required onChange={(e)=>setPrenom(e.target.value)} placeholder='Prenom' />
    </label>
    </div>
    <div className='DateNaissanceAndLieuHolder'>
    <label className='DateInputHolder'>
    <span>Date de Naissance <span className='etoileimpo'>* </span> :  </span> 

        <input type='date' value={dateNaissance} required onChange={(e)=>SetDateNaissances(e.target.value)} placeholder='Date de Naissance'/>
    </label>
    <label className='LieuNaissanceInputHolder'>
    <span>Lieu de naissance <span className='etoileimpo'>* </span> :  </span>

    <input type='text' value={lieuNaissance} required onChange={(e)=>setLieuNaissance(e.target.value)} placeholder='Lieu de Naissance'/>
</label>
</div>
<div className='CINORPASSPORTANDTELHolder'>
<label className='CINPASSPORTINPUTHOLDER'>
<span>Passport / CIN <span className='etoileimpo'>* </span> :  </span>

    <input type='text' value={cin} required onChange={(e)=>setCin(e.target.value)} placeholder='Passport / CIN' />
</label>

    <label className='TelINPUTHOLDER'>
    <span>Téléphone <span className='etoileimpo'>* </span> :  </span> 
        <input type="tel" required value={tel} onChange={(e)=>setTel(e.target.value)} pattern='[0-9]*' placeholder='téléphone'/>
    </label>
    </div>
    <div className='AdressesHolder'>
    <label className='EmailInputHolder'>
    <span>E-mail <span className='etoileimpo'>* </span> :  </span> 

        <input type='email'  required onChange={(e)=>setEmail(e.target.value)} placeholder='E-mail'/>
    </label>
    <label className='AddressACTInputHolder'>
    <span>Address Actuelle <span className='etoileimpo'>* </span> :  </span> 

        <input type='text' required onChange={(e)=>setAddress(e.target.value)} placeholder='Adresse'/>
    </label>
<br/>
    </div>
    </div>







    <div className='TheseInfoInputingHolder'>
    <center>
    <br/><br/><br/>
    <hr className='ENDPOINT'/>
        <h4><center>Informations sur la thèse </center></h4>
        <hr className='ENDPOINT'/>
        </center>
        <br/><br/>
    <div className='SelectorsHolderForInfoThese'>
    <label className='AnnéeInscriptionSelector' >
    
    <span>Année d'inscription <span className='etoileimpo'>* </span> :  </span> 
   <select required onChange={(e)=>setFirstYearInscription(e.target.value)} > 
            <option selected disabled value= {null}> Année d'inscription</option>
            <option value = '1ere année'> 1 ére année</option>
            <option value = '1ere année'> 2 éme année</option>
            <option value = '1ere année'> 3 éme année</option>
            <option value = '1ere année'> 4 éme année</option>
            <option value = '1ere année'> 5 éme année</option>
            <option value = '1ere année'> 6 éme année</option>

        </select>
    </label>
      
     <label className='TypeTheseSelectingInput'>
     <span>Type de thèse <span className='etoileimpo'>* </span> :  </span>

        <select required onChange={(e)=>setTypeThese(e.target.value)}>
        <option value='Cotutelle'>Type de thèse</option>
        <option value='Cotutelle'>Co-Tutelle</option>
        <option value='Non Co-Tutelle'>Non Co-tuttelle</option>
        <option value='Codirection'>Co-Direction</option>

        </select>
     </label>
     </div>
     <div className='StructureRechercheAndSujetTheseinputHolder'>
    <label className='StructureInputHolder'> 
    <span>Structure <span className='etoileimpo'>* </span> :  </span> 

        <input type='text' value={StructureRecherche} placeholder='Unité / Labo' onChange={(e)=>setStructureRecherche(e.target.value)} required  />
    </label>
    <label className='SujetTheseInputHolder'> 
    <span>Sujet de thèse <span className='etoileimpo'>* </span> :  </span> 

        <input type='text'  value={SujetThese} placeholder='Sujet de These' onChange={(e)=>SetSujetThese(e.target.value)} required />
    </label>
  </div>
  <div className='SpecialiteInputHolder'>
    <label className='SpecialiteInputlabel'>
  
    <span>Spécialité : <span className='etoileimpo'>* </span> </span> 

        <input type='text' value={specialite} placeholder='Spécialité' onChange={(e)=>setSpecialite(e.target.value)} required />
    </label>
    <br/>
    <label>
      <span>Etablissement : <span className='etoileimpo'>*</span></span>
      <input type='text' placeholder='Etablissement' onChange={(e)=>setEtablissement(e.target.value)} required />
    </label>
    </div>
</div>
        <br/>
        <div className='DirTheseInfo'>
        <center>
    <br/><br/><br/>
    <hr className='ENDPOINT'/>
        <h4><center>Informations sur le directeur de thèse</center></h4>
        <hr className='ENDPOINT'/>
        </center>
        <br/><br/>
        <div className='DirTheseNameAndGradeHolder'>
   
        <label className='NameDirTheseHolderInput'>
        <span>Nom Complet<span className='etoileimpo'>* </span> :  </span> 

            <input type='text' value={FirstDirTheseName} placeholder='Nom de Premier directeur de these' onChange={(e)=>setFirstDirTheseName(e.target.value)} required />
        </label>
        <label className='GradeSelectorInputDirThese'>
        <span>Grade <span className='etoileimpo'>* </span> :  </span> 

            <select required onChange={(e)=>setFirstDirTheseGrade(e.target.value)}>
                <option  disabled selected value={null} >Grade de directeur de thèse</option>
                <option value='Pr' >Pr </option> 
                <option value='MA' >MA</option>

            </select>
        </label>
        </div>
        <div className='LieuTravailAndEmailDirThese'>
    <label className='LieuTravailDirThese'>
    <span>Lieu de travail <span className='etoileimpo'>* </span> :  </span> 

        <input type='text' placeholder='Lieu de Travail de directeur de thèse' onChange={(e)=>setFirstDirTheseLieuTravail(e.target.value)} required      />
    </label>

    <label className='EmailDirTheseInputting'>       
     <span>E-mail  <span className='etoileimpo'>* </span> :  </span> 

        <input  type='email' placeholder='E-mail de directeur de thèse' onChange={(e)=>setFirstDirTheseEmail(e.target.value)} required/>
    </label>
    </div>
    <div className='TelephoneDirTheseInput'>
<label className='TelephoneDirTheseHolder'>
<span>Téléphone <span className='etoileimpo'>* </span> :  </span> 

    <input  type="tel" placeholder='Téléphone de directeur de thèse' onChange={(e)=>setFirstDirThesePhone(e.target.value)} required pattern='[0-9]*' />
</label>
</div>
</div>



      

      

        {((TypeThese === 'Cotutelle' || TypeThese ==='Codirection') &&(AddNewDirThese===false))&&(
            <div className='inputingDetails2emedirThese'>

            <center>
    <br/><br/><br/>
    <hr className='ENDPOINT'/>
        <h4><center>Informations sur le Co-Encadrant</center></h4>
        <hr className='ENDPOINT'/>
        </center>

            <div className='DirTheseNameAndGradeHolder'>

              <label className='NameDirTheseHolderInput'>
                   <span> Nom Complet <span className='etoileimpo'>*</span>: </span>
                <input type='text' className='SecondDirTheseNameInput' value={SecondDirTheseName} required={true} onChange={(e)=>setSecondDirTheseName(e.target.value)}/>
              </label>
              <label  className='GradeSelectorInputDirThese'>
                  <span>Grade  <span className='etoileimpo'> *</span>: </span>
                  <select id='GradeSecondSelector' value={SecondDirTheseGrade} onChange={(e) => setSecondDirTheseGrade(e.target.value)} required={true}>
                    <option  value={null} selected={true} disabled={true}> -- </option>
                    <option value='Pr'>Pr</option>
                    <option value='Mc'> MC </option>
                  </select>
              </label>
              </div>
              <div className='LieuTravailAndEmailDirThese'>

              <label className='LieuTravailDirThese'>
                        
                                <span>Lieu de travail <span className='etoileimpo'>*</span></span>
                  <input className='SecondDirTheseInput-2' type='text' required={true} value={SecondDirTheseLieuTravail} onChange={(e) => setSecondDirTheseLieuTravail(e.target.value)}/>
              </label>
              <label  className='EmailDirTheseInputting'> 
                <span>E-mail <span className='etoileimpo'>*</span></span>
                <input type='text' className='SecondDirTheseEmailInput' required onChange={(e)=>setSecondDirTheseEmail(e.target.value)}/>
           </label> 
</div>
                  <div className='TelephoneDirTheseInput'>


        <label className='TelephoneDirTheseHolder'>
              <span> Téléphone :<span className='etoileimpo'>*</span></span>
              <input type='tel' required onChange={(e)=>setSecondDirThesePhone(e.target.value)} pattern='+[0-9]*'/>
              

          </label>

</div>
          {TypeThese ==='Cotutelle' && (
            <div className='TelephoneDirTheseInput'>
            <label className='TelephoneDirTheseHolder'>
            <span>Convention : <span className='etoileimpo'>*</span></span> 
            <input className='UserSelectorFile' type='File' onChange={(e)=>setConvention(e.target.files[0])} value={convention}/>
            </label>
            </div>
          )}
            </div>
          )}
          {TypeThese === null && (
            <div></div>
          )}
          {TypeThese ==='Non Co-Tutelle' && (
            <div></div>
          )}



      

          {((TypeThese === 'Cotutelle' || TypeThese ==='Codirection')&&(AddNewDirThese===false)) && (
            <div className='inputingDetails2emedirThese'>
    <center>
    <br/><br/><br/>
    <hr className='ENDPOINT'/>
        <h4><center>Informations sur le deuxiéme directeur de thèse</center></h4>
        <hr className='ENDPOINT'/>
         <br/><br/>
        </center>
            <div className='DirTheseNameAndGradeHolder'>

              <label  className='NameDirTheseHolderInput'>
                <span> Nom Complet <span className='etoileimpo'>*</span> </span>
                <input type='text' className='SecondDirTheseNameInput' value={SecondDirTheseName} required={true} onChange={(e)=>setSecondDirTheseName(e.target.value)}/>
              </label>
              <label  className='GradeSelectorInputDirThese'>
                <div className='SecondDirTheseGradeChamp'>
                  <span>Grade <span className='etoileimpo'>*</span></span>
                  <select id='GradeSecondSelector' value={SecondDirTheseGrade} onChange={(e) => setSecondDirTheseGrade(e.target.value)} required={true}>
                    <option  value={null} selected={true} disabled={true}> -- </option>
                    <option value='Pr'>Pr</option>
                    <option value='Mc'> MC </option>
                  </select>
                </div>
              </label>
              </div>

              <div className='LieuTravailAndEmailDirThese'>

              <label className='LieuTravailDirThese'>
                  <span>Lieu de travail <span className='etoileimpo'>*</span></span>
                  <input className='SecondDirTheseInput-2' type='text' required={true} value={SecondDirTheseLieuTravail} onChange={(e) => setSecondDirTheseLieuTravail(e.target.value)}/>
              </label>

              <label className='EmailDirTheseInputting'>       
                <span>E-mail <span className='etoileimpo'>*</span></span>
                <input type='text' className='SecondDirTheseEmailInput' required onChange={(e)=>setSecondDirTheseEmail(e.target.value)}/>
           </label> 

        
 

                </div>
                <div className='TelephoneDirTheseInput'>

               <label className='TelephoneDirTheseHolder'>
                   <span>Téléphone <span className='etoileimpo'>*</span> : </span>
              <input type='tel' onChange={(e)=>setSecondDirThesePhone(e.target.value)} placeholder='Téléphone de deuxiéme directeur de thèse' required/>

          </label>
</div>
          {TypeThese ==='Cotutelle' && (
            <div className='TelephoneDirTheseInput'>
            <label className='TelephoneDirTheseHolder'>
            <div className='ConventionChamp'>
            <span>Convention <span className='etoileimpo'>* : </span></span>
            <input type='File' onChange={(e)=>setConvention(e.target.files[0])} value={convention}/>
              </div>
            </label>
            </div>
          )}
            </div>
          )}
          {TypeThese === null && (
            <div></div>
          )}
          {TypeThese ==='Non Co-Tutelle' && (
            <div></div>
          )}






{AddNewCoEncadrant ===true &&(
    <div className='inputingDetails2emedirThese' ref={coEncadrantRef}>
    <center>
    <br/><br/><br/>
    <hr className='ENDPOINT'/>
        <h4><center>Informations sur le Co-Encadrant</center></h4>
        <hr className='ENDPOINT'/>
        </center>
  <button onClick={()=>{setAddNewCoEncadrant(false)}} className='delete-option-button'> <MdDeleteForever /> Delete </button>            <br/><br/><br/>

  <div className='DirTheseNameAndGradeHolder'>

 <label className='NameDirTheseHolderInput'>

    <div className='Co-encadrant-name-holder'>
      <span>Nom Complet <span className='etoileimpo'>*</span>:</span>
        <input type='text' value={CoEncadrantName} onChange={(e)=>setCoEncadrantName(e.target.value)} required={true} className='SecondDirTheseNameInput' />
      </div>
    </label>
    <label  className='GradeSelectorInputDirThese'>
    
        <span>Grade de Co-Encadrant  <span className='etoileimpo'>*</span>:</span>

        <select value={CoEncadrantGrade} onChange={(e) => setCoEncadrantGrade(e.target.value)} required={true}>
                    <option  value={null} selected={true} disabled={true}> -- </option>
                    <option value='Pr'>Pr</option>
                    <option value='Mc'> MC </option>
                    <option value='Ma'>MA</option>
                  </select>
      
    </label>
    </div>
    <div className='LieuTravailAndEmailDirThese'>

    <label className='LieuTravailDirThese'>

          <span>Lieu de travail <span className='etoileimpo'>*</span>: </span>
          <input type='text' value={CoEncadrantLieuTravail} required={true} onChange={(e)=>setCoEncadrantLieuTravail(e.target.value)}/>
 
      </label>
      <label className='EmailDirTheseInputting'>       
    <span>E-mail <span className='etoileimpo'>*</span>: </span>
        
          <input type='email'  placeholder='Email de Co-Encadrant' required  onChange={(e)=>setCoEncadrantEmail(e.target.value)}/>

      </label>
      </div>

      <div className='TelephoneDirTheseInput'>

      <label className='TelephoneDirTheseHolder'>
          <span> Téléphone <span className='etoileimpo'>*</span>: </span>
            <input type='tel' pattern='[0-9]*' onChange={(e)=>setCoEncadrantPhone(e.target.value)} required />
      </label>
  </div>
  </div>
)}
{/***ddddddddddddddd */}

  
{(AddNewDirThese === true && ((TypeThese!==null) && (TypeThese ==='Non Co-Tutelle'))) && ( 
        <div className='ADDNewDirThese'>
        <center>
    <br/><br/><br/>
    <hr className='ENDPOINT'/>
        <h4><center>Informations sur le deuxiéme directeur de thèse </center></h4>
        <hr className='ENDPOINT'/>
        </center>
        <br/>     <div className='Button-container'>
              <button className='delete-option-button-dirthese' onClick={()=>{setAddNewDirThese(false)}}>  <MdDeleteForever /> Delete

</button>
       
       
       <br/><br/>
            </div>
<div className='DirTheseNameAndGradeHolder'>

            <label className='NameDirTheseHolderInput'>
              <div className='NameHolder2ndDirThese'>
                <span> Nom Complet <span className='etoileimpo'>*</span></span>
                <input type='text' className='SecondDirTheseNameInput'/>
              </div>
            </label>
            <label  className='GradeSelectorInputDirThese'>
              <div className='GradeDirTheseOptional'>
                <span> Grade de directeur de thèse <span className='etoileimpo'>*</span></span>

                <select id='OptionalGradeSecondSelector' value={SecondDirTheseGrade} onChange={(e) => setSecondDirTheseGrade(e.target.value)} required={true}>
                    <option  value={null} selected={true} disabled={true}> -- </option>
                    <option value='Pr'>Pr</option>
                    <option value='Mc'> MC </option>
                  </select>
              </div>
            </label>
            </div>
            <div className='LieuTravailAndEmailDirThese'>

            <label className='LieuTravailDirThese'>
              <div className='LieuTravailOptional'>
                <span>Lieu de travail <span className='etoileimpo'>*</span></span>
                <input type='text' onChange={(e) => SecondDirTheseLieuTravail(e.target.value)} required={true} value={SecondDirTheseLieuTravail}/>
                               </div>
            </label>
            <label className='EmailDirTheseInputting'>       
              <div className='OptionalDirTheseEmail'>
               <span>E-mail <span className='etoileimpo'>*</span>:</span>
              <input type='email'  className='OptionalSecondDirTheseEmailInput' required={true} onChange={(e)=>setSecondDirTheseEmail(e.target.value)}  />
               
               </div>
              
            </label>
            </div>

            <div className='TelephoneDirTheseInput'>

<label className='TelephoneDirTheseHolder'>
    <span> Téléphone <span className='etoileimpo'>*</span>: </span>
      <input type='tel' pattern='[0-9]*' onChange={(e)=>setSecondDirThesePhone(e.target.value)} required />
</label>
</div>

          </div>
      )}


      <div className='Button-CoEncadrant-container'>
        {(AddNewCoEncadrant === false) && (
          <div className='AddingCOENCADRANT'>
            <button className='add-new-CoEncadrant-button' onClick={handleCoEncadrantClick}><MdOutlinePersonAdd size={23} /> Co-Encadrant</button>
          </div>
        )}
      
        <div>
     {(AddNewDirThese===false && TypeThese ==='Non Co-Tutelle') && ( 
      <div >
        <button className='add-new-DirThese-button' onClick={()=>{setAddNewDirThese(true)}}>directeur de thèse
</button>
      </div>
     )}


     </div>

     </div>



<br/><br/>


<button  className='button-submit'  type="submit"><BsFillSendCheckFill  className='ICONVALIDATE'/>  Valider</button>
    </form>
  </center>

<Footer/>

</div>
)} 
{((((OpenPreInscription ===0)||( OpenPreInscription === false )))||(((OpenPreInscription==='False') || (OpenPreInscription==='false')))) &&(
  <div style={{marginTop:"100px",marginBottom:"100px",color:'red'}}>
  <center> <h1>la préinscription est fermer pour le moment </h1></center>
  </div>
)}
<Footer></Footer>   </div>
  )
}

export default Inscription