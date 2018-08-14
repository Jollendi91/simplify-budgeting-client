import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, notEmpty} from '../validators';

import './LoginForm.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
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
      <form className="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        {error}
        <div className="login-form-input">
          <label htmlFor="login-username">Username</label>
          <Field 
            component={Input}
            type="text"
            name="username"
            id="login-username"
            validate={[required, notEmpty]}
          />
        </div>
        <div className="login-form-input">
          <label htmlFor="login-password">Password</label>
          <Field 
            component={Input}
            type="password"
            name="password"
            id="login-password"
            validate={[required, notEmpty]}
          />
        </div>

        
      
        <button disabled={this.props.pristine || this.props.submitting}>
          Log in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);