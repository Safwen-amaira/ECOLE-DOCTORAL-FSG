import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './public/styles/SuccessPreinscription.css'
import { IoPrintSharp } from "react-icons/io5";
import { PiSealWarningFill } from "react-icons/pi";

const SuccessPreinscription = (props) => {
  const [data, setData] = useState({});
  const cin  = props.cin;
  const [exist,setExist]=useState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api-chercheur/api/get_inscription/${cin}/`);
        setData(response.data);
        setExist(true); // Move this line after setting the data
      } catch (error) {
        setExist(false);
      }
    };
  
    fetchData();
  }, [cin]);

  const handlePrint=()=>{
    window.print();
  }

  return (
    <div  className="SuccessPreInscription">
   
      {(exist === false) && (
        <div>
        <center>
        <br/><br/>
        <h1 className='ExistDeja'> <PiSealWarningFill className='icon-warning' size={40} style={{marginRight:"2%"}} color='red'/> aucun demande avac le Passport/Cin :  <span style={{color:'black'}}> {cin}</span> </h1>
           <br/><br/>  <button onClick={()=>navigate('/pre-inscrire')}  style={{width:'14%' , margin:"0%"}} >Pré-inscrire?</button>
             </center>

      </div>)}


      {(exist === true) && (
        <div>
        <div className = 'titleRequest-container'>
             <center>
        <br/><br/>
       <hr className='ENDPOINT'/>
        <h4><center>Demande de pré-inscription de {data.Nom} {data.Prenom}  </center></h4>
        <hr className='ENDPOINT'/>
        </center>
          <br/><br/>
          </div>
        <div className="ContainerInformationsRequest">
<center>
        <table>
          
          <tr>
          <td className="tdTitleHolder">Nom</td>
          <td>{data.Nom}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder"> Prenom </td>
            <td>{data.Prenom}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder">CIN / Passport</td>
            <td>{data.cin}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder"> Date de naissance </td>
            <td>{data.dateNaissance}</td>
          </tr>

          <tr>
            <td className="tdTitleHolder"> Lieu de naissance </td>
            <td>{data.lieuNaissance}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder">E-mail</td>
            <td> {data.email}</td>
          </tr>
          <tr>
          <td className="tdTitleHolder">Addresse Actuelle </td>
          <td>{data.Address}</td>
          </tr>

          <tr>
          <td className="tdTitleHolder">Type de thèse</td>
          <td>{data.TypeThese}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder">Structure de recherche </td>
            <td>{data.StructureRecherche}</td>
          </tr>
          <tr> 
            <td className="tdTitleHolder">Sujet de thèse</td>
            <td>{data.SujetThese}</td>        
          </tr>

          <tr>
            <td className="tdTitleHolder">Spécialité</td>
            <td>{data.specialite}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder">Nom de 1ere Directeur de thèse</td>
            <td>{data.FirstDirTheseName}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder">Grade de 1ere Directeur de thèse </td>
            <td>{data.FirstDirTheseGrade}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder">Lieu de travail de 1ere Directeur de thèse</td>
            <td>{data.FirstDirTheseLieuTravail}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder">E-mail de 1ere Directeur de thèse  </td>
            <td>{data.FirstDirTheseEmail}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder"> Téléphone de 1ere Directeur de thèse  </td>
            <td>{data.FirstDirThesePhone}</td>
          </tr>
          {(data.SecondDirTheseName !== null)&& (data.SecondDirTheseName !== 'null') &&(
            <>
          <tr>
            <td className="tdTitleHolder">Nom de 2eme Directeur de thèse </td>
            <td>{data.SecondDirTheseName}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder">Grade de 2eme Directeur de thèse </td>
            <td>{data.SecondDirTheseGrade}</td>
          </tr>
          <tr>
            <td className="tdTitleHolder">Lieu de travail de 2eme Directeur de thèse </td>
            <td>{data.SecondDirTheseLieuTravail}</td>
           </tr>
           <tr>
            <td className="tdTitleHolder"> E-mail de 2eme Directeur de thèse </td>
            <td> {data.SecondDirTheseEmail} </td>
           </tr>
           <tr>
            <td className="tdTitleHolder">Téléphone de 2eme Directeur de these </td>
            <td> {data.SecondDirThesePhone} </td>
           </tr>
          </>
          )}
          {(data.CoEncadrantName !== null) && (data.CoEncadrantName!=='null') &&(
            <>
              <tr>
                <td className="tdTitleHolder"> Nom de Co-encadrant  </td>
                <td>{data.CoEncadrantName}</td>
              </tr>
              <tr>
                <td className="tdTitleHolder">Grade de Co-encadrant </td>
                <td>{data.CoEncadrantGrade}</td>
              </tr>
              <tr>
                <td className="tdTitleHolder">Lieu de travail de Co-encadrant   </td>
                <td>{data.CoEncadrantLieuTravail}</td>
              </tr>
              <tr>
                  <td className="tdTitleHolder">E-mail de Co-encadrant </td>
                  <td>{data.CoEncadrantEmail}</td>
              </tr>
              <tr>
                <td className="tdTitleHolder">Téléphone de Co-encadrant  </td>
                <td>{data.CoEncadrantPhone}</td>
              </tr>
            </>
          )}
          <tr className="ResultHolder">
            <td>Résultat de demande </td>
            <td>{data.State}</td>
          </tr>
        </table>
</center>

     
     <center>
     <button className="buttonPrint" style={{width:'24%'}} onClick={handlePrint}>Imprimer <IoPrintSharp className="IoPrintSharp" /></button>
      
      </center>
      </div>
      </div>
      )}
    
         </div>
  );
};
export default SuccessPreinscription;