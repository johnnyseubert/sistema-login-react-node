import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserLoginContext } from '../../contexts/UserLoginContext'
import './style.css';

export default function SobrePage() {

    const { logged } = useContext(UserLoginContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (!logged) {
            navigate('/')
        }
    }, [])

    return (
        <h1>SobrePage</h1>
    )
}
