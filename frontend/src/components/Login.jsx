import React, { useState ,useEffect} from 'react'
import { connect } from "react-redux"
import { PropTypes } from 'prop-types'
import { loginuser } from '../action/auth'
import { Link, Navigate } from "react-router-dom"
import '../components/public/styles/Login.css'
import NHeader from './public/Header'
import { getDoctorantUser ,getAdminfUser,getAdminsUser,getAdmintUser,refreshDoctorant,refreshAdminf,refreshAdmins,refreshAdmint} from '../action/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import Footer from './public/Footer'
function Login({ loginuser, isAuthenticated, isDoctorant, isAdminf, isAdmins, isAdmint }) {
    const dispatch=useDispatch()
    useEffect(()=>{
        setUser({username: '',
        password: ''})
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(refreshDoctorant());
        dispatch(refreshAdminf());
        dispatch(refreshAdmins());
        dispatch(refreshAdmint());


  
    }
      dispatch(getDoctorantUser())
      dispatch(getAdminfUser())
      dispatch(getAdminsUser())
      dispatch(getAdmintUser())


        
    }, [dispatch])
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const { username, password } = user

    const handleChange=(e)=>setUser({...user, [e.target.name]:e.target.value})
    
    const handleSubmit = (e) => {
        e.preventDefault();
        loginuser({ username, password });
        setUser({username: '',
        password: ''})
    };
    
    if (isAdminf && isAuthenticated) {
        return <Navigate to={'/adminf/dashboard'} />
    } else if (isAdmins && isAuthenticated) {
        return <Navigate to={'/admins/dashboard'} />
    } else if (isAdmint && isAuthenticated) {
        return <Navigate to={'/admint/dashboard'} />
    } else if (isDoctorant && isAuthenticated) {
        return <Navigate to={'/doctorant/dashboard'} />
    }
    else {
        return (
            <div className='LoginPageForStyling'>
                <NHeader/>
                    <center>
                <div className='row'>
                <div className='LoginContentForStyling'>
                <div className='FormOfLoginSideForStyling'>
                    <div className='col-md-6 mx-auto'>
                        <form onSubmit={e => handleSubmit(e)}>
                            <br/><br/>
                                <h1 className='titleforLoginStyling'>S'identifier</h1>
                            <div className="form-group mb-3">
                                <label>
                                <input type="text"
                                    className="form-control"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Cin/Passport ."
                                    name="username" value={username} /></label>
                            </div>
                            <div className="form-group mb-3">
                                <label>
                                <input type="password"
                                    className="form-control"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="mot de passe"
                                    name="password"
                                     value={password} /></label>
                            </div>
                            
                            <button type="submit" className='buttonLoginFormForStyling' style={{marginLeft:"0%"}}>Login</button>
                        </form>
                        <div className="ForgotPasswordLinkerForLogin">
                             <Link to="/user/reset-password"> <p>mot de passe Oubliée ?</p></Link>
                            </div>
                        </div>
                       
                    </div></div>
                </div>

                </center>
                <Footer/>
            </div>
        )
    }
}
Login.propTypes = {
    loginuser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isDoctorant: PropTypes.bool,
    isAdminf: PropTypes.bool,
    isAdmins: PropTypes.bool,
    isAdmint: PropTypes.bool,
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isDoctorant: state.auth.isDoctorant,
    isAdminf: state.auth.isAdminf,
    isAdmins: state.auth.isAdmins,
    isAdmint: state.auth.isAdmint,

})

export default connect(mapStateToProps, { loginuser }) (Login)
