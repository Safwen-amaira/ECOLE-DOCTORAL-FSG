import React from 'react'
import { useState } from "react"
import Swal from 'sweetalert2'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { create_adminfuser, create_adminsuser,create_doctorantuser, create_admintuser } from '../action/auth'
import { postHistorique } from '../services/service'

const Signup = ({ create_adminfuser, create_adminsuser, create_admintuser ,create_doctorantuser}) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let generatedPassword = '';
        for (let i = 0; i < 10; i++) {
            generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    const [adminf, setAdminf] = useState({
        niveau: '',
        etablissement:'',
        username: '',
        email: '',
        login: '',
        password: generatedPassword,
        password2: generatedPassword
    })
    const handleChange = (e) => setAdminf({
        ...adminf,
        [e.target.name]: e.target.value
    })
    const { niveau,etablissement, username, email, login, password, password2 } = adminf


    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        const newuser = {
            etablissement,
            username,
            email,
            login,
            password,
            password2
        }
        console.log(newuser)
        Swal.fire({
            title: "Voulez-vous ajouter un utilisateur  ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annler"
        }).then((result) => {
            console.log(newuser)
            if (result.isConfirmed) {

                if (adminf.niveau === "niveau1") {
                    create_adminfuser(newuser);
                } else if (adminf.niveau === "niveau2") {
                    create_adminsuser(newuser);
                } else if (adminf.niveau === "niveau3") {
                    create_admintuser(newuser);
                }else if (adminf.niveau === "Doctorant") {
                    create_doctorantuser(newuser);
                    
                }else if (adminf.niveau === "") {
                    Swal.fire("Ajoutez le type d'utilisateur.","","warning");
                }
                const formData2 = new FormData();
                            formData2.append('admin_name', 'bla bla');
                            formData2.append('action', 'a ajouté un utilisateur de type '+niveau+' avec nom : '+username);
                            postHistorique(formData2)


            } //else if (result.isDenied) {
             //   Swal.fire("Les changements ne sont pas enregistrés", "", "info");
            //}
            
        });

    }


    return (
        <div className='container'>
            <h2>Add user  </h2>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='form-group mb-3'>
                            <label>Grade</label>
                            <select
                                className='form-control'
                                name='niveau'
                                value={niveau}
                                onChange={(e) => handleChange(e)}
                            >
                                <option value=''>Sélectionnez un niveau</option>
                                <option value='niveau1'>Niveau 1</option>
                                <option value='niveau2'>Niveau 2</option>
                                <option value='niveau3'>Niveau 3</option>
                                <option value='Doctorant'>Doctorant</option>
                            </select>
                        </div>
                        <div className='form-group mb-3'>
                            <label>etablissement</label>
                            <input type='text'
                                className='form-control'
                                name='etablissement'
                                value={etablissement}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label>username</label>
                            <input type='text'
                                className='form-control'
                                name='username'
                                value={username}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className='form-group mb-3'>
                            <label>Email</label>
                            <input type='text'
                                className='form-control'
                                name='email'
                                value={email}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label>Login</label>
                            <input type='text'
                                className='form-control'
                                name='login'
                                value={login}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>


                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

Signup.propTypes = {
    create_doctorantuser: PropTypes.func.isRequired,
    create_adminfuser: PropTypes.func.isRequired,
    create_adminsuser: PropTypes.func.isRequired,
    create_admintuser: PropTypes.func.isRequired,

    
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdminf: state.auth.isAdminf,
    isAdmins: PropTypes.bool,
    isAdmint: PropTypes.bool,
    isDoctorant: PropTypes.bool
})
export default connect(mapStateToProps, {create_doctorantuser, create_adminfuser, create_adminsuser, create_admintuser })(Signup)
