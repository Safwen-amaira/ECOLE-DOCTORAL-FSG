import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { LuSaveAll } from "react-icons/lu";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Navigation from '../../Navigation';

const UpdateChercheur =() => {
  const { cin } = useParams();
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchChercheur = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api-chercheur/api/get_inscription/${cin}/`);
        const chercheurData = response.data;
        setFormData(chercheurData);
      } catch (error) {
        console.error('Error:', error.message);
        setErrorMessage('Chercheur not found.');
      }
    };

    fetchChercheur();
  }, [cin]);

  const handleFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const ShowConfirmation = () =>{
    confirmAlert({
        title: "Confirmation ",
        message: 'est-ce-que vous êtes sure de modifier les information de ce chercheur??',
        buttons: [
          {
            label: 'Oui',
            onClick: handleUpdate 
          },
          {
            label: 'Non',
            onClick: () => {} 
          }
        ]
      })}
      const handleUpdate = async () => {
        try {
          await axios.put(`http://127.0.0.1:8000/api-chercheur/update_chercher_informations/${cin}/`, formData);
          setSuccessMessage('Chercheur updated successfully!');
          setErrorMessage('');
        } catch (error) {
          console.error('Error:', error.message);
          setErrorMessage('Failed to update Chercheur.');
        }
      };

  return (
    <div className='component'>
           
            <div>

            </div>     
    <div className='contentEditing'>
      {Object.keys(formData).length > 0 && (
        <div>
          <h3>Update Details</h3>
          <form>
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label>
                <table className='InfoHolder'>
            <th>      {key}:</th>
   
            <td>    <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleFieldChange}
                    className='EditingField'
                  />
                  </td>
                  </table>
                </label>
              </div>
            ))}
            <br/><br/>
<center>
            <button type="button"  className='savebutton' onClick={ShowConfirmation}><LuSaveAll  className='iconsave'/> Enregistrer</button>
       
            </center>   </form>
          <br/><br/><br/>
          <br/><br/><br/>
        </div>
      )}
      
    </div>
    {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default UpdateChercheur;
