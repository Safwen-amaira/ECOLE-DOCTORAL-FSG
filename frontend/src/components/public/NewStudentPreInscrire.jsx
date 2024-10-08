import React, { useState } from 'react'
import './Preinscription.css'
import { GiPositionMarker } from "react-icons/gi";
import { MdAlternateEmail } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import "react-phone-input-2/lib/bootstrap.css";
import { IoPersonAddOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { FaMapLocationDot } from "react-icons/fa6";
import Swal from 'sweetalert2';

const NewStudentPreInscrire = () => {
  const [Nom, setNom] = useState('');
  const [Prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('')
  const [cin, setCin] = useState('');
  const [tel, setTel] = useState('');
  const [SujetThese, SetSujetThese] = useState('');
  const [Address, setAddress] = useState('');
  const [dateNaissance, SetDateNaissances] = useState('');
  const [lieuNaissance, setLieuNaissance] = useState('');
  const [StructureRecherche, setStructureRecherche] = useState('');
  const [specialite, setSpecialite] = useState("");
  const [FirstDirTheseName, setFirstDirTheseName] = useState('');
  const [FirstDirTheseGrade, setFirstDirTheseGrade] = useState('');
  const [FirstDirTheseLieuTravail, setFirstDirTheseLieuTravail] = useState('');
  const [FirstDirTheseEmail, setFirstDirTheseEmail] = useState('');
  const [FirstDirThesePhone, setFirstDirThesePhone] = useState('');
  const [TypeThese, setTypeThese] = useState('');
  const [SecondDirTheseName, setSecondDirTheseName] = useState('')
  const [SecondDirTheseGrade, setSecondDirTheseGrade] = useState('');
  const [SecondDirTheseLieuTravail, setSecondDirTheseLieuTravail] = useState('');
  const [SecondDirTheseEmail, setSecondDirTheseEmail] = useState('none@none.com');
  const [SecondDirTheseStructureRecherche, setSecondDirTheseStructureRecherche] = useState('');
  const [SecondDirThesePhone, setSecondDirThesePhone] = useState('');
  const [convention, setConvention] = useState('');
  const [AddNewCoEncadrant, setAddNewCoEncadrant] = useState(false);
  const [CoEncadrantName, setCoEncadrantName] = useState('');
  const [CoEncadrantGrade, setCoEncadrantGrade] = useState('');
  const [CoEncadrantLieuTravail, setCoEncadrantLieuTravail] = useState('');
  const [CoEncadrantEmail, setCoEncadrantEmail] = useState('none@none.com');
  const [CoEncadrantPhone, setCoEncadrantPhone] = useState('');
  const is_inscrit = false;
  const Niveau = '1ere année';
  const [Etablissement, setEtablissement] = useState('none');
  const navigate = useNavigate();

  const preinscrire = async (e) => {
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
    formData.append('Niveau', Niveau);
    formData.append('is_inscrit', is_inscrit);
    formData.append('Etablissement', Etablissement)

    Swal.fire({
      title: "Voulez-vous ajouter une Demande d'inscription ?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Confirmer",
      denyButtonText: "Annuler"
    }).then((result) => {

      if (result.isConfirmed) {



        axios.post('http://127.0.0.1:8000/api-chercheur/create_inscription/', formData)
          .then(response => {
            Swal.fire("Demande d'inscription passer avec success", "", "success")


          })
          .catch(error => {
            // Handle error
            if (error.response.status === 333) {
              Swal.fire("Demande avec Cette n°Cin ou Passport existe deja", "", "error")

            }
          });
      }
    })






  }
  return (
    <div className='NewStudentToInscrireStyling'>
      <div className='Introduction'>
        <span className='Bienvenu'> Bienvenu dans le site officiel de l'ecole doctorale EDSEN .</span> <br />
        <span className='information'> Pour pré-inscrire à l'ecole doctorale , merci de remplir les champs au-dessus . </span><br />
        <span className='Remarque'><span className='RemarqueTitle'>Remarque :</span><span> Tous les champs ayant le symbole<span className='etoileimpo'> * </span> sont obligatoires .</span></span><br />
      </div>


      <form onSubmit={preinscrire}>
        <div className='Information-Personelle'>
          <span className='information-personelle-title'>    Informations personelles </span>


        </div>
        <label>
          <div className='prenomChamp'>
            <span className='prenominput'>Prenom <span className='etoileimpo'> * </span> </span>
            <input type='text' value={Prenom} onChange={(e) => setPrenom(e.target.value)} required='true' />
            <span className='prenomChamp'>الإسم <span className='etoileimpo'> * </span> </span>  </div>  </label>

        <label>  <div className='nomChamp'>
          <span className='nominput'>Nom <span className='etoileimpo'> * </span></span>
          <input type="text" value={Nom} onChange={(e) => setNom(e.target.value)} required='true' />
          <span className='nominput'>اللقب <span className='etoileimpo'>*</span></span></div>
        </label>


        <label>
          <div className='dateChamp'>
            <span className='DateNaissance-A1' style={{ marginLeft: '49px', marginRight: '-45px' }}> Date de naissance <span className='etoileimpo'>*</span></span>
            <div className='datePicker-1'>
              <input
                type='date'
                style={{ marginTop: "35px", marginLeft: "10px", width: "90%" }}
                onChange={(e) => SetDateNaissances(e.target.value)}
                required
              />            </div>
            <span className='DateNaissance-A2'>تاريخ الولادة<span className='etoileimpo'>*</span></span>
          </div>
        </label>
        <label><div className='LieuNaissanceChamp' style={{ marginLeft: '53.7%' }} >
          <span className='LieuNaissanceChampTitle'>Lieu de naissance <span className='etoileimpo'>*</span></span>
          <input type='text' value={lieuNaissance} onChange={(e) => setLieuNaissance(e.target.value)} required='true' />
          <span className='LieuNaissanceChampTitle2'>مكان الولادة <span className='etoileimpo'>*</span> <FaMapLocationDot className='birthplaceicon' style={{ position: 'absolute', marginLeft: '-7.4%', marginTop: "5.5px" }} />
          </span>
        </div></label>

        <label>
          <div className='CinChamp'>

            <span className='CinInputChampPreInscription'> Cin / Passport <span className='etoileimpo'>*</span> <BsCreditCard2Front style={{ marginLeft: "165px", marginTop: "6px" }} className='CardIcon' />
            </span>
            <input type='text' required='true' value={cin} onChange={(e) => setCin(e.target.value)} />
            <span className='CinInputChampPreInscription2'>رقم ب.ت.و / جواز سفر<span className='etoileimpo'>*</span></span>
          </div>
        </label>
        <label>
          <div className='TelephoneChamp' style={{ marginLeft: '54.5%' }}>
            <span className='numtelchampinputnametitle'>Num Téléphone <span className='etoileimpo'>*</span><MdOutlinePhoneIphone style={{ cursor: 'text', marginLeft: '11%', marginTop: "7px" }} className='PhoneIcon' /></span>
            <input type='text' value={tel} onChange={(e) => setTel(e.target.value)} required='true' />
            <span className='numtelchampinputnametitle2'>رقم الهاتف <span className='etoileimpo'>*</span></span>

          </div>
        </label>
        <label>
          <div className='AddressChamp'>
            <span className='AddressActuelleChampInputterStyle'>Adresse actuelle  <GiPositionMarker className='iconAdress' style={{ marginLeft: '11.6%', cursor: 'text' }} /> <span className='etoileimpo'>*</span></span>
            <input type='text' required='true' value={Address} onChange={(e) => setAddress(e.target.value)} />
            <span className='AddressActuelleChampInputterStyle2'>العنوان <span className='etoileimpo'>*</span></span>
          </div>
        </label>

        <label> <div className='EmailChamp' style={{ marginLeft: '55.1%' }}>
          <span className='EmailinputChampStyling'>Address e-mail<span className='etoileimpo'>*</span> <MdAlternateEmail className='emailIcon' style={{ marginLeft: "11%" }} /></span>
          <input type='email' value={email} required='true' onChange={(e) => setEmail(e.target.value)} />
          <span className='EmailinputChampStyling'>البريد الإلكتروني<span className='etoileimpo'>*</span></span>
        </div></label>

        <div className='AutreInformation'>
          <span className='Autreinfo'>Autre information</span>
        </div>
        <label>
          <div className='SpecialiteChamp'>
            <span className='SpecialiteChampinputStyling'>Spécialité<span className='etoileimpo'>*</span></span>
            <input className='AutreInput' required='true' type='text' value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
          </div>
        </label>
        <label><div className='SujetTheseChamp'>
          <span className='SujetTheseChampInputStyling'>Sujet de thèse <span className='etoileimpo'>*</span></span>
          <input className='AutreInput1' type='text' required='true' value={SujetThese} onChange={(e) => SetSujetThese(e.target.value)} />

        </div></label>

        <label>
          <div className='StructureRechercheChamp'>
            <span className='StructureRechercheChampinputer'>Structure de recherche <span className='etoileimpo'>*</span></span>
            <input type='text' className='AutreInput2' value={StructureRecherche} required='true' onChange={(e) => setStructureRecherche(e.target.value)} />
          </div>
        </label>
        <label>
          <center>
            <div style={{ flexDirection: 'row' }}>
              <br />
              <br></br>
              <span className='StructureRechercheChampinputer'>Etablissement <span className='etoileimpo'>*</span></span>

              <select required onChange={(e) => setEtablissement(e.target.value)}>
                <option value=''>choisir Etablissement</option>
                <option value="FSG">FSG</option>
                <option value="ISSTEG">ISSTEG</option>
                <option value="IRA">IRA</option>
                <option value="ISBAM">ISBAM</option>
              </select>

            </div>
          </center>
        </label>


        <label>
          <div className=''></div>
        </label>
        <div className='DirTheseInfo'>
          <span className='DirTheseInfoTitle'>Informations sur le directeur  de la thèse :</span>
        </div>

        <label>
          <div className='DirTheseNomChamp'>
            <span className='DirTheseNomChampInputer'>Nom Complet<span className='etoileimpo'>*</span></span>
            <input className='DirTheseInput' required='true' value={FirstDirTheseName} onChange={(e) => setFirstDirTheseName(e.target.value)} />
          </div>
        </label>
        <label>
          <div className='DirTheseGrade'>
            <span className='DirTheseGradeInputer'>Grade De directeur de thèse <span className='etoileimpo'>*</span></span>
            <select id='GradeSelector' onChange={(e) => setFirstDirTheseGrade(e.target.value)} required='true'>
              <option value={null} selected='true'></option>
              <option value={"Pr"}>Pr</option>
              <option value={"MC"}>MC</option>

            </select>
          </div>
        </label>
        <label>
          <div className='DirTheseLieuTravail'>
            <span className='DirTheseLieuTravailInputertitle'>Lieu de travail<span className='etoileimpo'>*</span></span>
            <input className='DirTheseInput1' type='text' required='true' value={FirstDirTheseLieuTravail} onChange={(e) => setFirstDirTheseLieuTravail(e.target.value)} />
          </div>
        </label>
        <label>
          <div className='DirTheseEmail'>
            <span className='DirTheseEmailinputerTitle' > E-mail <span className='etoileimpo'>*</span></span>
            <input className='DirTheseInput' type='email' required='true' value={FirstDirTheseEmail} onChange={(e) => setFirstDirTheseEmail(e.target.value)} />
          </div>
        </label>
        <label>
          <div className='DirThesePhoneNumberInput'>
            <span className='DirTheseNumTitle'>Num de Téléphone <span className='etoileimpo'>*</span></span>
            <input style={{ marginLeft: '250px' }} type="tel" className='DirTheseNumTitle' onChange={(e) => setFirstDirThesePhone(e.target.value)} />
          </div>
        </label>
        <br />
        <label>
          <div className='TypeTheseInput'>
            <span className='TypeTheseInputTitling'>Type de thèse <span className='etoileimpo'>*</span></span>
            <select onChange={(e) => setTypeThese(e.target.value)} id='TypeTheseSelector' required={true}>
              <option value=''>--</option>
              <option value='Cotutelle'>Co-tutelle</option>
              <option value='Codirection'>Codirection</option>
              <option value='Non Co-Tutelle'>Non Co-tutelle</option>
            </select>
          </div>


        </label>





        {(TypeThese === 'Cotutelle' || TypeThese === 'Codirection') && (
          <div>
            <div className='SecondDirTheseInfo'>
              <span className='SecondDirTheseInfoTitle'> Informations sur le 2eme directeur de thèse : </span>
            </div>
            <label>
              <div className='SecondDirTheseNameChamp'>
                <span className='SecondDirTheseNameInputer'> Nom Complet <span className='etoileimpo'>*</span> </span>
                <input type='text' className='SecondDirTheseNameInput' value={SecondDirTheseName} required={true} onChange={(e) => setSecondDirTheseName(e.target.value)} />
              </div>
            </label>
            <label>
              <div className='SecondDirTheseGradeChamp'>
                <span className='SecondDirTheseGradeChampinputer'>Grade <span className='etoileimpo'>*</span></span>
                <select id='GradeSecondSelector' value={SecondDirTheseGrade} onChange={(e) => setSecondDirTheseGrade(e.target.value)} required={true}>
                  <option value={null} selected={true} disabled={true}> -- </option>
                  <option value='Pr'>Pr</option>
                  <option value='Mc'> MC </option>
                </select>
              </div>
            </label>
            <label>
              <div className='SecondDirTheseLieuTravailChamp'>
                <span className='SecondDirTheseLieuTravailChampinputer'>Lieu de travail <span className='etoileimpo'>*</span></span>
                <input className='SecondDirTheseInput-2' type='text' required={true} value={SecondDirTheseLieuTravail} onChange={(e) => setSecondDirTheseLieuTravail(e.target.value)} />
              </div>
            </label>
            <label>
              <div className='SecondDirTheseEmailChamp'>
                <span className='SecondDirTheseEmailChampinputer'>E-mail <span className='etoileimpo'>*</span></span>
                <input type='text' className='SecondDirTheseEmailInput' required onChange={(e) => setSecondDirTheseEmail(e.target.value)} />
              </div></label>


            <label>
              <div className='SecondDirTheseStructureRechercheChamp'>
                <span className='SecondDirTheseStructureRechercheChampinputer'>Structure de recherche <span className='etoileimpo'>*</span></span>
                <input className='SecondDirTheseStructureRechercheInput' type='text' required value={SecondDirTheseStructureRecherche} onChange={(e) => setSecondDirTheseStructureRecherche(e.target.value)} />
              </div>
            </label>


            <label>
              <div className='SecondDirThesePhoneChamp'>
                <span className='SecondDirThesePhoneChampinputer'>Num de Téléphone <span className='etoileimpo'>*</span></span>

                <input type='tel' onChange={(e) => setSecondDirThesePhone(e.target.value)} required />
              </div>
            </label>

            {TypeThese === 'Cotutelle' && (
              <div>
                <label>
                  <div className='ConventionChamp'>
                    <span>Convention </span>
                    <input type='File' onChange={(e) => setConvention(e.target.files[0])} />
                  </div>
                </label>
              </div>
            )}
          </div>
        )}
        {TypeThese === null && (
          <div></div>
        )}
        {TypeThese === 'Non Co-Tutelle' && (
          <div></div>
        )}






        {AddNewCoEncadrant === true && (

          <div>
            <button onClick={() => { setAddNewCoEncadrant(false) }} className='delete-option-button'> <MdDeleteForever color='red' size={28} /></button>
            <div className='Co-encadrant-holder'><span className='InfoSurCoEncadrant'>Informations sur le Co-Encadrant</span></div>
            <label>
              <div className='Co-encadrant-name-holder'>
                <span className='Co-encadrant-name-holderinputer'>Nom Complet <span className='etoileimpo'>*</span></span>
                <input type='text' value={CoEncadrantName} onChange={(e) => setCoEncadrantName(e.target.value)} required={true} className='SecondDirTheseNameInput' />
              </div>
            </label>
            <label>
              <div className='CoEncadrantGradeChamp'>
                <span className='CoEncadrantGradeChampinputer'>Grade de Co-Encadrant <span className='etoileimpo'>*</span></span>

                <select id='GradeCoSelector' value={CoEncadrantGrade} onChange={(e) => setCoEncadrantGrade(e.target.value)} required={true}>
                  <option value={null} selected={true} disabled={true}> -- </option>
                  <option value='Pr'>Pr</option>
                  <option value='Mc'> MC </option>
                  <option value='Ma'>MA</option>
                </select>
              </div>
            </label>

            <label>
              <div className='LieuTravailCoEncadrantChamp'>
                <span className='LieuTravailCoEncadrantChampinputer'>Lieu de travail <span className='etoileimpo'>*</span></span>
                <input type='text' value={CoEncadrantLieuTravail} required={true} onChange={(e) => setCoEncadrantLieuTravail(e.target.value)} />
              </div>
            </label>
            <label>
              <div className='CoEncadrantEmailContainer'><span className='CoEncadrantEmailContainerinputer'>E-mail<span className='etoileimpo'>*</span></span>

                <input className='CoEncadrantEmailInput' type='email' required onChange={(e) => setCoEncadrantEmail(e.target.value)} />
              </div>
            </label>


            <label>
              <div className='CoEncadrantPhoneContainer'>
                <span className='CoEncadrantPhoneContainerinputer'>Num de Téléphone <span className='etoileimpo'>*</span></span>
                <input type='tel' onChange={(e) => setCoEncadrantPhone(e.target.value)} required />
              </div>
            </label>
          </div>
        )}





        <div className='Button-CoEncadrant-container'>
          {(AddNewCoEncadrant === false) && (
            <div>
              <button className='add-new-CoEncadrant-button' onClick={() => { setAddNewCoEncadrant(true) }}><IoPersonAddOutline /> Co-Encadrant</button>
            </div>
          )}

          <div>



          </div>

        </div>




        <button type="submit" className='buttonvalidateInscription'>Pré-inscrire</button>

      </form>

    </div>
  )
}

export default NewStudentPreInscrire

