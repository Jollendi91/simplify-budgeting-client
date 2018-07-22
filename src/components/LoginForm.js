import React from 'react';
import {Link} from 'react-router-dom';

import './LoginForm.css';


export default function LoginForm(props) {
    return (
        <form>
        <div>
          <label for="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password"/>
        </div>
        <Link to="/account-setup">
            <button type="submit" onClick={props.onClick}>Log in</button>
        </Link>
      </form>
    )
}