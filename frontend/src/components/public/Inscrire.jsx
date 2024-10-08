import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InscrireOldStudent from './InscrireOldStudent';
import NewStudentPreInscrire from './NewStudentPreInscrire';
import NHeader from './NHeader';
import Footer from './Footer';
import "./Inscrire.css"
const Inscrire = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isNewOrOld, setIsNewOrOld] = useState('');
    const [cinToFectchwith, setCinTofetchWith] = useState('');
    const [cinIsSelected, setCinIsSelected] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/controlling/preinscription/preinscription/api/getter') 
            .then(response => {
                const data = response.data;
                setIsOpen(data.is_open);
            })
            .catch(error => {
            });
    }, []); 

    return (
        <div className='InscrirptionHolderForAllStudentComponent'>
            <NHeader />
            {(isOpen || isOpen === 'true' || isOpen === 1) && (
                <div>
                    <div className='IsNewOrOldSelector'> 
                    {isNewOrOld === ''&& (
                      <div>
                      <center>
                      <br/><br/><br/>
                        <h2> Merci de Choisir pour continuer : </h2>
                        <br/><br/>
                        <select onChange={(e) => setIsNewOrOld(e.target.value)}>
                            <option value="">Choisir ici </option>  
                            <option value='NewStudent'>Nouveaux</option>
                            <option value='OldStudent'>Ancient</option>
                        </select>
                        </center>
                        <br/><br/><br/><br/>
                      </div>
                      )}        
                    {isNewOrOld === 'NewStudent' && (   
                            <div className='IfNewStudent'>
                                <NewStudentPreInscrire /> 
                            </div>
                    )}
                        {((isNewOrOld === 'OldStudent') && (cinIsSelected ===false ))&&(
                            <div className='IfOldStudent'>
                                     <div className='CinEntryForOldStudentInscription'>
                                     <center>
                                     <br/>
                                     <h3>Entrez votre CIN / PASSPORT</h3>
                                     <br/>
                                    <input placeholder='CIN / PASSPORT ' className='InputCinToFetchWith' value={cinToFectchwith} onChange={(e) => setCinTofetchWith(e.target.value)} required />
                               <br/>
                                  <button className='confirmationButtonForCinInputforInscription' onClick={() => setCinIsSelected(true)}>Confirmer</button>
                                  </center>
                                </div>
                            
                            </div>
                        )}
                        {((isNewOrOld ==='OldStudent')&& (cinIsSelected ===true))&&(
                      
                                    <div>
                                        <InscrireOldStudent cin={cinToFectchwith} />
                                    </div>
                        )}
                    </div>    
                </div>
            )}
            {(!isOpen || isOpen === 'false' || isOpen === 0)&&(<p style={{margin:'100px',fontSize:'19px',marginLeft:'500px'}} className='etoileimpo'>L'inscription Fermer Pour Le Moment</p>)}
            <Footer/>
        </div>
    )
}

export default Inscrire;
