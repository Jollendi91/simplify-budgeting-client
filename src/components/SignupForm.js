import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, notEmpty, isTrimmed, length, matches} from '../validators';

import './SignupForm.css';

const passwordLength = length({min: 10, max: 72});
const usernameLength = length({min: 8, max: 30});
const matchesPassword = matches('password');

export class SignupForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {firstName, lastName, username, password};

        return this.props.dispatch(registerUser(user))
        .then(() => this.props.dispatch(login(username, password)));
    }

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
            <form 
                className="signup-form"
                onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                )}>
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
        );
    }
}

export default reduxForm({
    form: 'signup',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('signup', Object.keys(errors)[0]))
})(SignupForm);