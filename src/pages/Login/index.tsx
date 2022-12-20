import './style.css'

import { Logo } from '../../components/Logo'
import { useState } from 'react'

import { auth } from '../../services/firebase.js'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import { Input } from '../../components/Input'


export default function Login() {
    const [inputEmail, setInputEmail] = useState<string>("")
    const [inputPassword, setInputPassword] = useState<string>("")
    const navigate = useNavigate();

    function handleLogin() {
        
        if(inputEmail && inputPassword) {
            signInWithEmailAndPassword(auth, inputEmail, inputPassword)
            .then(() => {
                toast.success('Bem vindo de volta!')
                navigate("/admin", { replace: true })
            }).catch(() => {
                toast.error('Erro ao tentar fazer o login')
            })
        } else {
            alert('Preencha todos os campos')
            return;
        }
    }

    function handleRegister() {
        if(inputEmail && inputPassword) {
            createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
            .then(() => {
                toast.success('Cadastrado com sucesso!')
                navigate("/admin", { replace: true })
            }).catch(() => {
                toast.error('Erro ao tentar fazer o login')
            })
        } else {
            alert('Preencha todos os campos')
            return;
        }
    }

    return (
        <div className='login-container'>
            <Logo />

            <div className="form">
                <Input 
                    type='email' 
                    placeholder='Digite seu e-mail...' 
                    value={inputEmail}
                    handleInputChange={(e) => setInputEmail(e.target.value)}
                />

                <Input 
                    type='password' 
                    placeholder='*********' 
                    value={inputPassword}
                    handleInputChange={(e) => setInputPassword(e.target.value)}
                />
                
                <button className='btn' onClick={handleLogin}>Logar</button>
                <button className='btn' onClick={handleRegister}>Criar nova conta</button>
            </div>
        </div>
    )
}