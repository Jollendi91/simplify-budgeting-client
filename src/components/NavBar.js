import React from 'react';
import {Link} from 'react-router-dom';

import LoginForm from './LoginForm';



import './NavBar.css';

export default function NavBar(props) {
    
    if (props.page === '/account-setup') {
        return (
            <nav className="nav-bar">
                <h1 className="logo">Simplify</h1>
                <ul>
                    <Link to="/">
                        <li>Logout</li>
                    </Link>
                </ul>
            </nav>
        )
    } else if (props.page === '/') {
        return (
            <nav className="nav-bar">
                <h1 className="logo">Simplify</h1>
                <LoginForm />
            </nav>
        )
    } else {
        return (
            <nav className="nav-bar">
                <h1 className="logo">Simplify</h1>
                <ul>
                    <Link to="/dashboard">
                        <li>Dashboard</li>
                    </Link>
                    <Link to="/edit-profile">
                        <li>Edit Profile</li>
                    </Link>
                    <Link to="/bills">
                        <li>Bills</li>
                    </Link>
                    <Link to="/">
                        <li>Logout</li>
                    </Link>
                </ul>
                 
            </nav>
        )
    }
}