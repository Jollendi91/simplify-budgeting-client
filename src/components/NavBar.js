import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import LoginForm from './LoginForm';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import './NavBar.css';

const WideNav = styled.div`
    display: none;
`;

const WideLinks = styled.ul`
    margin: 0;
    display: flex;
    align-items: center;
    align-self: stretch;
`;

const NavLink = styled.li`

`;

const NarrowNav = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NarrowLinks = styled.ul`
    display: ${props => props.displayLinks ? 'block' : 'none'};
    padding: 0;
    margin: 0;
`;

export class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayLinks: false
        }
    }

    setDisplayLinks() {
        this.setState({
            displayLinks: !this.state.displayLinks
        });
    }
    
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
                    <WideNav>
                        <h1 className="logo">Simplify</h1>
                        <ul className="wideLinks">
                            {logOutButton}
                        </ul>
                    </WideNav>
                    <NarrowNav>
                        <div className="hamburger-nav" onClick={() => this.setDisplayLinks()} >
                            <FontAwesomeIcon icon="bars" />
                        </div>
                    </NarrowNav>
                    <NarrowLinks displayLinks={this.state.displayLinks}>
                        {logOutButton}
                    </NarrowLinks>
                </nav>
            )
        } else if (this.props.page === '/') {
            return (
                <nav className="nav-bar">
                    <WideNav>
                        <h1 className="logo">Simplify</h1>
                        <LoginForm />
                    </WideNav>
                    <NarrowNav>
                        <h1 className="logo">Simplify</h1>
                        <div className="hamburger-nav" onClick={() => this.setDisplayLinks()}>
                            <FontAwesomeIcon icon="bars" />
                        </div>
                    </NarrowNav>
                    <NarrowLinks displayLinks={this.state.displayLinks}>
                        <li>Login</li>
                        <li>Sign up</li>
                    </NarrowLinks>
                </nav>
            )
        } else {
            return (
                <nav className="nav-bar">
                    <WideNav>
                        <h1 className="logo">Simplify</h1>
                        <ul className="wideLinks">
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
                    </WideNav>
                    <NarrowNav>
                        <div className="hamburger-nav" onClick={() => this.setDisplayLinks()}>
                            <FontAwesomeIcon icon="bars" />
                        </div>
                    </NarrowNav>
                    <NarrowLinks displayLinks={this.state.displayLinks}>
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
                    </NarrowLinks>
                </nav>
            )
        }
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);