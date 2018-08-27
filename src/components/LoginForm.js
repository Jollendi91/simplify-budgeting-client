import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, notEmpty} from '../validators';

import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {FormContainer, StyledInput, CloseButton, Button, HorizontalInputs, StyledLabel, ButtonContainer} from './styled-components/Forms';
import {HeaderContainer} from './styled-components/Elements';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password)).then(() => this.props.hideForm());
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }

    return (
      <FormContainer>
        <CloseButton icon={faTimesCircle} onClick={() => this.props.hideForm()}/>
        <form 
          className="login-form" 
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
        )}>
          <HeaderContainer>
            <h2>Let's get logged in!</h2>
          </HeaderContainer>
          {error}
          <HorizontalInputs>
            <div className="form-input-container">
              <StyledLabel htmlFor="login-username">Username</StyledLabel>
              <Field 
                component={StyledInput}
                type="text"
                name="username"
                id="login-username"
                validate={[required, notEmpty]}
              />
            </div>
            <div className="form-input-container">
              <StyledLabel htmlFor="login-password">Password</StyledLabel>
              <Field 
                component={StyledInput}
                type="password"
                name="password"
                id="login-password"
                validate={[required, notEmpty]}
              />
            </div>
          </HorizontalInputs>
          <ButtonContainer>
            <Button color="#276A73" disabled={this.props.pristine || this.props.submitting}>
              Log in
            </Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);