import React from 'react';
import LoginForm from './LoginForm';

import './NavBar.css';

export default function NavBar(props) {
    return (
        <nav className="nav-bar">
            <h1 className="logo">Simplify</h1>
            <LoginForm />
        </nav>
    )
}