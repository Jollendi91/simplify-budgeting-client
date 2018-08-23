import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import {required, notEmpty, isTrimmed, length, matches} from '../validators';
import Input from './input';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import './SignupForm.css';

const FormContainer = styled.article`
    width: 100%;
    max-width: 500px;
    padding: 20px 10px;
    margin: auto;
    position: relative;
`;

const CloseButton = styled(FontAwesomeIcon)`
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 1.5em;
    cursor: pointer;
`;

const Button = styled.button`
    padding: .6em 5em;
    font-size: .8em;
    margin-top: 1em;
    cursor: pointer;
`;

const StyledInput = styled(Input)`
max-width: 350px;
padding: 5px;
margin: 0 auto 10px;

label {
    text-align: left;
    font-size: 1em;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input {
    max-width: 100%;
    width: 100%;
    padding: 5px;
    border: 0;
    border-bottom: 1px solid #aaa;
    font-size: 18px;
    margin-top: 5px;
}
`;

const FormError = styled.div`
    font-size: .8em;
    color: red;
    font-weight: bold;
`;

const passwordLength = length({min: 10, max: 72});
const usernameLength = length({min: 8, max: 30});
const matchesPassword = matches('password');

export class SignupForm extends React.Component {
    onSubmit(values) {
        const {username, password} = values;
        const user = {username, password};

        return this.props.dispatch(registerUser(user))
        .then(() => this.props.dispatch(login(username, password)))
        .then(() => this.props.hideForm());
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
            <FormContainer>
                <CloseButton icon={faTimesCircle} onClick={() => this.props.hideForm()}/>
                <form 
                    className="signup-form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                )}>
                    <h2>Ready to get started?</h2>
                    {successMessage}
                    {errorMessage}
                    <Field 
                        name="username"
                        type="text"
                        component={StyledInput}
                        label="Username"
                        validate={[required, notEmpty, isTrimmed, usernameLength]}
                    />
                    <Field
                        name="password"
                        type="password"
                        component={StyledInput}
                        label="Password"
                        validate={[required, notEmpty, isTrimmed, passwordLength]}
                    />
                    <Field 
                        name="verifyPassword"
                        type="password"
                        component={StyledInput}
                        label="Verify Password"
                        validate={[required, notEmpty, matchesPassword]}
                    />
                
                    <Button
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                        Sign up
                    </Button>
                </form>
            </FormContainer>
        );
    }
}

export default reduxForm({
    form: 'signup',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('signup', Object.keys(errors)[0]))
})(SignupForm);