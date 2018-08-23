import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, notEmpty} from '../validators';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {FormContainer, StyledInput, CloseButton, Button} from './styled-components/Forms';

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
          <h2>Let's get logged in!</h2>
          {error}
          <Field 
            component={StyledInput}
            type="text"
            name="username"
            id="login-username"
            label="Username"
            validate={[required, notEmpty]}
          />
          <Field 
            component={StyledInput}
            type="password"
            name="password"
            id="login-password"
            label="Password"
            validate={[required, notEmpty]}
          />
          <Button disabled={this.props.pristine || this.props.submitting}>
            Log in
          </Button>
        </form>
      </FormContainer>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);