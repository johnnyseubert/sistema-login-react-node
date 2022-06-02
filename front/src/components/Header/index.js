import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserLoginContext } from '../../contexts/UserLoginContext'
import './style.css'

export default function Header() {

    const { logged, userName } = useContext(UserLoginContext)
    const [mostrarMenus, setMostrarMenus] = useState(false);

    useEffect(() => {
        if (logged == true) {
            setMostrarMenus(true)
        } else {
            setMostrarMenus(false)
        }
    }, [logged])

    return (
        <header className='topo'>
            <div className='container'>
                {logged && <h3><span className='dourado'>Seja bem vindo {userName}!</span></h3>}

                <nav>
                    {mostrarMenus && (
                        <>
                            <Link to="/home">Home</Link >
                            <Link to="/sobre">Sobre</Link >
                            <Link to="/">Desconectar</Link >
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
