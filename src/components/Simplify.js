import React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

import NavBar from './NavBar';

export default function Simplify(props) {
    return (
        <BrowserRouter>
            <div className="app-container">
                <header>
                    <NavBar />
                </header>
            </div>
        </BrowserRouter>
    )
}