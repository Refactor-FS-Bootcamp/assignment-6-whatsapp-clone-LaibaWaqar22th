import React from 'react'
import { Button } from '@mui/material'
import '../components/Login.css'
import { auth, provider } from '../firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

const Login = () => {
    const [{ }, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png" alt="whatsapp" />
                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button onClick={signIn} >Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login