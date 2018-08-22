import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import './NavBar.css';

const Navigation = styled.nav`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;

    background-color: #fff;
`;

const FormModal = styled.article`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }

    form {
        background-color: white;
        z-index: 1;
    }
`;

const WideNav = styled.div`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: none;

    @media screen and (min-width: 545px) {
        display: flex;
    }
`;

const NarrowNav = WideNav.extend`
    display: flex;

    @media screen and (min-width: 545px) {
        display: none;
    }
`;

const NavLinks = styled.ul`
    display: ${props => props.displayLinks ? 'block' : 'none'};
    padding: 0;
    margin: 0;
`;

export class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayLinks: false,
            displayForm: null
        }
    }

    displayForm(form) {
        this.setDisplayLinks();
        this.setState({
            displayForm: form
        });
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
        let activeForm;
        if (this.state.displayForm === 'login') {
            activeForm = (
                <FormModal>
                    <div className="overlay" onClick={() => this.displayForm(null)}></div>
                    <LoginForm />
                </FormModal>
            );
        } else if (this.state.displayForm === 'signup') {
            activeForm = (
                <FormModal>
                    <div className="overlay" onClick={() => this.displayForm(null)}></div>
                    <SignupForm />
                </FormModal>
            );
        }

        let navButtons;
        if (this.props.page === '/') {
            navButtons = (
                <NavLinks displayLinks={this.state.displayLinks}>
                    <li onClick={() => this.displayForm('signup')}>Sign up</li>
                    <li onClick={() => this.displayForm('login')}>Log in</li>
                </NavLinks>
            );
        } else if (this.props.page === '/account-setup') {
            navButtons = (
                <NavLinks displayLinks={this.state.displayLinks}>
                    <li className="logout-button" onClick={() => this.logOut()}>
                        Log out
                    </li>
                </NavLinks>
            );
        } else {
            navButtons = (
                <NavLinks displayLinks={this.state.displayLinks}>
                    <Link to="/dashboard" onClick={() => this.setDisplayLinks()}>
                        <li>Dashboard</li>
                    </Link>
                    <Link to="/edit-profile" onClick={() => this.setDisplayLinks()}>
                        <li>Edit Profile</li>
                    </Link>
                    <Link to="/bills" onClick={() => this.setDisplayLinks()}>
                        <li>Bills</li>
                    </Link>
                    <li className="logout-button" onClick={() => this.logOut()}>
                        Log out
                    </li>
                </NavLinks>
            );
        }

        return (
            <Navigation>
                {activeForm}
                <WideNav>
                    <h1 className="logo">Simplify</h1>
                        {navButtons}
                </WideNav>
                <NarrowNav>
                    <h1 className="logo">Simplify</h1>
                    <div className="hamburger-nav" onClick={() => this.setDisplayLinks()} >
                        <FontAwesomeIcon icon="bars" />
                    </div>
                </NarrowNav>
                {navButtons}
            </Navigation>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);