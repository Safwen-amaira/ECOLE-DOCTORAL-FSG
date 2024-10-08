import React from 'react'
import Header from './public/Header'
import '../components/public/styles/LienErrone.css'
import Footer from './public/Footer'
const LienErrone = () => {
  return (
    <div>
      <Header/>
      <div className='PageErroneOrNotFound'>
        <h1 className='TitleDErrreur'>
            Erreur 404 / Not Found :
        </h1>
        <p className='ErreurDiscription'> Le lien que vous-avez suivé peut être Erroné ou bien vous n'avez pas d'accés au contenu de la page .</p>
        <p className='ErreurDiscription'>Merci de verifié la structure de lien ou bien de contacter l'administration .</p>
        
      </div>
        <Footer/>
        </div>
  )
}

export default LienErrone
