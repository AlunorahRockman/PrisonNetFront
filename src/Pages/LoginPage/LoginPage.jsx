import React, { useState } from 'react';
import "./loginPage.css";
import emailIcon from "../../Outils/icon/email.ico";
import passwdIcon from "../../Outils/icon/passwd.ico";
import errorIcon from "../../Outils/icon/error.ico";
import { Link, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';

function LoginPage() {

const [values, setValues] = useState({
    email: "",
    motdepasse: ""
})

const [showPassword, setShowPassword] = useState(false);

const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
};

const [errors, setErrors] = useState([])

const navigate = useNavigate()

const {setUser, user}=useAuth()

const handleSubmit = (e) => {
  e.preventDefault()
  axios.post('http://localhost:5000/loginUser', values)
  .then(res => {
      const user = jwtDecode(res.data.access)
      localStorage.setItem("token", JSON.stringify(res.data))
      setUser(user) 
      navigate('/')
  })
  .catch(err => {
      console.log(err)
      if (err.response.status === 401) {
          setErrors(err.response.data);
      }
  })
}

  return !user ?(
    <div className='corp'>
      <div className="couche">
        <div className="presentation">
          <h1>PrisonNet</h1>
          <p>Avec PrisonNet, vous pouvez rester en contact avec votre détenus.</p>
        </div>
        <div className="form">
          <div className="cover">
            <div className="bienvenue">
              <p>Bienvenue</p>
            </div>
            <hr className='hr' />
            <form onSubmit={handleSubmit}>
              <div className="input">
                <div className="email">
                  <div className="icon">
                    <img src={emailIcon} alt="email" />
                  </div>
                  <div className="text">
                    <input className='inpute' type="email" onChange={e => setValues({...values, email: e.target.value})} placeholder='example@gmail.com' />
                  </div>
                </div>
                <div className="email">
                  <div className="icon">
                    <img src={passwdIcon} alt="password" />
                  </div>
                  <div className="text">
                    <input className='inpute' type={showPassword ? 'text' : 'password'} onChange={e => setValues({...values, motdepasse: e.target.value})} placeholder='mot de passe...' />
                  </div>
                  <div className="password-toggle" onClick={handlePasswordToggle}>
                      {showPassword ? <FaEye/> : <FaEyeSlash/>}
                  </div>
                </div>
              </div>
              <hr className='hr' />
              {
                errors && errors.length > 0 && (
                  <div className="errors">
                    <div className="errorIcon">
                      <img src={errorIcon} alt="erreur" />
                    </div>
                    <div className="errorText">
                      <p>{errors}</p>
                    </div>
                  </div>
                )
              }

              <div className="bouton">
                <button className='button'>Se connecter</button>
              </div>
            </form>
            <Link to={'/passOubliePage'}>
              <div className="oublie">
                <p>Mot de passe oublié !</p>
              </div>
            </Link>
            <hr className='hr' />
            <div className="bouton1">
              <Link to={'/registerPage'}>
                <button className='button1'>Créer un compte</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ):(<Navigate to={"/"}/>)
}

export default LoginPage;
