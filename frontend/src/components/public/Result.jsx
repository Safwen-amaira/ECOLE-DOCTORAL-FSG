import React, { useState } from 'react'
import NHeader from './NHeader'
import Footer from './Footer'
import SuccessPreinscription from '../SuccessPreinscription'
import './Preinscription.css'
const Result = () => {
    const [CinToFetchWith,setCinToFetchWith]=useState('');
    const [FinalCinToFetchWith,setFinalCinToFetchWith] = useState('');
    const handleClickToFetch = () =>{
        setFinalCinToFetchWith(CinToFetchWith)
    }
  return (
    <div className='SuccessPreInscription'>
        <NHeader/>
    
            {FinalCinToFetchWith === '' &&(

                <div>
                <br/><br/>
        <br/>
        <center>
        <div style={{flexDirection:'column'}}>
        <h1> entrer votre Cin ou Passport pour  obtenir le resultat </h1><br></br><br/>
        Cin/Passport : <input placeholder='Cin/Passport' onChange={(e)=>setCinToFetchWith(e.target.value)} /> <br/><br/><br/>
        <button style={{margin:'0%'}} onClick={handleClickToFetch}>validation</button>
        
        
        
        </div>
        </center>
        <br/><br/><br/>
                </div>
            )}
      
        {FinalCinToFetchWith !=='' && (<div>     
            <br/>
              <SuccessPreinscription cin={FinalCinToFetchWith}/>
</div>)}
        <Footer/>
    </div>
  )
}

export default Result