import axios from "axios"
import Swal from 'sweetalert2'

import {
    DOCTORANT_USER_LOADED,
    DOCTORANT_USER_FAILED,
    ADMINF_USER_LOADED,
    ADMINF_USER_FAILED,

    ADMINS_USER_LOADED,
    ADMINS_USER_FAILED,

    ADMINT_USER_LOADED,
    ADMINT_USER_FAILED,

    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,

    REGISTER_A1USER_SUCCESS,
    REGISTER_A1USER_FAILED,

    REGISTER_A2USER_SUCCESS,
    REGISTER_A2USER_FAILED,

    REGISTER_A3USER_SUCCESS,
    REGISTER_A3USER_FAILED,

    REGISTER_DUSER_SUCCESS,
    REGISTER_DUSER_FAILED
} from "../action/types.jsx"

export const  create_doctorantuser=({etablissement,username,login, email, password,password2})=>(dispatch)=>{
    const config={
        headers:{
            'Content-type':'application/json'
    }
    }
    const body=JSON.stringify({etablissement,username,login , email, password, password2})
    axios.post('http://127.0.0.1:8000/auth/signup/doctorant/',body,config).then(res =>{
        Swal.fire("Enregistré!", "", "success");
    }).catch(err =>{
        Swal.fire("utilisateur avec ces données déja existe", "", "error");

        

    })
}
export const  create_adminfuser=({etablissement,username,login, email, password,password2})=>(dispatch)=>{
    const config={
        headers:{
            'Content-type':'application/json'
    }
    }
    const body=JSON.stringify({etablissement,username,login , email, password, password2})
    axios.post('http://127.0.0.1:8000/auth/signup/adminf/',body,config).then(res =>{
        Swal.fire("Enregistré!", "", "success");

    }).catch(err =>{
        Swal.fire("utilisateur avec ces données déja existe", "", "error");


    })
}
export const  create_adminsuser=({etablissement,username,login, email, password,password2})=>(dispatch)=>{
    const config={
        headers:{
            'Content-type':'application/json'
    }
    }
    const body=JSON.stringify({etablissement,username,login, email, password, password2})
    axios.post('http://127.0.0.1:8000/auth/signup/admins/',body,config).then(res =>{
        Swal.fire("Enregistré!", "", "success");    
   
        
    }).catch(err =>{
        Swal.fire(""+err.response.data.non_field_errors, "", "error");


    })
}
export const  create_admintuser=({etablissement,username,login, email, password,password2})=>(dispatch)=>{
    const config={
        headers:{
            'Content-type':'application/json'
    }
    }
    const body=JSON.stringify({etablissement,username,login , email, password, password2})
    axios.post('http://127.0.0.1:8000/auth/signup/admint/',body,config).then(res =>{
      
        Swal.fire("Enregistré!", "", "success");
    }).catch(err =>{
       
        Swal.fire(""+err.response.data.non_field_errors, "", "error");

    })
}
export const loginuser=({username , password})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({username, password})

    axios.post('http://127.0.0.1:8000/auth/login/', body, config).then(res =>{
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
    }).catch(err=>{
        dispatch({
            type:LOGIN_FAILED
        })
        Swal.fire("Impossible de se connecter avec les informations d'identification fournies.","", "error");
        
    })
     

}
export const logout=()=>(dispatch, getState)=>{
    const token=getState().auth.token
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    if(token){
        config.headers['Authorization']= `Token ${token}`
    }
    axios.post('http://127.0.0.1:8000/auth/logout/', null, config)
    .then(res =>{
        dispatch({
            type:LOGOUT_SUCCESS
        })
        Swal.fire({
            
            icon: "success",
            title: "Déconnexion réussie avec succès.",
            showConfirmButton: false,
            timer: 1500
          });
        
    }).catch(err =>{
        
    })
}
export const refreshAdminf=()=>(dispatch)=>{
    const token=localStorage.getItem('token');
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    if(token ){
        config.headers['Authorization']=`Token ${token}`  
    }
    axios.get('http://127.0.0.1:8000/auth/adminf/dashboard/', config)
    .then(res =>{
        dispatch({
            type:ADMINF_USER_LOADED,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({
            
        })
    })
}
export const refreshAdmins=()=>(dispatch)=>{
    const token=localStorage.getItem('token');
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    if(token ){
        config.headers['Authorization']=`Token ${token}`  
    }
    axios.get('http://127.0.0.1:8000/auth/admins/dashboard/', config)
    .then(res =>{
        dispatch({
            type:ADMINS_USER_LOADED,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({
            
            
        })
    })
}
export const refreshAdmint=()=>(dispatch)=>{
    const token=localStorage.getItem('token');
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    if(token ){
        config.headers['Authorization']=`Token ${token}`  
    }
    axios.get('http://127.0.0.1:8000/auth/admint/dashboard/', config)
    .then(res =>{
        dispatch({
            type:ADMINT_USER_LOADED,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({
            
        })
    })
}
export const refreshDoctorant=()=>(dispatch)=>{
    const token=localStorage.getItem('token');
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    if(token ){
        config.headers['Authorization']=`Token ${token}`  
    }
    axios.get('http://127.0.0.1:8000/auth/doctorant/dashboard/', config)
    .then(res =>{
        dispatch({
            type:DOCTORANT_USER_LOADED,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({
            
        })
    })
}
export const getDoctorantUser=()=>(dispatch, getState)=>{
    const token=getState().auth.token
    const is_doctorant=getState().auth.isDoctorant
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    if(token && is_doctorant){
        config.headers['Authorization']=`Token ${token}`  
    }
    axios.get('http://127.0.0.1:8000/auth/doctorant/dashboard/', config)
    .then(res =>{
        dispatch({
            type:DOCTORANT_USER_LOADED,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({
        })
    })
}
export const getAdminfUser=()=>(dispatch, getState)=>{
    const token=getState().auth.token
    const is_adminf=getState().auth.isAdminf
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    if(token && is_adminf){
        config.headers['Authorization']=`Token ${token}`  
    }
    axios.get('http://127.0.0.1:8000/auth/adminf/dashboard/', config)
    .then(res =>{
        dispatch({
            type:ADMINF_USER_LOADED,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({
            
        })
    })
}
export const getAdminsUser=()=>(dispatch, getState)=>{
    const token=getState().auth.token
    const is_admins=getState().auth.isAdmins
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    if(token && is_admins){
        config.headers['Authorization']=`Token ${token}`  
    }
    axios.get('http://127.0.0.1:8000/auth/admins/dashboard/', config)
    .then(res =>{
        dispatch({
            type:ADMINS_USER_LOADED,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({
        })
    })
}
export const getAdmintUser=()=>(dispatch, getState)=>{
    const token=getState().auth.token
    const is_admint=getState().auth.isAdmint
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    if(token && is_admint){
        config.headers['Authorization']=`Token ${token}`  
    }
    axios.get('http://127.0.0.1:8000/auth/admint/dashboard/', config)
    .then(res =>{
        dispatch({
            type:ADMINT_USER_LOADED,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({
        })
    })
}
