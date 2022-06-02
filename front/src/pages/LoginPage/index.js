import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserLoginContext } from '../../contexts/UserLoginContext';
import axios from 'axios';
import './style.css';

export default function LoginPage() {

    const { setLogged, setUserName } = useContext(UserLoginContext);
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [loginInvalido, setLoginInvalido] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLogged(false)
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            let response = await axios.post("http://localhost:3333/api/verificarLogin", {
                "username": login,
                "senha": senha
            })

            if (response.data.status === 'S') {
                setLogged(true);
                setUserName(login);
                navigate('/home')
            } else {
                setLoginInvalido(true)
            }
        } catch (error) {
            setLoginInvalido(true)
        }
    }

    return (
        <div className='login-page'>
            <form>
                <h3>Login</h3>
                <div className={`form-group`}>
                    <label>Login</label>
                    <input className={loginInvalido == true ? 'value-invalid' : ''} type="text" placeholder='Digite seu login' value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className={`form-group`}>
                    <label>Senha</label>
                    <input className={(loginInvalido == true ? 'value-invalid' : '')} type="password" placeholder='Digite sua senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <button onClick={handleLogin}>Logar</button>
            </form>
        </div>
    )
}
