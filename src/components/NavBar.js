import React from 'react';
import {Link} from 'react-router-dom';

import LoginForm from './LoginForm';



import './NavBar.css';

export default function NavBar(props) {
    
    if (props.page === 'setup') {
        return (
            <nav className="nav-bar">
                <h1 className="logo">Simplify</h1>
                <ul>
                    <Link to="/">
                        <li onClick={() => props.onClick('signup')}>Logout</li>
                    </Link>
                </ul>
            </nav>
        )
    } else if (props.page === 'signup') {
        return (
            <nav className="nav-bar">
                <h1 className="logo">Simplify</h1>
                <LoginForm onClick={() => props.onClick('setup')}/>
            </nav>
        )
    } else if (props.page === 'dashboard') {
        return (
            <nav className="nav-bar">
                <h1 className="logo">Simplify</h1>
                <ul>
                    <Link to="/edit-profile">
                        <li>Edit Profile</li>
                    </Link>
                    <Link to="/bills">
                        <li>Bills</li>
                    </Link>
                    <Link to="/">
                        <li onClick={() => props.onClick('signup')}>Logout</li>
                    </Link>
                </ul>
                 
            </nav>
        )
    }
}