import { useNavigate, useParams } from 'react-router-dom'
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { postHistorique } from '../services/service';
import { LuSaveAll } from "react-icons/lu";
import { confirmAlert } from 'react-confirm-alert';
import Swal from 'sweetalert2';
import 'react-confirm-alert/src/react-confirm-alert.css';
const UpdateChercheurModel = (props) => {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate()
  const cin = props.cin
  useEffect(() => {
    const fetchChercheur = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api-chercheur/api/get_inscription/${cin}/`);
        const chercheurData = response.data;
        setFormData(chercheurData);
      } catch (error) {
      }
    };

    fetchChercheur();
  }, [cin]);
  const handleFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    Swal.fire({
      title: "Voulez-vous modifier une Chercheur ?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Confirmer",
      denyButtonText: "Annuler"
    }).then((result) => {

      if (result.isConfirmed) {

        try {
          const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== "")
          );
          axios.put(`http://127.0.0.1:8000/api-chercheur/update_chercher_informations/${cin}/`, filteredFormData).then(response => {
            Swal.fire("Modifié avec succès", "", "success");
            const formData2 = new FormData();
            formData2.append('admin_name', state.user.login);
            formData2.append('action', 'a modifié chercheur');
            postHistorique(formData2)
          })
            .catch(error => {
            });;
        } catch (error) {
        }
      };

    })
  }
  return (
    <div className='container'>
      <Modal {...props} size="lg"
        aria-labelledby="contained-modal-title-vcenter"

        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier Chercheur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='component'>

            <div>

            </div>
            <div className='contentEditing'>
              {Object.keys(formData).length > 0 && (
                <div>
                  <h3> Details Chercheur</h3>
                  <form>
                    {Object.keys(formData).map((key) => (
                      <div key={key}>
                        <label>
                          <table style={{ marginLeft: "5%" }} className='InfoHolder'>
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
                    <center>
                      <button style={{margin:'40px'}} type="button" className='savebutton' onClick={(e) => handleUpdate(e)}
                      ><LuSaveAll className='iconsave' /> Enregistrer</button>

                    </center>   </form>
                  
                </div>
              )}

            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


export default UpdateChercheurModel
