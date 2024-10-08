import { useState } from "react"
import React from 'react'
import Swal from 'sweetalert2'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { create_doctorantuser } from "../action/auth"
const DoctorantSignup = ({ create_doctorantuser}) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let generatedPassword = '';
        for (let i = 0; i < 10; i++) {
            generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    const [doctorant, setDoctorant] = useState({
        username: '',
        email: '',
        login: '',
        password: generatedPassword,
        password2: generatedPassword
    })
    const handleChange = (e) => setDoctorant({
        ...doctorant,
        [e.target.name]: e.target.value
    })
    const { username, email, login, password, password2 } = doctorant

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDoctorant = {
            username,
            email,
            login,
            password,
            password2
        }
        
        Swal.fire({
            title: "Voulez-vous ajouter un utilisateur administrateur ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {
            
            if (result.isConfirmed) {
                create_doctorantuser(newDoctorant)}
            
        });
    }
    return (
        <div className='container'>
            <h2>Add Doctorant </h2>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                    <form onSubmit={e => handleSubmit(e)}>
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
DoctorantSignup.propTypes = {
    create_doctorantuser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isDoctorant: PropTypes.bool
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isDoctorant: state.auth.isAdminf
})

export default connect(mapStateToProps, { create_doctorantuser })(DoctorantSignup)
