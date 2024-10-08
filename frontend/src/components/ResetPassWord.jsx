import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../components/public/styles/resetpassword.css'
import axios from 'axios';
import Header from './public/Header';
import Footer from './public/Footer';
const ResetPassWord = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedPassword = '';
    for (let i = 0; i < 10; i++) {
        generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const [user, setUser] = useState({
        login: '',
        new_password: generatedPassword,
    })
    const handleChange = (e) =>
     setUser({
        ...user,
        [e.target.name]: e.target.value
    })


    const { login, new_password } = user
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('login', login);
        formData.append('new_password', new_password);

        Swal.fire({
            title: "Voulez-vous Changer votre password ?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Confirmer",
            denyButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://localhost:8000/auth/reset-pwd/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        Swal.fire("Check ton email ", "", "success")
                    })
                    .catch(err => {
                    });
            }

        });

    };
    return (
        <div className='ResetPasswordComponentForStyling'>
        <Header/>
        <center>
            <div className='row'>
            
                <div className='col-md-8 mx-auto'>
                <br/>       <br/>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='resetpasswordFormContent'>
             
                            <h1 className='titleforLoginStyling' style={{fontSize:'30px'}}>Re-initialiser le mot de passe</h1>
                     
                            <input type='text'
                                className='form-control'
                                name='login'
                                value={login}
                            placeholder='N° Cin /N° Passport'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <button type="submit" className="ResetPasswordButton" style={{marginLeft:"0%"}}>Valider</button>
                    </form>
                </div>
             
                           </div>   </center>
                           <Footer/>
        </div>

    )
}

export default ResetPassWord
