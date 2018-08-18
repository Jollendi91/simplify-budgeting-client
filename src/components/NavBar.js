import React from 'react';
import {Link} from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import LoginForm from './LoginForm';

import './NavBar.css';
import { connect } from 'react-redux';

export class NavBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <li className="logout-button" onClick={() => this.logOut()}>
                    Log out
                </li>
            )
        }

        if (this.props.page === '/account-setup') {
            return (
                <nav className="nav-bar">
                    <h1 className="logo">Simplify</h1>
                    <ul>
                        {logOutButton}
                    </ul>
                </nav>
            )
        } else if (this.props.page === '/') {
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
                        {logOutButton}
                    </ul>  
                </nav>
            )
        }
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);