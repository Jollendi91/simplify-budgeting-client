import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import {required, notEmpty, isTrimmed, length, matches} from '../validators';
import {StyledInput, FormContainer, CloseButton, Button, HorizontalInputs, StyledLabel, ButtonContainer} from './styled-components/Forms';
import {HeaderContainer, LoadingSpinner} from './styled-components/Elements';

// Form Validators
const passwordLength = length({min: 10, max: 72});
const usernameLength = length({min: 8, max: 30});
const matchesPassword = matches('password');

// Signup Form Component
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

        console.log(this.props);

        return (
            <FormContainer>
                <CloseButton icon="times" onClick={() => this.props.hideForm()}/>
                <form 
                    className="signup-form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                )}>
                    <HeaderContainer>
                        <h2>Ready to get started?</h2>
                    </HeaderContainer>
                    {successMessage}
                    {errorMessage}
                    <HorizontalInputs>
                        <div className="form-input-container">
                            <StyledLabel htmlFor="signup-username">Username</StyledLabel>
                            <Field 
                                name="username"
                                type="text"
                                component={StyledInput}
                                signup
                                id="signup-username"
                                validate={[required, notEmpty, isTrimmed, usernameLength]}
                                ariaLabel="signup username"
                            />
                        </div>
                        <div className="form-input-container">
                            <StyledLabel htmlFor="signup-password">Password</StyledLabel>
                            <Field
                                name="password"
                                type="password"
                                component={StyledInput}
                                signup
                                id="signup-password"
                                validate={[required, notEmpty, isTrimmed, passwordLength]}
                                ariaLabel="signup password"
                            />
                        </div>
                        <div className="form-input-container">
                            <StyledLabel htmlFor="verify-password">Verify Password</StyledLabel>
                            <Field 
                                name="verifyPassword"
                                type="password"
                                component={StyledInput}
                                signup
                                id="verify-password"
                                validate={[required, notEmpty, matchesPassword]}
                                ariaLabel="verify password"
                            />
                        </div>
                    </HorizontalInputs>
                    <ButtonContainer>
                        <Button
                            color="#276A73"
                            type="submit"
                            signup
                            disabled={this.props.pristine || this.props.submitting}>
                            {this.props.loading ? <LoadingSpinner icon="spinner"/> : 'Sign up'}
                        </Button>
                    </ButtonContainer>
                </form>
            </FormContainer>
        );
    }
};

const mapStateToProps = state => ({
    loading: state.auth.loading
});

export default connect(mapStateToProps)(reduxForm({
    form: 'signup',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('signup', Object.keys(errors)[0]))
})(SignupForm));