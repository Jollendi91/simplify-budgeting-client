import React from 'react';

import './SignupForm.css';

export default function SignupForm(props) {
    return (
        <section>
            <form class="signup-form">
                <h2>Ready to get started?</h2>
                <div>
                    <label for="first-name">First Name</label>
                    <input type="text" name="first-name" id="first-name" placeholder="First Name"/>
                </div>
                <div>
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username"/>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password"/>
                </div>
                <div>
                    <label for="verify-password">Retype Password</label>
                    <input type="password" name="verify-password" id="verify-password"/>
                </div>
                <button type="submit">Sign up</button>
            </form>
        </section>
    );
}