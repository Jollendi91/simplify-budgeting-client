import React from 'react';

import SignupForm from './SignupForm';
import NavBar from './NavBar';

import './LandingPage.css';

export default function LandingPage(props) {
    return (
        <div className="landing-page">
            <NavBar page={'signup'} />
            <header className="main-header">
                <h1>Simplify</h1>
            </header>
             <main>
                <section>
                    <header>
                        <h2>Budgeting simplified</h2>
                    </header>
                    <p>[Screenshot of use case]</p>
                    <p>Simplify focuses on one fundamental idea, to know how much money you have, and where it is going. Knowing is the first step in taking control of your finances.</p>
                </section>
                <section>
                    <header>
                        <h2>Track your progress</h2>
                    </header>
                    <p>[Screenshot of use case]</p>
                    <p>Description of section</p>
                </section>
                <section>
                    <header>
                        <h2>Based on the 50/30/20 Rule</h2>
                    </header>
                    <p>[Screenshot of use case]</p>
                    <p>Description of section</p>
                </section>
                <SignupForm />
            </main>
            <footer>
                Created by Josh
            </footer>
        </div>
    )
}