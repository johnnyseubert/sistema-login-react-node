import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserLoginContext } from '../../contexts/UserLoginContext'
import './style.css';

export default function RelatoriosPage() {

    const { logged, baseAPIUrl } = useContext(UserLoginContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (!logged) {
            navigate('/')
        }
    }, [])

    return (
        <div className='container-relatorio'>
            <div className='container'>
                <a className='relatorio' href={`${baseAPIUrl}/relatorio/users`} target="_blank">Relatório Usuarios Sistema</a>
            </div>
        </div>
    )
}
