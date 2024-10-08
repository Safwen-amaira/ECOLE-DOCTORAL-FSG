import axios from "axios";

export function getlabos(){
    return axios.get('http://127.0.0.1:8000/Labo/details/')
    .then(response =>response.data)
}

  export function getactualites(){
    return axios.get('http://127.0.0.1:8000/actualites/')
    .then(response =>response.data)
}

export function getArticles(){
    return axios.get('http://127.0.0.1:8000/bibliotheque/article/')
    .then(response =>response.data)
}

export function getTheses(){
    return axios.get('http://127.0.0.1:8000/bibliotheque/these/')
    .then(response =>response.data)
}

export function getDocuments(){
    return axios.get('http://127.0.0.1:8000/bibliotheque/document/')
    .then(response =>response.data)
}

export function getUsers(){
    return axios.get('http://127.0.0.1:8000/auth/user/')
    .then(response =>response.data)
}
export function getFormationsSimple(){
    return axios.get('http://127.0.0.1:8000/formation/simple/')
    .then(response =>response.data)
}
export function getFormationsPedagogique(){
    return axios.get('http://127.0.0.1:8000/formation/pedagogique/')
    .then(response =>response.data)
}


export function getdirecteurs(){
    return axios.get('http://127.0.0.1:8000/directeur/details/')
    .then(response =>response.data)
}
export function getdirecteursid(id){
    return axios.get('http://127.0.0.1:8000/directeur/details/'+id+'/')
    .then(response =>response.data)
}
export function getdemande(cin){
    return axios.get('http://127.0.0.1:8000/api-chercheur/api/get_inscription/${cin}/')
    .then(response =>response.data)
}
export function getEtablissement(){
    return axios.get('http://127.0.0.1:8000/etablissement/details/')
    .then(response =>response.data)
}

export function postHistorique(historique){
    return axios.post('http://127.0.0.1:8000/historique/', historique, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response =>response.data)
}
export function getHistorique(){
    return axios.get('http://127.0.0.1:8000/historique/')
    .then(response =>response.data)
}
export function getHistoriqueinscri(){
    return axios.get('http://127.0.0.1:8000/controlling/preinscription/historique/')
    .then(response =>response.data)
}
export function getNotification(){
    return axios.get('http://127.0.0.1:8000/notification/get/')
    .then(response =>response.data)
}
export function getNotificationcount(){
    return axios.get('http://127.0.0.1:8000/notification/number/')
    .then(response =>response.data)
}
export function getchercheurcount(){
    return axios.get('http://127.0.0.1:8000/api-chercheur/number/')
    .then(response =>response.data)
}
export function getetabcount(){
    return axios.get('http://127.0.0.1:8000/etablissement/number/')
    .then(response =>response.data)
}
export function getdirecteurcount(){
    return axios.get('http://127.0.0.1:8000/directeur/number/')
    .then(response =>response.data)
}
export function getlabocount(){
    return axios.get('http://127.0.0.1:8000/Labo/number/')
    .then(response =>response.data)
}