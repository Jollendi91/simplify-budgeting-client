import React from 'react';

import SignupForm from './SignupForm';

import './LandingPage.css';
import { connect } from 'http2';

export function LandingPage(props) {

    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="landing-page">
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

const mapStateToProps = state => ({
    loggedIn: state.auth.curentUser !== null
});

export default connect(mapStateToProps)(LandingPage);