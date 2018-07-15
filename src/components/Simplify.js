import React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

import NavBar from './NavBar';
import LandingPage from './LandingPage';
import AccountSetup from './AccountSetup';

export default function Simplify(props) {
    return (
        <BrowserRouter>
            <div className="app-container">
                <header>
                    <NavBar />
                </header>

                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/account-setup" component={AccountSetup}/>
            </div>
        </BrowserRouter>
    )
}