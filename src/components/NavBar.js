import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 

// Styled Components
const NavContainer = styled.nav`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
    background-color: #fff;
`;

const Logo = styled.h1`
    font-size: 30px;
    margin: 10px;
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

    article {
        background-color: white;
        z-index: 1;
        margin: 0 10px;
    }
`;

const Nav = styled.div`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display:${props => props.narrow ? 'flex' : 'none'};

    @media screen and (min-width: 545px) {
        display: ${props => props.narrow ? 'none' : 'flex'};
    }
`;

const LinksContainer = styled.div`
    display: ${props => props.displayLinks ? 'block' : 'none'};

    @media screen and (min-width: 545px) {
       display: ${props => props.narrow ? 'none' : 'flex'};
    }
`;

const NavLinks = styled.ul`
    margin: 0;
    padding: 0;

    &:last-child {
        border-bottom: 2px solid #aaa;
    }

    li, a {
        height: 100%;
    }

    a {
        text-decoration: none;
        color: black;
    }

    li {
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #aaa;
        padding: 10px 5px;
        cursor: pointer;

        &:hover {
            background-color: #ddd;
        }
    }
    
    @media screen and (min-width: 545px) {
        display: flex;
        align-items: center;
        align-self: stretch;

        &:last-child {
            border-bottom: 0;
        }

        li {
            border-top: 0;
            padding: 20px 10px;
        }
    }  
`;

const HamburgerNav = styled.div`
    padding: 15px;
    cursor: pointer;
`;

// NavBar Component
export class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayLinks: false,
            displayForm: null
        }
    }

    displayForm(form) {
        if (form !== null) {
            this.setDisplayLinks();
        }
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
                    <LoginForm hideForm={() => this.displayForm(null)}/>
                </FormModal>
            );
        } else if (this.state.displayForm === 'signup') {
            activeForm = (
                <FormModal>
                    <div className="overlay" onClick={() => this.displayForm(null)}></div>
                    <SignupForm hideForm={() => this.displayForm(null)}/>
                </FormModal>
            );
        }

        let navButtons;
        if (this.props.page === '/') {
            navButtons = (
                <NavLinks>
                    <li onClick={() => this.displayForm('signup')}>Sign up</li>
                    <li onClick={() => this.displayForm('login')}>Log in</li>
                </NavLinks>
            );
        } else if (this.props.page === '/account-setup') {
            navButtons = (
                <NavLinks>
                    <li className="logout-button" onClick={() => this.logOut()}>
                        Log out
                    </li>
                </NavLinks>
            );
        } else {
            navButtons = (
                <NavLinks>
                    <Link to="/dashboard" onClick={() => this.setDisplayLinks()}>
                        <li>Dashboard</li>
                    </Link>
                    <Link to="/edit-profile" onClick={() => this.setDisplayLinks()}>
                        <li>Edit Profile</li>
                    </Link>
                    <Link to="/bills" onClick={() => this.setDisplayLinks()}>
                        <li>Bills</li>
                    </Link>
                    <li className="logout-button" onClick={() => {this.logOut(); this.setDisplayLinks();}}>
                        Log out
                    </li>
                </NavLinks>
            );
        }

        return (
            <NavContainer>
                {activeForm}
                <Nav>
                    <Logo>Simplify</Logo>
                    <LinksContainer displayLinks={this.state.displayLinks}>
                        {navButtons}
                    </LinksContainer>
                </Nav>
                <Nav narrow>
                    <Logo>Simplify</Logo>
                    <HamburgerNav onClick={() => this.setDisplayLinks()} >
                        <FontAwesomeIcon icon="bars" />
                    </HamburgerNav>
                </Nav>
                <LinksContainer narrow displayLinks={this.state.displayLinks}>
                    {navButtons}
                </LinksContainer>
            </NavContainer>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);