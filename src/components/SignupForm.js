import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty, noWhitespace, tooSmallUsername, tooLargeUsername, tooSmallPassword, tooLargePassword, passwordsMatch} from '../validators';

import './SignupForm.css';

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
                        validate={[required, notEmpty, noWhitespace, tooSmallUsername, tooLargeUsername]}
                    />
                    <Field
                        name="password"
                        type="password"
                        component={Input}
                        label="Password"
                        validate={[required, notEmpty, noWhitespace, tooSmallPassword, tooLargePassword]}
                    />
                    <Field 
                        name="verify-password"
                        type="password"
                        component={Input}
                        label="Verify Password"
                        validate={[passwordsMatch]}
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