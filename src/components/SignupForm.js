import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty, isTrimmed, length, matches} from '../validators';

import './SignupForm.css';

const passwordLength = length({min: 10, max: 72});
const usernameLength = length({min: 8, max: 30});
const matchesPassword = matches('password');

export class SignupForm extends React.Component {
    render() {
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Sign up was successful!
                </div>
            );
        }

        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error">
                    {this.props.error}
                </div>
            );
        }

        return (
            <section>
                <form className="signup-form">
                    <h2>Ready to get started?</h2>
                    {successMessage}
                    {errorMessage}
                    <Field 
                        name="firstName"
                        type="text"
                        component={Input}
                        label="First Name"
                    />
                    <Field 
                        name="lastName"
                        type="text"
                        component={Input}
                        label="Last Name"
                    />
                    <Field 
                        name="username"
                        type="text"
                        component={Input}
                        label="Username"
                        validate={[required, notEmpty, isTrimmed, usernameLength]}
                    />
                    <Field
                        name="password"
                        type="password"
                        component={Input}
                        label="Password"
                        validate={[required, notEmpty, isTrimmed, passwordLength]}
                    />
                    <Field 
                        name="verifyPassword"
                        type="password"
                        component={Input}
                        label="Verify Password"
                        validate={[required, notEmpty, matchesPassword]}
                    />
                
                    <button
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                        Sign up
                    </button>
                </form>
            </section>
        );
    }
}

export default reduxForm({
    form: 'signup',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('signup', Object.keys(errors)[0]))
})(SignupForm);