import React from 'react'
import Sidebar from "../Sidebar"
import './Dashboard.css'
import PieDemandes from './charts/PieDemandes'
import PiePreInscriptions from './charts/PiePreInscriptions'
import Navigation from '../../Navigation'
const Dashboard = () => {
  return (
    <div className='component'>
   
                     <div className='Page-content'>
<div className='chart-container'>

                       <PieDemandes/>
                    <PiePreInscriptions/>
                    </div>
                    </div>
    </div>
  )
}

export default Dashboard
