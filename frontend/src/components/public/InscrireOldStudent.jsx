import React, { useEffect, useState } from 'react'
import './Preinscription.css'
import { DatePicker } from "react-rainbow-components";
import { GiPositionMarker } from "react-icons/gi";
import { MdAlternateEmail } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import { MdDeleteForever } from "react-icons/md";
import "react-phone-input-2/lib/bootstrap.css";
import { IoPersonAddOutline } from "react-icons/io5";
import axios from 'axios';
import Footer from '../public/Footer';
const InscrireOldStudent = (props) => {
    const [Nom , setNom]= useState('');
    const  [Prenom , setPrenom]= useState('');
    const [email , setEmail] = useState('')
    const cin =useState(props.cin);
  
    const [tel,setTel]=useState('');
    const[SujetThese,SetSujetThese]=useState('');
    const[Address,setAddress] =useState('');
    const[dateNaissance, SetDateNaissances]=useState(new Date());
    const [lieuNaissance,setLieuNaissance]=useState('');
    const [StructureRecherche,setStructureRecherche] = useState('');
  const [specialite, setSpecialite] = useState("");
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
  const[is_inscrit,setIs_Inscrit]=useState(false);
  const [Niveau,setNiveau] =useState('')
  const [etablissement, setEtablissement] = useState(''); 

    

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api-chercheur/api/get_inscription/${props.cin}`) 
      .then(response => {
        const data = response.data;
        setNom(data.Nom);
        setPrenom(data.Prenom);
        setEmail(data.email);
        setTel(data.tel);
        SetSujetThese(data.SujetThese);
        setAddress(data.Address);
        SetDateNaissances(data.dateNaissance);
        setLieuNaissance(data.lieuNaissance);
        setStructureRecherche(data.StructureRecherche);
        setSpecialite(data.specialite);
        setFirstDirTheseName(data.FirstDirTheseName);
        setFirstDirTheseGrade(data.FirstDirTheseGrade);
        setFirstDirTheseLieuTravail(data.FirstDirTheseLieuTravail);
        setFirstDirTheseEmail(data.FirstDirTheseEmail);
        setFirstDirThesePhone(data.FirstDirThesePhone);
        setTypeThese(data.TypeThese);
        setSecondDirTheseName(data.SecondDirTheseName);
        setSecondDirTheseGrade(data.SecondDirTheseGrade);
        setSecondDirTheseLieuTravail(data.SecondDirTheseLieuTravail);
        setSecondDirTheseEmail(data.SecondDirTheseEmail);
        setSecondDirTheseStructureRecherche(data.SecondDirTheseStructureRecherche);
        setSecondDirThesePhone(data.SecondDirThesePhone);
        setConvention(data.convention);
        setAddNewDirThese(data.AddNewDirThese);
        setAddNewCoEncadrant(data.AddNewCoEncadrant);
        setCoEncadrantName(data.CoEncadrantName);
        setCoEncadrantGrade(data.CoEncadrantGrade);
        setCoEncadrantLieuTravail(data.CoEncadrantLieuTravail);
        setCoEncadrantEmail(data.CoEncadrantEmail);
        setCoEncadrantPhone(data.CoEncadrantPhone);
        setEtablissement(data.etablissement);
        setNiveau(data.Niveau);
        setIs_Inscrit(data.is_inscrit);
    })
      .catch(error => {
      });
  }, [props]); 



const handleSubmit = async () =>{
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
  formData.append('State','En attente');
  formData.append('Niveau',Niveau);
  formData.append('is_inscrit',is_inscrit);


  
  try {
    await axios.put(`http://127.0.0.1:8000/api-chercheur/update_chercher_informations/${cin}/`, formData);

  } catch (error) {
  }
}
    

  return (
    <div className='comportementdePreInscription'>
    {(((is_inscrit===false)||(is_inscrit === 0) ||(is_inscrit ==='False')||(is_inscrit ==='0'))&&(Nom !==null && Nom !== '') )&&(<div>

      <div className='Introduction'>
        <span className='Bienvenu'> Bienvenu dans le site officiel de l'ecole doctorale EDSEN .</span> <br/>
        <span className='information'> Pour pré-inscrire à l'ecole doctorale , merci de remplir les champs au-dessus . </span><br/>
        <span className='Remarque'><span className='RemarqueTitle'>Remarque :</span><span> Tous les champs ayant le symbole<span className='etoileimpo'> * </span> sont obligatoires .</span></span><br/>
      </div>


      <form onSubmit={handleSubmit}>
      <div className='Information-Personelle'>
      <span className='information-personelle-title'>    Informations personelles </span>
     

      </div>
    <label>
    <div className='prenomChamp'>
      <span className='prenominput'>Prenom <span className='etoileimpo'> * </span> </span>
      <input  type='text' defaultValue={Prenom}   required='true'/>
<span>الإسم <span className='etoileimpo'> * </span> </span>  </div>  </label>

<label>  <div className='nomChamp'>
  <span className='nominput'>Nom <span className='etoileimpo'> * </span></span>
  <input  type="text" defaultValue={Nom}   required='true'/>
  <span>اللقب <span className='etoileimpo'>*</span></span></div>
</label>

<div className='LineONTHEPREINSCRIPTION'>
<label>
  <div className='dateChamp'>
    <span className='DateNaissance-A1' style={{marginTop:"13px"}}> <p className='DateNaissance-A12'>Date de naissance <span className='etoileimpo'>*</span></p></span>
    <div className='datePicker-1'>
<input className='date-picker1' type='date' defaultValue={dateNaissance}  /></div>
            <span className='DateNaissance-A2' style={{marginTop:"13px"}}>تاريخ الولادة<span className='etoileimpo'>*</span></span>
  </div>
</label>
<label><div className='LieuNaissanceChamp' style={{marginTop:"20px",marginLeft:"214px"}}>
              <span style={{marginLeft:'-9%',marginTop:'-0.001%',position:'absolute'}}>Lieu de naissance <span className='etoileimpo'>*</span></span>
              <input  type='text'  defaultValue={lieuNaissance}    required='true'/>
              <span style={{position:"absolute",marginLeft:"0.2%",marginTop:'0.2%'}}>مكان الولادة <span className='etoileimpo'>*</span></span>
</div></label>
</div>
<label>
  <div className='CinChamp'>

    <span> Cin / Passport <span className='etoileimpo'>*</span> <BsCreditCard2Front className='CardIcon' />
</span>
    <input  type='text' required='true' defaultValue={props.cin}  />
    <span>رقم ب.ت.و / جواز سفر<span className='etoileimpo'>*</span></span>
  </div>
</label>
<label>
  <div className='TelephoneChamp'>
    <span>Num Téléphone <span className='etoileimpo'>*</span><MdOutlinePhoneIphone className='PhoneIcon'/></span>
    <input  type='text' defaultValue={tel}     required='true'/>
    <span>رقم الهاتف <span className='etoileimpo'>*</span></span>

  </div>
</label>
    <label>
      <div className='AddressChamp'>
        <span>Adresse actuelle  <GiPositionMarker className='iconAdress' /> <span className='etoileimpo'>*</span></span>
        <input  type='text' required='true' defaultValue={Address}    />
        <span>العنوان <span className='etoileimpo'>*</span></span>
      </div>
    </label>

    <label> <div className='EmailChamp'>
      <span>Address e-mail<span className='etoileimpo'>*</span> <MdAlternateEmail className='emailIcon' /></span>
      <input  type='email' defaultValue={email} required='true'   />
      <span>البريد الإلكتروني<span className='etoileimpo'>*</span></span>
    </div></label>

    <div className='AutreInformation'>
      <span className='Autreinfo'>Autre information</span>
    </div>
    <label>
      <div className='SpecialiteChamp'>
        <span>Spécialité<span className='etoileimpo'>*</span></span>
        <input   className='AutreInput' required='true' type='text' defaultValue={specialite}   />
      </div>
    </label>
    <label><div className='SujetTheseChamp'>
      <span>Sujet de thèse <span className='etoileimpo'>*</span></span>
      <input  className='AutreInput1' type='text' required='true' defaultValue={SujetThese}   />

    </div></label>

    <label>
      <div className='StructureRechercheChamp'>
        <span>Structure de recherche <span className='etoileimpo'>*</span></span>
        <input  type='text' className='AutreInput2' defaultValue={StructureRecherche} required='true'   />
      </div>
    </label>

        <label> Etablissement
            <input  defaultValue={etablissement}    />
        </label>
        <label>
            <select  name="niveau" onChange={(e)=>setNiveau(e.target.value)} defaultValue={Niveau}>
                <option value='1ere année'> 1ere année</option>
                <option value='2eme année'>2éme année </option>
                <option value='3eme année'>3éme année </option>
                <option value='4eme année'>4éme année </option>
                <option value='5eme année'>5éme année </option>
                <option value='6eme année'>6éme année </option>

            </select>
        </label>

      <label>
        <div className=''></div>
      </label>
      <div className='DirTheseInfo'>
        <span className='DirTheseInfoTitle'>Informations  de directeur  de la thèse :</span>
      </div>

      <label>
        <div className='DirTheseNomChamp'  style={{marginLeft:'14%'}} >
          <span>Nom Complet<span className='etoileimpo'>*</span></span>
          <input  style={{width:'74%'}}   className='DirTheseInput' required='true' defaultValue={FirstDirTheseName}    />
        </div>
      </label>
      <label>
        <div className='DirTheseGrade'>
          <span>Grade De directeur de thèse <span className='etoileimpo'>*</span></span>
          <select  id='GradeSelector' defaultValue={FirstDirTheseGrade}    required='true'>
          <option defaultValue={null} selected='true'></option>
          <option defaultValue={"Pr"}>Pr</option>
          <option defaultValue={"MC"}>MC</option>

          </select>
        </div>
      </label>
      <label>
        <div className='DirTheseLieuTravail'>
          <span>Lieu de travail<span className='etoileimpo'>*</span></span>
          <input  className='DirTheseInput1' style={{width:'62%'}}  type='text' required='true' defaultValue={FirstDirTheseLieuTravail}    />
        </div>
      </label>
      <label>
        <div className='DirTheseEmail'>
          <span > E-mail <span className='etoileimpo'>*</span></span>
          <input  className='DirTheseInput' style={{width:'80%'}} type='email' required='true' defaultValue={FirstDirTheseEmail}    />
        </div>
      </label>
      <label>
        <div className='DirThesePhoneNumberInput'  style={{marginLeft:'23%'}} >
          <span style={{marginLeft:'14px',marginTop:'4px'}} className='DirTheseNumTitle'>Num de Téléphone <span className='etoileimpo'>*</span></span>
          <PhoneInput
             country={"tn"}
             className='DirThesePhoneNumberInputSelector'
              enableSearch={true}
                 defaultValue={FirstDirThesePhone}
                  inputStyle={{textAlign:'left',background:"#e3e3e3"}}
                  searchStyle={{ background:"grey",width:'90%',height : '30px'}}
                  dropdownStyle={{width:'1500%'}}
                   />
        </div>
      </label>

        <label>
          <div className='TypeTheseInput' style={{marginLeft:'24%'}} >
          <span>Type de thèse <span className='etoileimpo'>*</span></span>
            <select     defaultValue={TypeThese} id='TypeTheseSelector' required={true}>
              <option   value=''>--</option>
              <option value='Cotutelle'>Co-tutelle</option>
              <option value='Codirection'>Codirection</option>
              <option value='Non Co-Tutelle'>Non Co-tutelle</option>
            </select>
          </div>

       
        </label>



      

        {(TypeThese === 'Cotutelle' || TypeThese ==='Codirection') && (
            <div>
            <div className='SecondDirTheseInfo'>
              <span className='SecondDirTheseInfoTitle'> Informations sur le 2eme directeur de thèse : </span>
            </div>
              <label>
              <div  className='SecondDirTheseNameChamp'>
                <span> Nom Complet <span className='etoileimpo'>*</span> </span>
                <input  type='text' className='SecondDirTheseNameInput' defaultValue={SecondDirTheseName} required={true}    />
                </div>
              </label>
              <label>
                <div className='SecondDirTheseGradeChamp'>
                  <span>Grade <span className='etoileimpo'>*</span></span>
                  <select  id='GradeSecondSelector' defaultValue={SecondDirTheseGrade}    required={true}>
                    <option  defaultValue={null} selected={true} > -- </option>
                    <option value='Pr'>Pr</option>
                    <option value='Mc'> MC </option>
                  </select>
                </div>
              </label>
              <label>
                <div className='SecondDirTheseLieuTravailChamp'>
                  <span>Lieu de travail <span className='etoileimpo'>*</span></span>
                  <input  className='SecondDirTheseInput-2' type='text' required={true} defaultValue={SecondDirTheseLieuTravail}     />
                </div>
              </label>
              <label>
              <div className='SecondDirTheseEmailChamp'>
                <span>E-mail <span className='etoileimpo'>*</span></span>
                <input  type='text' className='SecondDirTheseEmailInput' required defaultValue={SecondDirTheseEmail}   />
           </div></label> 

        
            <label>
              <div className='SecondDirTheseStructureRechercheChamp'>
            <span>Structure de recherche <span className='etoileimpo'>*</span></span>
            <input  className='SecondDirTheseStructureRechercheInput' type='text' required defaultValue={SecondDirTheseStructureRecherche}    />
              </div>
            </label>


          <label>
            <div className='SecondDirThesePhoneChamp'>
              <span>Num de Téléphone <span className='etoileimpo'>*</span></span>
              

              <PhoneInput
             country={"tn"}
             className='SecondDirThesePhoneNumberInputSelector'
              enableSearch={true}
                 defaultValue={SecondDirThesePhone}
                  inputStyle={{textAlign:'left'}}
                  searchStyle={{width:'90%',height : '30px'}}
                  dropdownStyle={{width:'1500%'}}
                   />
            </div>
          </label>

          {TypeThese ==='Cotutelle' && (
            <div>
            <label>
            <div className='ConventionChamp'>
            <span>Convention </span>
            <input  type='File'    defaultValue={convention}/>
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
  
  <div>
  <button onClick={()=>{setAddNewCoEncadrant(false)}} className='delete-option-button'> <MdDeleteForever color='red' size={28}/></button>
  <div className='Co-encadrant-holder'><span className='InfoSurCoEncadrant'>Informations sur le Co-Encadrant</span></div>
    <label>
    <div className='Co-encadrant-name-holder'>
      <span>Nom Complet <span className='etoileimpo'>*</span></span>
        <input  type='text' defaultValue={CoEncadrantName} required={true} className='SecondDirTheseNameInput' />
      </div>
    </label>
    <label>
      <div className='CoEncadrantGradeChamp'>
        <span>Grade de Co-Encadrant <span className='etoileimpo'>*</span></span>

        <select  id='GradeCoSelector' defaultValue={CoEncadrantGrade}  required={true}>
                    <option  defaultValue={null} selected={true} > -- </option>
                    <option value='Pr'>Pr</option>
                    <option value='Mc'> MC </option>
                    <option value='Ma'>MA</option>
                  </select>
      </div>
    </label>

      <label>
        <div className='LieuTravailCoEncadrantChamp'>
          <span>Lieu de travail <span className='etoileimpo'>*</span></span>
          <input  type='text' defaultValue={CoEncadrantLieuTravail} required={true}     />
        </div>
      </label>
      <label>
        <div className='CoEncadrantEmailContainer'><span>E-mail<span className='etoileimpo'>*</span></span>
        
          <input  className='CoEncadrantEmailInput' type='email' required defaultValue={CoEncadrantEmail}    />
        </div>
      </label>


      <label>
        <div className='CoEncadrantPhoneContainer'>
          <span>Num de Téléphone <span className='etoileimpo'>*</span></span>

          <PhoneInput
             country={"tn"}
             className='CoEncadrantPhoneInput'
              enableSearch={true}
              required
                 defaultValue={CoEncadrantPhone}
                  inputStyle={{textAlign:'left'}}
                  searchStyle={{width:'90%',height : '30px'}}
                  dropdownStyle={{width:'1500%'}}
                   />
        </div>
      </label>
  </div>
)}


  
{(AddNewDirThese === true && ((TypeThese!==null) && (TypeThese ==='Non Co-Tutelle'))) && ( 
        <div>
          <div className='OptionalDirThese' >
            <span className='OptionDirTheseTitle'> Informations Sur le 2eme directeur de thèse : </span>

      
            <div className='Button-container'>
              <button className='delete-option-button' onClick={()=>{setAddNewDirThese(false)}}> <MdDeleteForever color='red' size={28} />
</button>
            </div>

            <label>
              <div className='NameHolder2ndDirThese'>
                <span> Nom Complet <span className='etoileimpo'>*</span></span>
                <input  type='text' className='SecondDirTheseNameInput'/>
              </div>
            </label>
            <label>
              <div className='GradeDirTheseOptional'>
                <span> Grade de directeur de thèse <span className='etoileimpo'>*</span></span>

                <select  id='OptionalGradeSecondSelector' defaultValue={SecondDirTheseGrade}    required={true}>
                    <option  defaultValue={null} selected={true}  > -- </option>
                    <option value='Pr'>Pr</option>
                    <option value='Mc'> MC </option>
                  </select>
              </div>
            </label>
            <label>
              <div className='LieuTravailOptional'>
                <span>Lieu de travail <span className='etoileimpo'>*</span></span>
                <input  type='text'  required={true} defaultValue={SecondDirTheseLieuTravail}/>
                               </div>
            </label>
            <label>
              <div className='OptionalDirTheseEmail'>
               <span>E-mail <span className='etoileimpo'>*</span></span>
              <input  type='email' defaultValue={SecondDirTheseEmail} className='OptionalSecondDirTheseEmailInput' required={true}   />
               
               </div>
              
            </label>

            <label>
              <div className='SecondDirThesePhoneChamp'> 
                <span > Num de Téléphone <span className='etoileimpo'>*</span></span>
                
              <PhoneInput
             country={"tn"}
             className='SecondDirThesePhoneNumberInputSelector'
              enableSearch={true}
                 defaultValue={SecondDirThesePhone}
                  inputStyle={{textAlign:'left'}}
                  searchStyle={{width:'90%',height : '30px'}}
                  dropdownStyle={{width:'1500%'}}
                   />
              </div>
            </label>

          </div>
        </div>
      )}


      <div className='Button-CoEncadrant-container'>
        {(AddNewCoEncadrant === false) && (
          <div>
            <button style={{width:"20%",height:"40px"}} className='add-new-CoEncadrant-button' onClick={()=>{setAddNewCoEncadrant(true)}}><IoPersonAddOutline/> Co-Encadrant</button>
          </div>
        )}
      
        <div>
     {(AddNewDirThese===false && TypeThese ==='Non Co-Tutelle') && ( 
      <div >
        <button className='add-new-DirThese-button' onClick={()=>{setAddNewDirThese(true)}}><IoPersonAddOutline /> directeur de thèse
</button>
      </div>
     )}


     </div>

     </div>




      <button type="submit">Pré-inscrire</button>
          
    </form>
    </div>)}
    {(Nom === null||Nom ==='' ) && (<div>
        <br/><br/><br/>
        <center> <h1 style={{color:'red',fontFamily:'monospace'}}>Erreur : </h1>
        <br/><br/>
        <h5>Le CIN / PASSPORT que vous avez entré n'existe pas dans notre base de données </h5>
        </center>
        <br/><br/>
    </div>)}
    {((is_inscrit ===true || is_inscrit ===1) || (is_inscrit ==='1' || is_inscrit==='true')|| is_inscrit ==='True') &&(
      <div>
            <br/><br/><br/>
            <center>

                    <h3 style={{color:'red'}}>Erreur 400 : </h3>
                    <h5> <br/>
                    Vous êtes déja inscrit,<br/>
                    Si vous n'avez pas inscrit vous pouvez contacter l'administration pour corriger  cette erreur .</h5><br/>


          </center>
      </div>
    )}
    </div>
  )
}

export default InscrireOldStudent;

