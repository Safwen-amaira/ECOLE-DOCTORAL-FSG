import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Signup from './components/Signup';
import  DoctorantDashboard from './components/DoctorantDashboard';
import  AdminfDashboard from './components/AdminfDashboard';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
import ListActualite from "./components/ListActualite";
import ListArticle from "./components/ListArticle";
import ListeThese from "./components/ListeThese";
import ListDocument from "./components/ListDocument";
import LaboListe from "./components/LaboListe";



import Login from './components/Login';
import GererActualites from './components/GererActualites'
import GererArticles from './components/GererArticles' 
import GererTheses from "./components/GererTheses";
import GererLabos from "./components/GererLabos";
import GererDocument from "./components/GererDocument";
import GererUser from "./components/GererUser";

import ResetPassWord from "./components/ResetPassWord";
import AddFormation from "./components/AddFormation";
import GererFormation from "./components/GererFormation";


//safwannn
import './App.css'
import Dashboard from './components/sidebar/dashboardContent/Dashboard';
import DemandesGeneralesAdmin from './components/sidebar/dashboardContent/DemandesGeneralesAdmin';
import DemandesGeneralesAdminDetails from './components/sidebar/dashboardContent/DemandesGeneralesAdminDetails';
import DemandePreInscriptionAdmin from './components/sidebar/dashboardContent/DemandePreInscriptionAdmin';
import DemandePreInscriptionAdminDetails from './components/sidebar/dashboardContent/DemandePreInscriptionAdminDetails';
import ListeEtudiantAdmin from './components/sidebar/dashboardContent/ListeEtudiantAdmin';
import ChercheurDetailsAndConfigAdmin from './components/sidebar/dashboardContent/ChercheurDetailsAndConfigAdmin';
import UpdateChercheur from './components/sidebar/dashboardContent/ChercheurModificationPage'
import Home from './components/public/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessPreinscription from './components/SuccessPreinscription';
import SettingsAdminControleAll from './components/sidebar/dashboardContent/SettingsAdminControleAll';
import GererDirecteur from "./components/GererDirecteur";
import AddThese from "./components/AddThese";
import AdmintDashboard from "./components/AdmintDashboard";
import AdminsDashboard from "./components/AdminsDashboard";
import DemandeChercheur from "./components/DemandeChercheur";
import Inscrire from "./components/public/Inscrire";
import Header from "./components/public/Header";
import LienErrone from "./components/LienErrone";
import AddArticle from "./components/AddArticle";
import GererEtablissement from "./components/GererEtablissement";
import Recherche from "./components/Recherche";
import ListLabo from "./components/centreDeRecherche/ListLabo";
import ListUnite from "./components/centreDeRecherche/ListUnite";
import ListUniteRattache from "./components/centreDeRecherche/ListUniteRattache";
import ListLaboRattache from "./components/centreDeRecherche/ListLaboRattache";
import ListUscr from "./components/centreDeRecherche/ListUscr";

import Result from "./components/public/Result";

import DemandePreInscrireFiltrer from "./components/DemandePreInscrireFiltrer";
import HeaderImageManager from "./components/HeaderImageManager";
import Presentation from "./components/Presentation";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";

//safwan

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      {/**<Navigation/>*/}

        <Routes>
        <Route path="/Recherche" element={<Recherche/>}/>
          {/** safwan */}
          <Route path='/inscription' element={<Inscrire/>} /> 
          <Route path='/demandes-chercheur' element={<DemandeChercheur/> }  />
          
          <Route path='/open' element={<SettingsAdminControleAll/> }  />

          {/** Route de Dashboard - admin  */}  
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/dashboard-demandes-generales' element={<DemandesGeneralesAdmin/>}/>
          <Route path='/get-more-info-about-demande/:id' element = {<DemandesGeneralesAdminDetails/>}/>
          <Route path='/dashboard-demandes-pre-inscription' element={<DemandePreInscriptionAdmin/>}/>
          <Route path='/get-more-info-about-pre-inscription-demande/:cin' element={<DemandePreInscriptionAdminDetails/>}/>
          <Route path='/dashboard-liste-d-etudiants-admin/' element={<ListeEtudiantAdmin/>}/>
          <Route path='/chercher-config-and-details-admin/:cin' element= {<ChercheurDetailsAndConfigAdmin/>}/>
          <Route path='/chercheur-modifing-page/:cin' element = {<UpdateChercheur/>}/>
          <Route path="/resultats-demandes-d-inscriptions" element={<Result/>}/>
        
        {/** Route de WebSite visiteur */}
        <Route path='/' element={<Home/>}/> 
        {/** safwan */}
          <Route path="/GetMyRecuFromProfile" element={<SuccessPreinscription/>}/>
          <Route  path="/login" element={<Login/>}/>
          <Route path="/user/reset-password" element={<ResetPassWord />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/change-password" element={<ChangePassword />} />


          <Route path='/labo-list' element={<ListLabo/>} /> 
          <Route path='/unite-list' element={<ListUnite/>} /> 
          <Route path='/unite-rattache-list' element={<ListUniteRattache/>} /> 
          <Route path='/labo-rattache-list' element={<ListLaboRattache/>} /> 
          <Route path='/uscr-list' element={<ListUscr/>} /> 
          <Route  path="/centre-recherche" element={<LaboListe/>}/>


          <Route path='/profile' element={<Profile/>} /> 


          <Route  path="/gerer-labo" element={<GererLabos/>}/>
          <Route  path="/gerer-actualite" element={<GererActualites/>}/>
          <Route  path="/gerer-article" element={<GererArticles/>}/>
          <Route  path="/gerer-these" element={<GererTheses/>}/>
          <Route  path="/gerer-document" element={<GererDocument/>}/>
          <Route  path="/gerer-user" element={<GererUser/>}/>
          <Route  path="/gerer-formation" element={<GererFormation/>}/>
          <Route  path="/gerer-directeur" element={<GererDirecteur/>}/>
          <Route  path="/gerer-etablissement" element={<GererEtablissement/>}/>


          <Route  path="/add-formation" element={<AddFormation/>}/>
          <Route  path="/add-these" element={<AddThese/>}/>
          <Route  path="/add-article" element={<AddArticle/>}/>






          <Route path="/headerimgsControle" element={<HeaderImageManager/>} />

          <Route  path="/demande-inscrire-filtrer" element={<DemandePreInscrireFiltrer/>}/>


          <Route  path="/list-actualite" element={<ListActualite/>}/>
          <Route  path="/list-article" element={<ListArticle/>}/>
          <Route  path="/list-these" element={<ListeThese/>}/>
          <Route  path="/list-document" element={<ListDocument/>}/>


          <Route path="/doctorant/dashboard" element={<DoctorantDashboard/>} />          
          <Route path="/adminf/dashboard"  element={<AdminfDashboard/>} />
          <Route path="/admins/dashboard"  element={<AdminsDashboard/>} />
          <Route path="/admint/dashboard"  element={<AdmintDashboard/>} />

          <Route path="*" element={<LienErrone/>}/>
        </Routes> 
      </div>
      </BrowserRouter>
  );
}

export default App;